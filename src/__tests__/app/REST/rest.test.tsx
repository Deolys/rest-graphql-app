import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterAll, describe, expect, it, vi } from 'vitest';

import { mockLanguageContext } from '@/__tests__/mocks/language-context';
import { renderWithProviders } from '@/__tests__/test-utils/render-with-providers';
import Page from '@/app/[method]/[[...slug]]/page';
import { LanguageContext } from '@/providers/language';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/mocked-path'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/components/client/forms', () => ({
  ClientCustomForm: vi.fn(() => <div>Form</div>),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(() => [null, false, null]),
}));

vi.mock('@/config/firebase-config', () => ({
  app: {},
  auth: {},
  db: {},
}));

describe('REST page', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('renders without crashing', async () => {
    await waitFor(async () => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          {await Page({ params: { method: 'GET' } })}
        </LanguageContext.Provider>,
      );
    });

    expect(screen.getByText('Заголовки')).toBeInTheDocument();
    expect(screen.getByText('Переменные')).toBeInTheDocument();
    expect(screen.getAllByText('Тело')[0]).toBeInTheDocument();
  });

  it('shows response data with the code and status by correct api GET request', async () => {
    await waitFor(async () => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          {await Page({ params: { method: 'GET' } })}
        </LanguageContext.Provider>,
      );
    });

    const urlInput = screen.getByPlaceholderText('Введите адрес...');
    expect(urlInput).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(urlInput, {
        target: { value: 'https://correct-rest-api-url' },
      });
    });

    const urlButton = screen.getByRole('button', { name: 'Отправить' });
    fireEvent.click(urlButton);

    await waitFor(() => {
      const responseData = screen.getByText(/test-rest-response-data/i);
      expect(responseData).toBeInTheDocument();
      const responseStatus = screen.getByText(/200 OK/i);
      expect(responseStatus).toBeInTheDocument();
    });
  });

  it('shows error with code and status by incorrect api request', async () => {
    await waitFor(async () => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          {await Page({ params: { method: 'GET' } })}
        </LanguageContext.Provider>,
      );
    });

    const urlInput = screen.getByPlaceholderText('Введите адрес...');
    expect(urlInput).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(urlInput, {
        target: { value: 'https://incorrect-rest-api-url' },
      });
    });

    const urlButton = screen.getByRole('button', { name: 'Отправить' });
    fireEvent.click(urlButton);

    await waitFor(() => {
      const errorData = screen.getByText(/test-rest-error-response-message/i);
      expect(errorData).toBeInTheDocument();
      const errorStatus = screen.getByText(/400 HTTP error!/i);
      expect(errorStatus).toBeInTheDocument();
    });
  });
});
