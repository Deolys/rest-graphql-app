import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import Page from '@/app/GRAPHQL/[[...slug]]/page';
import { setupStore } from '@/store/store';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/mocked-path'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/components/client/forms', () => ({
  ClientCustomForm: vi.fn(() => <div>Mocked ClientCustomForm</div>),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(() => [null, false, null]),
}));

vi.mock('@/config/firebase-config', () => ({
  app: {},
  auth: {},
  db: {},
}));

describe('Page Component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <Provider store={setupStore()}>
          <Page />
        </Provider>,
      );
    });

    expect(screen.getByText('Mocked ClientCustomForm')).toBeInTheDocument();
  });
});
