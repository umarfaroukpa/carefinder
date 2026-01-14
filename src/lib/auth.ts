import { auth } from './firebase-client';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logout = async () => {
    await signOut(auth);
};