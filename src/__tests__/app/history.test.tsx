import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import HistoryPage from '@/app/history/page';
import { useHistoryLS } from '@/hooks/use-history-LS';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('@/hooks/use-history-LS', () => ({
  useHistoryLS: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

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
      requests: null,
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
