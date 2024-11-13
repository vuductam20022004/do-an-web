import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import AnhQuangCao from '~/components/QuangCao/swiper'

// import Sidebar from './SideBars/SideBar'
import RecipeGrid from './Grid'
import SideBar from './SideBars/SideBar'


function BoardContent({ board }) {

  const HEIGHT_AD = '200PX'
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (

    <Box sx={{
      display:'flex'
    }}>
      <Box sx={{
        bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),//#1976d2
        height:(theme) => theme.trello.boardContentHeight,
        width:'15% ',
        p: '10px 0'
      }}>
        <SideBar />

      </Box>

      <Box sx={{
        bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
        height:(theme) => theme.trello.boardContentHeight,
        width:'85% ',
        p: '10px 15px',
        overflow: 'auto'
      }}>
        {/* anh quang cao */}
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:HEIGHT_AD,
          width:'85%',
          p: '10px 15px'
          // overflow: 'auto'
        }}>
          <AnhQuangCao />
        </Box>
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight - HEIGHT_AD,
          width:'85% ',
          p: '10px 15px',
          overflow: 'auto'
        }}>
          <RecipeGrid />
        </Box>
      </Box>
    </Box>
  )
}
export default BoardContent