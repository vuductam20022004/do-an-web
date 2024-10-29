



import { Box, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Avatar, Paper } from '@mui/material'

import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'

function ProfilePage() {
  const HEIGHT_AD = '200PX'





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
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }} />
                  <Typography variant="h5">Tên tài khoản</Typography>
                  <Box ml={2} p={1} bgcolor="pink" borderRadius={1}>
                    <Typography>50 điểm</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <TextField label="Họ và tên" variant="outlined" fullWidth sx={{ mb: 2, mr: 2 }} />
                  <TextField label="User Name" variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <TextField label="Năm sinh" variant="outlined" fullWidth sx={{ mb: 2, mr: 2 }} />
                  <TextField label="Mật khẩu" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <RadioGroup row>
                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                    <FormControlLabel value="other" control={<Radio />} label="Khác" />
                  </RadioGroup>
                  <TextField label="Gmail" variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    Xem danh sách những món đã đăng
                  </Typography>
                </Box>

                <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                  Chỉnh sửa
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ProfilePage;
