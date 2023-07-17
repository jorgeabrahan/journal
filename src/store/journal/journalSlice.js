import { createSlice } from '@reduxjs/toolkit'

// @note: { id: string, title: string, body: string, date: number, imageUrls: string[] }
const initialState = {
  isSaving: true,
  messageSaved: '',
  notes: [], // @notes: @note[]
  active: null // @note::active (e.i. current opened note)
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, action) => {},
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  }
})

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } =
  journalSlice.actions

export default journalSlice
