import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './mocks/node';

afterEach(() => {
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
