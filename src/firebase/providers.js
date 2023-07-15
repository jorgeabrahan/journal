import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleAuthProvider)
    const user = result?.user
    if (user === undefined)
      return {
        ok: false,
        errorMessage: 'User does not exist'
      }
    const { displayName, email, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (err) {
    const { message } = err
    return {
      ok: false,
      errorMessage: message
    }
  }
}

export const registerWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = resp.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (err) {
    const { message } = err
    return {
      ok: false,
      errorMessage: message
    }
  }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, displayName, photoURL } = resp.user
    return {
      ok: true,
      uid,
      displayName,
      photoURL
    }
  } catch (err) {
    const { message } = err
    return {
      ok: false,
      errorMessage: message
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
