import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'


import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Flip, toast } from 'react-toastify'


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // State to toggle between login and register

  const handleToggle = () => {
    setIsLogin(!isLogin)// Switch between login and register
  }

  return (

    <Box
      item
      xs={12}
      md={6}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("src/image/BackgroundLogin/backGroundLogin.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: '16px',
          maxWidth: 400,
          width: '100%',
          bgcolor: '#66FFCC',
          // bgcolor: '',
          justifyContent: 'center'

        }}
      >
        {isLogin ? (
          <LoginForm handleToggle={handleToggle} />
        ) : (
          <RegisterForm handleToggle={handleToggle} />
        )}
      </Paper>
    </Box>
  )
}

function LoginForm({ handleToggle }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password })
      if (response.data.success) {
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme:'colored',
          progress: undefined
        })
        localStorage.setItem('token', response.data.token)//Lưu token vào localStorage của Client
        navigate('/board', { replace: true })//Điều hướng

      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
      }
    }
    catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during login.')
    }
  }
  return (
    <>

      <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
        Đăng nhập
      </Typography>

      {/* Username Field */}
      <TextField label="User Name" variant="outlined" fullWidth margin="normal" value={username}
        onChange={(e) => setUsername(e.target.value)} />

      {/* Password Field */}
      <TextField label="Password" variant="outlined" fullWidth type="password" margin="normal" value={password}
        onChange={(e) => setPassword(e.target.value)}/>

      {/* Login Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          background:'#33CC00',
          '&:hover': { bgcolor: '' }
        }}
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>

      {/* Toggle to Register */}
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" underline="none" onClick={handleToggle}>
          Đăng kí tài khoản
        </Link>
      </Typography>
    </>
  )
}

function RegisterForm({ handleToggle }) {


  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Nữ')

  const handleRegister = async () => {
    try {
      if (fullName == '' || username =='' ||birthYear == ''||password ==''||email=='') {
        toast.error('Vui lòng nhập đủ thông tin ', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        return
      }
      if (!Number.isInteger(Number(birthYear))) {
        toast.error('Năm sinh không hợp lệ ', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        return
      }
      if (password.length <= 5) {
        toast.error('Mật khẩu > 5 kí tự ', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        return
      }
      const response = await axios.post('http://localhost:3000/register', {
        fullName,
        username,
        birthYear,
        password,
        email,
        gender
      })
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        handleToggle()// Chuyển về trang đăng nhập
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
      }
    } catch (error) {
      console.error('Đăng ký lỗi:', error)
      alert('Lỗi trong quá trình đăng kí')
    }
  }


  return (
    <>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
        Đăng Ký
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Họ và tên" variant="outlined" fullWidth margin="normal" value={fullName}
            onChange={(e) => (setFullName(e.target.value)) } />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="User Name" variant="outlined" fullWidth margin="normal" value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Năm sinh" variant="outlined" fullWidth margin="normal" value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Mật khẩu" variant="outlined" fullWidth margin="normal" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Grid>
      </Grid>

      <TextField label="Gmail" variant="outlined" fullWidth margin="normal" value={email}
        onChange={(e) => setEmail(e.target.value)} />

      <Typography sx={{ mt: 2 }}>Giới tính</Typography>
      <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)} >
        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
        <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
      </RadioGroup>

      {/* Register Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          bgcolor: '#f48fb1',
          // bgcolor: 'pink',
          '&:hover': { bgcolor: '#f06292' }
        }}
        onClick={handleRegister}
      >
        Đăng Ký
      </Button>

      {/* Toggle to Login */}
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" underline="none" onClick={handleToggle}>
          Đăng nhập
        </Link>
      </Typography>
    </>
  )
}

export default AuthPage
