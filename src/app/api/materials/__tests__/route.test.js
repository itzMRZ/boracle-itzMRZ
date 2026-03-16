import { POST } from '../route';
import { auth } from '@/auth';
import { db, getCurrentEpoch } from '@/lib/db';
import { uploadFile, isAllowedExtension } from '@/lib/r2';

// Mocks
jest.mock('@/auth', () => ({
    auth: jest.fn()
}));

jest.mock('@/lib/db', () => {
    const mockValues = jest.fn().mockImplementation(() => {
        const promise = Promise.resolve([{ materialId: 1 }]);
        promise.returning = jest.fn().mockResolvedValue([{ materialId: 1 }]);
        return promise;
    });

    const mockInsert = jest.fn().mockReturnValue({ values: mockValues });

    return {
        db: {
            insert: mockInsert,
            select: jest.fn().mockReturnValue({
                from: jest.fn().mockReturnValue({
                    leftJoin: jest.fn().mockReturnValue({
                        where: jest.fn().mockReturnValue({
                            orderBy: jest.fn().mockReturnValue({
                                limit: jest.fn().mockResolvedValue([])
                            })
                        })
                    })
                })
            })
        },
        getCurrentEpoch: jest.fn(() => 1234567890),
        eq: jest.fn(),
        and: jest.fn(),
        or: jest.fn(),
        ilike: jest.fn(),
        lt: jest.fn(),
        sql: jest.fn(),
        inArray: jest.fn(),
        desc: jest.fn()
    };
});

jest.mock('@/lib/db/schema', () => ({
    courseMaterials: {},
    targets: {},
    votes: {},
    userinfo: {}
}));

jest.mock('@/lib/r2', () => ({
    uploadFile: jest.fn(),
    isAllowedExtension: jest.fn(),
    getPublicUrl: jest.fn()
}));

jest.mock('crypto', () => ({
    randomUUID: jest.fn(() => 'test-uuid'),
}));

// Mock NextRequest formData
class MockFormData {
    constructor(entries = {}) {
        this.entries = entries;
    }
    get(key) {
        return this.entries[key] || null;
    }
}

describe('POST /api/materials', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset the mock values for returning to allow overrides in specific tests
        db.insert().values.mockImplementation(() => {
            const promise = Promise.resolve([{ materialId: 1 }]);
            promise.returning = jest.fn().mockResolvedValue([{ materialId: 1 }]);
            return promise;
        });
        db.insert.mockClear();
    });

    it('returns 401 if not authenticated', async () => {
        auth.mockResolvedValue(null);
        const req = { formData: jest.fn().mockResolvedValue(new MockFormData()) };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toBe('Unauthorized');
    });

    it('returns 400 if required fields are missing', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });

        // Missing courseCode, semester, postDescription
        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                fileUuid: 'test-uuid'
            }))
        };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Missing required fields');
    });

    it('returns 400 if description length exceeds 100 characters', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                link: 'https://youtube.com/watch?v=123',
                linkType: 'youtube',
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'a'.repeat(101)
            }))
        };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Description must be 100 characters or less');
    });

    it('handles presigned file upload successfully', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com', userrole: 'user' } });

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                fileUuid: 'presigned-uuid',
                fileExtension: 'pdf',
                publicUrl: 'https://example.com/test.pdf',
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'Test material'
            }))
        };

        db.insert().values.mockImplementationOnce(() => {
            const promise = Promise.resolve([{ materialId: 10 }]);
            promise.returning = jest.fn().mockResolvedValue([{ materialId: 10 }]);
            return promise;
        });
        db.insert.mockClear(); // Clear the db.insert call from setup

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.materialId).toBe(10);
        expect(data.publicUrl).toBe('https://example.com/test.pdf');

        expect(db.insert).toHaveBeenCalledTimes(2);
    });

    it('returns 400 for invalid file type', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });
        isAllowedExtension.mockReturnValue(false);

        const file = new Blob(['test'], { type: 'text/plain' });
        file.name = 'test.exe';
        file.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(4));

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                file,
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'Test material'
            }))
        };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid file type. Only pdf, pptx, doc, and docx are allowed.');
    });

    it('returns 400 for invalid link type', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                link: 'https://example.com',
                linkType: 'website',
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'Test material'
            }))
        };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid link type');
    });

    it('returns 400 for invalid youtube link', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                link: 'https://youtube.com', // Invalid YouTube video link
                linkType: 'youtube',
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'Test material'
            }))
        };

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Invalid youtube link. Must contain a specific video/file ID.');
    });

    it('accepts valid youtube link successfully', async () => {
        auth.mockResolvedValue({ user: { email: 'test@example.com' } });

        const req = {
            formData: jest.fn().mockResolvedValue(new MockFormData({
                link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                linkType: 'youtube',
                courseCode: 'CSE110',
                semester: 'Spring24',
                postDescription: 'Test material'
            }))
        };

        db.insert().values.mockImplementationOnce(() => {
            const promise = Promise.resolve([{ materialId: 30 }]);
            promise.returning = jest.fn().mockResolvedValue([{ materialId: 30 }]);
            return promise;
        });
        db.insert.mockClear(); // Clear the setup db.insert() call

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.publicUrl).toBe('https://youtube.com/watch?v=dQw4w9WgXcQ');
        expect(db.insert).toHaveBeenCalledTimes(2);
    });

    it('handles server errors gracefully', async () => {
        auth.mockRejectedValue(new Error('DB Error'));
        const req = { formData: jest.fn().mockResolvedValue(new MockFormData()) };

        // suppress console.error for this test
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toBe('Internal server error');

        console.error.mockRestore();
    });
});
