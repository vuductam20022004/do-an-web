import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import Sidebar from './SideBars/SideBar'


function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (

    <Box sx={{
      display:'flex'
    }}>
      <Box sx={{
        bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
        height:(theme) => theme.trello.boardContentHeight,
        width:'15% ',
        p: '10px 0'
      }}>
        <Sidebar />
      </Box>

      <Box sx={{
        bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
        height:(theme) => theme.trello.boardContentHeight,
        width:'85% ',
        p: '10px 0'
      }}>
        {/* bọc 2 hoặc nhiều column */}
        <ListColumns columns = {orderedColumns} />
      </Box>
    </Box>
  )
}
export default BoardContent