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

import SelectDanhMuc from '~/components/AppBar/Menu/select'

const AddNewRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    portion: '',
    cookingTime: '',
    ingredients: '',
    steps: ''
  })

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic xử lý đăng món ăn
    console.log(recipe)
  }

  const handleReset = () => {
    setRecipe({
      name: '',
      description: '',
      portion: '',
      cookingTime: '',
      ingredients: '',
      steps: '',
      coreMonAn:''
    })
  }
 //Up ảnh
  const [preview, setPreview] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Tạo URL tạm thời để hiển thị ảnh
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
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
        <SelectDanhMuc />
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tự đánh giá điểm của món ăn trên"
              name="coreDiemMonAn"
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
              sx={{ width: '45%', backgroundColor: '#f8b6d1' }}
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
    </Container>
  )
}

export default AddNewRecipe
