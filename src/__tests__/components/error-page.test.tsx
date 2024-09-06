import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorPage } from '@/components/error-page/error-page';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ErrorPage', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render error message and button', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <ErrorPage />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
    expect(screen.getByText('Главная страница')).toBeInTheDocument();
  });

  it('should navigate to main page on button click', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <ErrorPage />
      </LanguageContext.Provider>,
    );

    const button = screen.getByText('Главная страница');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
