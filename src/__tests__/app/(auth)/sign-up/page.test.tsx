import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignUpPage from '@/app/(auth)/sign-up/page';
import { LanguageContext } from '@/providers/language';
import { registerWithEmailAndPassword } from '@/utils/firebase';

import * as language from '../../../../../public/locale/ru.json';

vi.mock('@/utils/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
}));

describe('Sign up page', () => {
  it('should render correctly', () => {
    render(
      <LanguageContext.Provider
        value={{ toggleLanguage: vi.fn(), t: language }}
      >
        <SignUpPage />
      </LanguageContext.Provider>,
    );

    const formTitle = screen.getByText(/Регистрация/i);
    expect(formTitle).toBeInTheDocument();
  });

  it('should register by form submission', async () => {
    render(
      <LanguageContext.Provider
        value={{ toggleLanguage: vi.fn(), t: language }}
      >
        <SignUpPage />
      </LanguageContext.Provider>,
    );

    const emailInput = screen.getByRole('textbox', {
      name: 'Электронная почта',
    });
    fireEvent.change(emailInput, { target: { value: 'email@mail.ru' } });

    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'Password' } });

    const confirmPassInput = screen.getByLabelText('Подтвердите пароль');
    fireEvent.change(confirmPassInput, { target: { value: 'Password' } });

    const submitButton = screen.getByRole('button', { name: /Отправить/i });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledOnce();
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'email@mail.ru',
        'Password',
      );
    });
  });
});
