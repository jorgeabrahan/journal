import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch()
  const { displayName } = useSelector((store) => store.auth)
  const { notes } = useSelector((store) => store.journal)
  const onNoteClicked = (note) => dispatch(setActiveNote(note))

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} handleNoteClicked={() => onNoteClicked(note)} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

SideBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired
}
