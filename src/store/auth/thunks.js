import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerWithEmailAndPassword,
  signInWithGoogle
} from '../../firebase/providers'
import { clearNotesLogout } from '../journal'
import { checkCredentials, login, logout } from './'

export const googleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkCredentials())
    const result = await signInWithGoogle()
    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }))
    dispatch(login(result))
  }
}
export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(checkCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerWithEmailAndPassword(user)
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(
      login({
        uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: photoURL
      })
    )
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(checkCredentials())
    const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailAndPassword(user)
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email: user.email, photoURL }))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(clearNotesLogout())
    dispatch(logout())
  }
}
