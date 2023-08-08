export const initialState = {
  status: 'checking', // checking / not-authorized / authorized
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authorized', // checking / not-authorized / authorized
  uid: '123ABC456DEF',
  email: 'testuser@gmail.com',
  displayName: 'Test user',
  photoURL: 'https://demo.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: 'not-authorized', // checking / not-authorized / authorized
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: ''
}

export const demoUser = {
  uid: '123ABC456DEF',
  email: 'testuser@gmail.com',
  displayName: 'Test user',
  photoURL: 'https://demo.jpg'
}
