import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseFirestore } from '../../firebase/config'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from './'
import { fileUpload, loadNotes } from '../../helpers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }
    const newDoc = doc(collection(FirebaseFirestore, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('El uid del usuario no existe')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc(FirebaseFirestore, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })
    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []
    for (const file of files) fileUploadPromises.push(fileUpload(file))
    const imageUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToActiveNote(imageUrls))
    dispatch(startSavingNote())
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal
    const docRef = doc(FirebaseFirestore, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)
    dispatch(deleteNoteById(note.id))
  }
}
