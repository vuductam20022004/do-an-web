
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import DeleteIcon from '@mui/icons-material/Delete'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import AnhQuangCao from '~/components/QuangCao/swiper'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'
const MonCuaToi = () => {
  const HEIGHT_AD = '200PX'
  const [data, setMonAns] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedId, setSelectedId] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/mon-cua-toi', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }
        const result = await response.json()
        setMonAns(result)
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error)
      }
    }
    fetchData()
  }, [])


  const handleOpenDialog = (id) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedId(null)
  }

  //  hàm xử lý xóa món ăn
  const handleConfirmDelete = async (id) => {
    try {
      // const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/xoa-mon-cua-toi', { id })
      if (response.data.success) {
        handleCloseDialog()
        window.location.reload()
      }
    } catch (error) {
      console.error('Lỗi xóa món ăn:', error)
    }
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />

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
          {/* anh quang cao */}
          <Box sx={{
            bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:HEIGHT_AD,
            width:'85%',
            p: '10px 15px'
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
            <Grid container spacing={2}>
              {data.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.ID}>
                  <Link to={`/chitietmonan/${item.ID}`} style={{ textDecoration:'none' }} >
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image= {item.image}
                        alt='Ảnh Của Món Của Tôi'
                      />
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{item.moTa}</Typography>
                        <IconButton size="small" onClick={(event) => { event.preventDefault(); handleOpenDialog(item.ID) }} >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small">
                          <BookmarkBorderIcon />
                        </IconButton>
                        <Typography variant="body2" color="textSecondary">
                          {item.userId} Tác giả
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa món ăn này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
          <Button onClick={() => handleConfirmDelete(selectedId)} color="secondary">Xóa</Button>
        </DialogActions>
      </Dialog>


    </Container>

  )
}

export default MonCuaToi