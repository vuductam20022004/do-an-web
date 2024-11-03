import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Input,
  IconButton
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AppBar from '~/components/AppBar/AppBar'
import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'


import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'


const AddNewRecipe = () => {

  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    portion: '',
    cookingTime: '',
    ingredients: '',
    steps: '',
    coreMonAn:''
  })

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    // Logic xử lý đăng món ăn
    const formData = new FormData()
    formData.append('danhMuc', danhMuc)
    formData.append('name', recipe.name)
    formData.append('description', recipe.description)
    formData.append('portion', recipe.portion)
    formData.append('cookingTime', recipe.cookingTime)
    formData.append('ingredients', recipe.ingredients)
    formData.append('steps', recipe.steps)
    formData.append('coreMonAn', recipe.coreMonAn)



    if (selectedFile) {
      formData.append('image', selectedFile) // Gửi hình ảnh nếu có
    }

    try {
      const token = localStorage.getItem('token') // Lấy token từ localStorage
      const response = await fetch('http://localhost:3000/add-new-mon/them_mon_moi', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // Gửi formData với dữ liệu món ăn và ảnh
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

      const data = await response.json()
      console.log('Món ăn đã được thêm thành công:', data)
      navigate('/board')

      // Reset form sau khi thêm thành công
      handleReset()

    } catch (error) {
      console.error('Error adding recipe:', error)
    }
    // console.log(recipe)
    // console.log(danhMuc)
  }

  const handleReset = () => {
    setRecipe({
      name: '',
      description: '',
      portion: '',
      cookingTime: '',
      ingredients: '',
      steps: '',
      coreMonAn:null
    }),
    setSelectedFile(null) // Reset file ảnh
    setPreview(null) // Reset ảnh xem trước
  }
 //Up ảnh
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file) // Lưu file để gửi lên server

      // Tạo URL tạm thời để hiển thị ảnh
      setPreview(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (selectedFile) {
      console.log('File đã chọn:', selectedFile)
    }
  }, [selectedFile])

  //Danh  mucj mon an
  const [danhMuc, setDanhMuc] = useState('')
  const handleChangeDanhMuc = (event) => {
    setDanhMuc(event.target.value)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      <Box sx={{
        display:'flex',
        height:(theme) => theme.trello - theme.trello.appBarHeight,
        overflowY:'hidden'
      }}>
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:'inherit',
          width:'15% ',
          p: '10px 0'
        }}>
          <SideBar />

        </Box>

        <Box maxWidth="md" sx={{
          // bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          width:'85% ',
          p: '10px 15px',
          overflow: 'auto',
          mt: 5, mb: 5, ml:15,
          height:(theme) => theme.trello.boardContentHeight
        }}>
          <Typography variant="h4" align="center" gutterBottom>
            Thêm món ăn mới
          </Typography>
          {/* Upload hình ảnh */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <IconButton color="primary" component="label">
              <CloudUploadIcon sx={{ fontSize: 50 }} />
              <Input
                type="file"
                sx={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </IconButton>
            {preview && (
              <Box mt={2}>
                <img src={preview} alt="Ảnh xem trước" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </Box>
            )}
            <Typography variant="subtitle1">Bạn đăng hình món ăn ở đây ạ!</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Danh muc mon an */}
            <FormControl sx={{ m: 1, width:'400px' }} size="big">
              <InputLabel variant='outlined' id="demo-select-small-label">Danh mục món ăn</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={danhMuc}
                label="Danh mục"
                onChange={handleChangeDanhMuc}
              >
                <MenuItem value='chay'>Chay</MenuItem>
                <MenuItem value='mặn'>Mặn</MenuItem>
                <MenuItem value='bánh'>Bánh</MenuItem>
              </Select>
            </FormControl>

            {/* tên món ăn */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên món ăn của bạn là gì nhỉ?"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Mô tả món ăn */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hãy chia sẻ một vài suy nghĩ của bạn ở đây nha"
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Khẩu phần */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Khẩu phần"
                  name="portion"
                  value={recipe.portion}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Thời gian nấu */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Thời gian nấu (phút)"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Nguyên Liệu */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nguyên liệu"
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>

              {/* các bước Làm */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Các bước làm"
                  name="steps"
                  value={recipe.steps}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Tự đánh giá điểm của món ăn */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tự đánh giá điểm của món ăn trên"
                  name="coreMonAn"
                  value={recipe.coreMonAn}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: '45%', backgroundColor: '#33CC33' }}
                >
                  Đăng
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ width: '45%' }}
                  onClick={handleReset}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  )
}

export default AddNewRecipe
