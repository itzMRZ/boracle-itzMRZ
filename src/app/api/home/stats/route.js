// GET API that fetches total swaps, reviews, materials

import { db, sql } from "@/lib/db";
import { courseSwap, reviews, courseMaterials } from "@/lib/db/schema";
import { NextResponse } from "next/server";

// ⚡ Bolt: Cache this endpoint to prevent unnecessary DB hits on every homepage load
export const revalidate = 3600; // Revalidate every hour

export async function GET(req) {
    try {
        // ⚡ Bolt: Removed unnecessary await auth() check since these are public global stats
        // This avoids checking session/cookies and reduces latency
        const [totalSwaps, totalReviews, totalMaterials] = await Promise.all([
            db.select({ count: sql`count(*)` }).from(courseSwap),
            db.select({ count: sql`count(*)` }).from(reviews),
            db.select({ count: sql`count(*)` }).from(courseMaterials)
        ]);
        return NextResponse.json({
            totalSwaps: totalSwaps[0].count,
            totalReviews: totalReviews[0].count,
            totalMaterials: totalMaterials[0].count
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
