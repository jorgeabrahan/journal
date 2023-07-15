import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', // checking / not-authorized / authorized
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = 'authorized'
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.errorMessage = null
    },
    logout: (state, action) => {
      state.status = 'not-authorized'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = action.payload?.errorMessage || ''
    },
    checkCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const { login, logout, checkCredentials } = authSlice.actions

export default authSlice
