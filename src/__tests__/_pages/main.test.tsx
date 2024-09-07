import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import { MainPage } from '@/_pages/main-page/main-page';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/config/firebase-config', () => ({
  auth: {},
}));

vi.mock('@/components', () => ({
  Main: () => <div>Main</div>,
  ProjectInfo: () => <div>ProjectInfo</div>,
  DevelopersList: () => <div>DevelopersList</div>,
  CourseInfo: () => <div>CourseInfo</div>,
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

describe('MainPage', () => {
  it('renders component', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <MainPage />
      </LanguageContext.Provider>,
    );
  });

  it('renders content', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <MainPage />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('Разработчики')).toBeInTheDocument();
    expect(screen.getByText('О курсе')).toBeInTheDocument();
    expect(
      screen.getByText('Добро пожаловать в REST/GraphiQL Client'),
    ).toBeInTheDocument();
    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });
});
