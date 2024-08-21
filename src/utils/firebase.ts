import { auth, db } from '@/config/firebase-config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    return { error: err }
  }
}

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    return { error: err }
  }
}

const logout = () => {
  signOut(auth)
}

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout }
