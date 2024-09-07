import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { mockLanguageContext } from '@/__tests__/mocks/language-context';
import SignUpPage from '@/app/(auth)/sign-up/page';
import { LanguageContext } from '@/providers/language';
import { registerWithEmailAndPassword } from '@/utils/firebase';

vi.mock('@/utils/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
}));

describe('Sign up page', () => {
  it('should render correctly', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <SignUpPage />
      </LanguageContext.Provider>,
    );

    const formTitle = screen.getByText(/Регистрация/i);
    expect(formTitle).toBeInTheDocument();
  });

  it('should register by form submission', async () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <SignUpPage />
      </LanguageContext.Provider>,
    );

    await waitFor(() => {
      const emailInput = screen.getByRole('textbox', {
        name: 'Электронная почта',
      });
      fireEvent.change(emailInput, { target: { value: 'email@mail.ru' } });

      const nameInput = screen.getByLabelText('Имя');
      fireEvent.change(nameInput, { target: { value: 'Name' } });

      const passwordInput = screen.getByTestId('password');
      fireEvent.change(passwordInput, { target: { value: 'Password1$' } });

      const confirmPassInput = screen.getByLabelText('Подтвердите пароль');
      fireEvent.change(confirmPassInput, { target: { value: 'Password1$' } });
    });
    const submitButton = screen.getByRole('button', { name: /Отправить/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledOnce();
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'Name',
        'email@mail.ru',
        'Password1$',
      );
    });
  });
});
