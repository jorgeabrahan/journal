import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

export const SideBarItem = ({ title, body, handleNoteClicked }) => {
  const newTitle = useMemo(() => {
    return title.length > 15 ? title.substring(0, 15) + '...' : title
  }, [title])
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleNoteClicked}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleNoteClicked: PropTypes.func
}
