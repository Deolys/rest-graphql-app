import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import HistoryPage from '@/app/history/page';
import { useHistoryLS } from '@/hooks/useHistoryLS';
import { LanguageContext } from '@/providers/language';

vi.mock('@/hooks/useHistoryLS', () => ({
  useHistoryLS: vi.fn(),
}));

vi.mock('@/hoc/with-auth', () => ({
  withAuth: (component: unknown) => component,
}));

afterEach(() => {
  vi.clearAllMocks();
});

const mockLanguageContext = {
  t: {
    historyRequests: 'История запросов',
    historyEmpty: 'История запросов пуста',
    restClient: 'REST клиент',
    graphqlClient: 'GraphQL клиент',
  },
  toggleLanguage: vi.fn(),
};

describe('HistoryPage', () => {
  it('Show history', () => {
    vi.mocked(useHistoryLS).mockReturnValue({
      requests: [
        {
          date: '2024-09-01',
          method: 'GET',
          url: 'https://example.com',
          encodedURL: 'https://example.com',
        },
      ],
      addRequestToLS: vi.fn(),
    });

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <HistoryPage />
      </LanguageContext.Provider>,
    );

    expect(
      screen.getByText((content) => content.includes('2024-09-01')),
    ).toBeInTheDocument();
    expect(screen.getByText(/\[GET\]/i)).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('Empty history', () => {
    vi.mocked(useHistoryLS).mockReturnValueOnce({
      requests: [],
      addRequestToLS: vi.fn(),
    });

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <HistoryPage />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText(/История запросов пуста/i)).toBeInTheDocument();
    expect(screen.getByText(/REST клиент/i)).toBeInTheDocument();
    expect(screen.getByText(/GraphQL клиент/i)).toBeInTheDocument();
  });
});
