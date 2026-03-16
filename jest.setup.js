import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

global.Request = class Request {
  constructor(input, init) {
    this.url = input;
    this.method = init?.method || 'GET';
    this.headers = init?.headers || new Headers();
  }
};

global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = init?.headers || new Headers();
  }
  json() {
    return Promise.resolve(JSON.parse(this.body));
  }
  static json(data, init) {
    return new Response(JSON.stringify(data), init);
  }
};

global.Headers = class Headers {
  constructor(init = {}) {
    this.map = new Map(Object.entries(init));
  }
  get(name) { return this.map.get(name); }
  set(name, value) { this.map.set(name, value); }
  has(name) { return this.map.has(name); }
  delete(name) { this.map.delete(name); }
  append(name, value) {
    const existing = this.map.get(name);
    if (existing) {
      this.map.set(name, `${existing}, ${value}`);
    } else {
      this.map.set(name, value);
    }
  }
};

// Next JS NextResponse Override
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body, init) => {
        return new Response(JSON.stringify(body), init);
      }
    }
  };
});
