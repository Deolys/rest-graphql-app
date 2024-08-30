import { setupServer } from 'msw/node';

// import { handlers } from '@/__tests__/mocks/handlers';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
