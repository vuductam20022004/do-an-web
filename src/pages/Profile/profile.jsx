

import { Box, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Avatar, Paper } from '@mui/material'

import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'
import { useEffect, useState } from 'react'
import { Password } from '@mui/icons-material'
import { Link } from 'react-router-dom'


function ProfilePage() {
  const HEIGHT_AD = '200PX'

  const [data, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleChinhSua = () => {

  }
  const handleDoiMatKhau = () => {

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/trang-ca-nhan', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }
        const result = await response.json()
        setProfile(result)
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading....</div>
  }

  return(
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
          // bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight,
          width:'85% ',
          p: '10px 15px',
          overflow: 'auto'
        }}>

          <Box sx={{
            // bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:(theme) => theme.trello.boardContentHeight - HEIGHT_AD,
            width:'85% ',
            p: '10px 15px',
            overflow: 'auto'
          }}>
            <Box flexGrow={1} p={4}>
              <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }} src='src/image/BackgroundLogin/backGroundLogin.jpg' />
                  <Typography variant="h5">{data.fullName}</Typography>
                  <Box ml={2} p={1} bgcolor="pink" borderRadius={1}>
                    <Typography>{data.core} điểm</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <TextField variant="outlined" label = 'Họ và tên' fullWidth sx={{ mb: 2, mr: 2 }} value={data.fullName} />
                  <TextField variant="outlined" label = 'Username ' fullWidth sx={{ mb: 2 }} value={data.username} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <TextField value={data.birthYear} label = 'Năm sinh' variant="outlined" fullWidth sx={{ mb: 2, mr: 2 }} />
                  <TextField value={data.password} label = 'Password' type="password" variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box justifyContent="space-between">
                  <RadioGroup row>
                    <FormControlLabel value = {data.gender} control={<Radio />} label={data.gender} checked />
                  </RadioGroup>
                  <TextField value={data.email} label = 'Email' variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    <Link to={'/mon-cua-toi'}> Xem danh sách các món đã đăng </Link>
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ mt: 4, mr:4 }} onClick = { handleChinhSua }>
                  Chỉnh sửa
                </Button>
                <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={ handleDoiMatKhau}>
                  Đổi mật khẩu
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ProfilePage
