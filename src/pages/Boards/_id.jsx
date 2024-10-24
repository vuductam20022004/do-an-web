import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import { mockData } from '~/apis/mock-data'

import App from '~/pages/Boards/BoardContent/SideBars/Router/routing'

function Board() {
  return (
    
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      {/* <BoardBar board = {mockData?.board} /> */}
      {/* <BoardContent board = {mockData?.board}/> */}
      <App />
    </Container>
  )
}
export default Board