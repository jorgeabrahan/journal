/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store/auth'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const mockGoogleSignIn = jest.fn()
const mockLoginWithEmailAndPassword = jest.fn()
const mockLoginUser = jest.fn()
jest.mock('../../../src/store/auth/thunks', () => ({
  googleSignIn: () => mockGoogleSignIn,
  loginWithEmailAndPassword: () => mockLoginWithEmailAndPassword,
  loginUser: () => mockLoginUser
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))
const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('Pruebas en <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks())
  test('Debe mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })
  test('Boton de google debe de llamar el google sign in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    const googleBtn = screen.getByLabelText('google-btn')
    fireEvent.click(googleBtn)
    expect(mockGoogleSignIn).toHaveBeenCalled()
  })
  test('Submit debe llamar el startLoginWithEmailAndPassword', () => {
    const email = 'jorge24abrahah@gmail.com'
    const password = '123456'
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    const emailField = screen.getByRole('textbox', { name: 'Correo' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, { target: { name: 'password', value: password } })

    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)
  })
})
