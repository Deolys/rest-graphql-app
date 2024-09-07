import { signInWithEmailAndPassword } from 'firebase/auth';
import { describe, expect, test, vi } from 'vitest';

import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '@/utils/firebase';

const CORRECT_PASS = 'good pass';
vi.mock('@/config/firebase-config', () => ({
  auth: vi.fn(() => ({})),
  db: vi.fn(() => ({})),
}));
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn((_, __, password) => {
    if (password !== CORRECT_PASS) throw new Error('sign-in password error');
  }),
  createUserWithEmailAndPassword: vi.fn((_, __, password) => {
    if (password !== CORRECT_PASS)
      throw new Error('create user password error');
    return {
      user: 'user',
      providerId: '007',
      operationType: 'link',
    };
  }),
  updateProfile: vi.fn(() => 'updateProfile'),
}));

describe('firebase', () => {
  test('logInWithEmailAndPassword must return undefined', async () => {
    const result = await logInWithEmailAndPassword(
      'mail@mail.com',
      CORRECT_PASS,
    );
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
  test('logInWithEmailAndPassword must return error', async () => {
    const result = await logInWithEmailAndPassword('mail@mail.com', 'bad_pass');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(2);
    expect(result && result.error).toBeDefined();
  });
  test('registerWithEmailAndPassword must return undefined', async () => {
    const result = await registerWithEmailAndPassword(
      'userName',
      'mail@mail.com',
      CORRECT_PASS,
    );
    expect(result).toBeUndefined();
  });
  test('registerWithEmailAndPassword must return error', async () => {
    const result = await registerWithEmailAndPassword(
      'userName',
      'mail@mail.com',
      'password',
    );
    expect(result && result.error).toBeDefined();
  });
});
