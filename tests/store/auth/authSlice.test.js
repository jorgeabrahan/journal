/* eslint-env jest */
import authSlice, { checkCredentials, login, logout } from '../../../src/store/auth/authSlice'
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState
} from '../../fixtures/authFixtures'

describe('Pruebas en authSlice', () => {
  test('Debe de regresar el estado inicial y llamarse "auth"', () => {
    const state = authSlice.reducer(initialState, {})
    expect(state).toEqual(initialState)
    expect(authSlice.name).toBe('auth')
  })
  test('Debe de realizar la autenticacion', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual({
      status: 'authorized',
      uid: state.uid,
      email: state.email,
      displayName: state.displayName,
      photoURL: state.photoURL,
      errorMessage: null
    })
  })
  test('Debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout())
    expect(state).toEqual(notAuthenticatedState)
  })
  test('Debe de realizar el logout con argumentos', () => {
    const errorMessage = 'Las credenciales no son correctas'
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage
    })
  })
  test('Debe cambiar el estado a checking', () => {
    const state = authSlice.reducer(initialState, checkCredentials())
    expect(state.status).toBe('checking')
  })
})
