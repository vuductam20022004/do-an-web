import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'

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
        bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
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
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:HEIGHT_AD,
          width:'85%',
          p: '10px 15px'
          // overflow: 'auto'
        }}>
          <img style={{ height:HEIGHT_AD, width:'85%', boxSizing:'', padding:'10px 5px' }} src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" alt="Image AD" />
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