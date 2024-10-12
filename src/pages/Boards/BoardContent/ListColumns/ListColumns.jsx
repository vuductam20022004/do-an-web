import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'


function ListColumns({ columns }) {

  return (
    <Box sx={{
      bgcolor: 'inherit',
      height: '100%',
      width:'100% ',
      display:'flex',
      overflowX: 'auto',
      overflowY: 'hidden',

      '&::-webkit-scrollbar-track':{ m: 2 }
    }}>
      {columns.map(column => <Column key={column._id} column = {column}/> )}

      {/* Add new column */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d',
        justifyContent: 'flex-start',
        pl: 2.5,
        py: 0.5
      }}>

      </Box>
    </Box>
  )
}

export default ListColumns