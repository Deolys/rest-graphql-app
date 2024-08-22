import { auth, db } from '@/config/firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

type AuthResult = Promise<{ error: unknown } | void>;

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
): AuthResult => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return { error: err };
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
): AuthResult => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    return { error: err };
  }
};

const logout = (): void => {
  signOut(auth);
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
