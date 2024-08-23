import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from '@/config/firebase-config';

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
  name: string,
  email: string,
  password: string,
): AuthResult => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    await updateProfile(user, { displayName: name });
  } catch (err) {
    return { error: err };
  }
};

const logout = (): void => {
  signOut(auth);
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
