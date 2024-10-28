
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Grid, Card, CardMedia, CardContent, Typography,Avatar, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'
const MonCuaToi = () => {
  const HEIGHT_AD = '200PX'

  const [data, setMonAns] = useState([])
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
            // overflow: 'auto'
          }}>
            <img style={{ height:HEIGHT_AD, width:'100%', boxSizing:'', padding:'10px 5px' }} src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" alt="Image AD" />
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
                        image="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg"
                        alt={item.image}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{item.moTa}</Typography>
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
    </Container>

  )
}

export default MonCuaToi