import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignInPage from '@/app/(auth)/sign-in/page';
import { LanguageContext } from '@/providers/language';
import { logInWithEmailAndPassword } from '@/utils/firebase';

import { mockLanguageContext } from '../../../mocks/language-context';

vi.mock('@/utils/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

describe('Sign in page', () => {
  it('should render correctly', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <SignInPage />
      </LanguageContext.Provider>,
    );

    const formTitle = screen.getByText(/Вход/i);
    expect(formTitle).toBeInTheDocument();
  });

  it('should login by form submission', async () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <SignInPage />
      </LanguageContext.Provider>,
    );

    const emailInput = screen.getByRole('textbox', {
      name: 'Электронная почта',
    });
    fireEvent.change(emailInput, { target: { value: 'email@mail.ru' } });

    const passwordInput = screen.getByLabelText('Пароль');
    fireEvent.change(passwordInput, { target: { value: 'Password' } });

    const submitButton = screen.getByRole('button', { name: /Отправить/i });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledOnce();
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'email@mail.ru',
        'Password',
      );
    });
  });
});
