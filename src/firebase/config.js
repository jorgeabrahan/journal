// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { apiKey } from '../secret'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'journal-27e84.firebaseapp.com',
  projectId: 'journal-27e84',
  storageBucket: 'journal-27e84.appspot.com',
  messagingSenderId: '398052355626',
  appId: '1:398052355626:web:02c64366da5a9d6a5ddd53'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseFirestore = getFirestore(FirebaseApp)
