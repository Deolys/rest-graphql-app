import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

describe('Page Component', () => {
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
        target: { value: 'https://correct-sdl-url' },
      });
    });

    const sdlButton = screen.getByTestId('sdl-button');
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
});
