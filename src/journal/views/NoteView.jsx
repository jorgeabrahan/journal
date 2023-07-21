import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/'
import { useEffect, useMemo } from 'react'
import { setActiveNote, startSavingNote } from '../../store/journal'
import PopupManager from 'https://cdn.jsdelivr.net/gh/jorgeabrahan/popup_library@66c9181/popup/Popup.js'

const Popup = new PopupManager('Actualización nota', 'close')
export const NoteView = () => {
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector((store) => store.journal)
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])
  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])
  useEffect(() => {
    if (messageSaved.length > 0) {
      Popup.content(messageSaved).options({ position: 'center' }).show()
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSavingNote())
  }
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedio en el día de hoy?"
          label="Descripción"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  )
}
