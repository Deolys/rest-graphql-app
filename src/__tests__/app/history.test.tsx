import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import HistoryPage from '@/app/history/page';
import { LanguageContext } from '@/providers/language';

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

vi.mock('@/hooks/useHistoryLS', () => ({
  useHistoryLS: () => ({
    requests: [
      {
        date: '2024-09-01',
        method: 'GET',
        url: 'https://example.com',
        encodedURL: 'https://example.com',
      },
    ],
  }),
}));

vi.mock('@/hoc/with-auth', () => ({
  withAuth: (component: unknown) => component,
}));

const mockLanguageContext = {
  t: {
    historyRequests: 'История запросов',
  },
  toggleLanguage: vi.fn(),
};

describe('HistoryPage', () => {
  it('Show history', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <HistoryPage />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('История запросов')).toBeInTheDocument();
    expect(screen.getByText('2024-09-01:')).toBeInTheDocument();
    expect(screen.getByText('[GET]')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });
});
