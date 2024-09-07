import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterAll, describe, expect, it, vi } from 'vitest';

import { mockLanguageContext } from '@/__tests__/mocks/language-context';
import { mockDocumentation } from '@/__tests__/mocks/mock-data';
import { renderWithProviders } from '@/__tests__/test-utils/render-with-providers';
import Page from '@/app/GRAPHQL/[[...slug]]/page';
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

vi.mock('graphql', async (importOriginal) => {
  const actual = await importOriginal();
  return Object.assign({}, actual, {
    buildClientSchema: vi.fn(() => mockDocumentation),
  });
});

describe('GraphQL page', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('renders without crashing', async () => {
    await waitFor(() => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          <Page />
        </LanguageContext.Provider>,
      );
    });

    expect(screen.getByText('Заголовки')).toBeInTheDocument();
    expect(screen.getByText('Переменные')).toBeInTheDocument();
    expect(screen.getByText('Запрос')).toBeInTheDocument();
  });

  it('gets documentation by sdl request', async () => {
    let containerElem: HTMLElement;
    await waitFor(() => {
      const { container } = renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          <Page />
        </LanguageContext.Provider>,
      );
      containerElem = container;
    });

    const sdlInput = screen.getByPlaceholderText('Введите адрес SDL...');
    expect(sdlInput).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(sdlInput, {
        target: { value: 'https://correct-api-url' },
      });
    });

    const sdlButton = screen.getAllByRole('button', { name: 'Отправить' })[1];
    fireEvent.click(sdlButton);

    await waitFor(() => {
      const documentationButton = containerElem.querySelector(
        '.ant-layout-sider-zero-width-trigger',
      ) as Element;
      expect(documentationButton).toBeInTheDocument();
      fireEvent.click(documentationButton);
      const docList = screen.getByTestId('documentation-list');
      expect(docList).toBeInTheDocument();
    });
  });

  it('shows response data with code and status by correct api request', async () => {
    await waitFor(() => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          <Page />
        </LanguageContext.Provider>,
      );
    });

    const urlInput = screen.getByPlaceholderText(
      'Введите адрес точки доступа...',
    );
    expect(urlInput).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(urlInput, {
        target: { value: 'https://correct-api-url' },
      });
    });

    const urlButton = screen.getAllByRole('button', { name: 'Отправить' })[0];
    fireEvent.click(urlButton);

    await waitFor(() => {
      const responseData = screen.getByText(/test-graph-response-data/i);
      expect(responseData).toBeInTheDocument();
      const responseStatus = screen.getByText(/200 OK/i);
      expect(responseStatus).toBeInTheDocument();
    });
  });

  it('shows error with code and status by incorrect api request', async () => {
    await waitFor(() => {
      renderWithProviders(
        <LanguageContext.Provider value={mockLanguageContext}>
          <Page />
        </LanguageContext.Provider>,
      );
    });

    const urlInput = screen.getByPlaceholderText(
      'Введите адрес точки доступа...',
    );
    expect(urlInput).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.change(urlInput, {
        target: { value: 'https://incorrect-api-url' },
      });
    });

    const urlButton = screen.getAllByRole('button', { name: 'Отправить' })[0];
    fireEvent.click(urlButton);

    await waitFor(() => {
      const errorData = screen.getByText(/test-graph-error-response-message/i);
      expect(errorData).toBeInTheDocument();
      const errorStatus = screen.getByText(/400 HTTP error!/i);
      expect(errorStatus).toBeInTheDocument();
    });
  });
});
