import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from './mocks/node';

afterEach(() => {
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      asPath: '',
      route: '',
      pathname: '',
      query: {},
      isReady: true,
    }),
  }));
  vi.mock('@/hoc/with-auth', () => ({
    withAuth: (component: unknown) => component,
  }));
});

afterAll(() => {
  server.close();
});
