import { fireEvent, render, screen } from '@testing-library/react';
import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Header from '@/components/header/header';
import { pageRoutes } from '@/constants/page-routes';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/utils/firebase', () => ({
  logout: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Header component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>);
  });

  vi.mock('@/config/firebase-config', () => ({
    auth: {},
  }));

  const mockUser: Partial<User> = {
    uid: 'user1',
  };

  it('renders logo and language switcher', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Header />
      </LanguageContext.Provider>,
    );

    expect(screen.getByAltText('REST GraphQL logo')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders buttons for unauthenticated users', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Header />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Вход'));
    expect(mockPush).toHaveBeenCalledWith(pageRoutes.SIGN_IN);

    fireEvent.click(screen.getByText('Регистрация'));
    expect(mockPush).toHaveBeenCalledWith(pageRoutes.SIGN_UP);
  });

  it('renders buttons for authenticated users', () => {
    vi.mocked(useAuthState).mockReturnValue([
      mockUser as User,
      false,
      undefined,
    ]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Header />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('Выход')).toBeInTheDocument();
  });

  it('shows language switcher', () => {
    vi.mocked(useAuthState).mockReturnValue([null, true, undefined]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Header />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('changes styles when scrolling', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Header />
      </LanguageContext.Provider>,
    );

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('border-bottom: 1px solid #cbcbcb');
  });
});
