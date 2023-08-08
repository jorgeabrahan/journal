/* eslint-env jest */
import {
  loginWithEmailAndPassword,
  logoutFirebase,
  signInWithGoogle
} from '../../../src/firebase/providers'
import { checkCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { googleSignIn, loginUser, logoutUser } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal/journalSlice'
import { demoUser } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en authThunks', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('Start google sign in deberia llamar check credentials y el login en caso de que funcione', async () => {
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue(loginData)
    await googleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })
  test('Start google sign in deberia llamar check credentials y el logout en caso de que no funcione', async () => {
    const loginData = { ok: false, errorMessage: 'Error de autenticacion en google' }
    await signInWithGoogle.mockResolvedValue(loginData)
    await googleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }))
  })
  test('Start login with email and password debe llamar check credentials y el login en caso de que funcione', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }
    await loginWithEmailAndPassword.mockResolvedValue(loginData)
    await loginUser(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkCredentials())
    expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }))
  })
  test('Start logout debe llamar el logout de firebase, clear notes y logout', async () => {
    await logoutUser()(dispatch)
    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
