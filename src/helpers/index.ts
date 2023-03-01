import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { config } from "../firebase/config";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const login = async () => {
  await signInWithEmailAndPassword(auth, config.user, config.pass)

}

export const logout = async () => {
  await signOut(auth)
}