/* eslint-env jest */
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import { FirebaseFirestore } from '../../../src/firebase/config'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote
} from '../../../src/store/journal/journalSlice'
import { startNewNote } from '../../../src/store/journal/thunks'

describe('Pruebas en journal thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('Debe de crear una nueva nota en blanco', async () => {
    const uid = 'TESTUID'
    getState.mockReturnValue({ auth: { uid } })
    await startNewNote()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    const newNote = {
      title: '',
      body: '',
      date: expect.any(Number),
      id: expect.any(String),
      imageUrls: []
    }
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote))
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote))
    const collectionRef = collection(FirebaseFirestore, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const deletePromises = []
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  })
})
