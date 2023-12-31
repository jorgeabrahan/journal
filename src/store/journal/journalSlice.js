import { createSlice } from '@reduxjs/toolkit'

// @note: { id: string, title: string, body: string, date: number, imageUrls: string[] }
const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [], // @notes: @note[]
  active: null // @note::active (e.i. current opened note)
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id !== action.payload.id) return note
        return action.payload
      })
      state.messageSaved = 'Nota actualizada correctamente'
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.active = null // clear active note
      // return all notes except for the removed one
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    }
  }
})

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById
} = journalSlice.actions

export default journalSlice
