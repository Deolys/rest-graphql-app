import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import Page from '@/app/page';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/config/firebase-config', () => ({
  auth: {},
}));

describe('MainPage', () => {
  it('renders component', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Page />
      </LanguageContext.Provider>,
    );
  });

  it('renders content', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Page />
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
