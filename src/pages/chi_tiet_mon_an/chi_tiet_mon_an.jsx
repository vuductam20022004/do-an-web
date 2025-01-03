
import { useState } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material'
import { AccessTime, Group } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Flip, toast } from 'react-toastify'


import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


function RecipeDetail() {
  const { ID } = useParams()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const token = localStorage.getItem('token')
  const nameUserJWTDecode = jwtDecode(token)

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/binh-luan', { ID, comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        // alert('Bình luận Thành Công')
        setComments([...comments, { fullName: nameUserJWTDecode.fullNameUser,
          comment: comment,
          imageUser:nameUserJWTDecode.avatarUser
        }])
        setComment('')

      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Đăng ký lỗi:', error)
      alert('Bình Luận lỗi')
    }

  }

  const [recipe, setRecipe] = useState(null)

  //Click button Luu Mon
  const handleClickLuuMon = async() => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/luu-mon', { ID }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme:'colored',
          progress: undefined
        })
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme:'colored',
          progress: undefined
        })
      }
    } catch (error) {
      console.error('Đăng ký lỗi:', error)
      toast.error('Món ăn đã được lưu trước kia!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored',
        progress: undefined
      })
    }
  }


  useEffect(() => {

    //hàm fetchRecipeDetail để gọi API lấy dữ liệu theo ID
    const fetchRecipeDetail = async (id) => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/chitietmonan/${id}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        setRecipe(data[0])
        setComments(data)
        // Cập nhật state với dữ liệu món ăn
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết món ăn:', error)
      }
    }
    fetchRecipeDetail(ID) // Gọi hàm fetch API
  }, [ID])

  if (!recipe) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>


      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src = {`../${recipe.image}`} alt='Ảnh chi tiết món ăn'
          height='300px'/>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography>{recipe.timeNau} phút</Typography>
          <Group sx={{ ml: 3, mr: 1 }} />
          <Typography>{recipe.khauPhan} người</Typography>
          {/* <Group sx={{ ml: 3, mr: 1 }} /> */}
          <Typography variant='h6' sx={{ ml: '50px' } } align='right' >{recipe.core} ĐIỂM</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
          onClick={handleClickLuuMon}
        >
      Lưu món
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">{recipe.name}</Typography>
        <Typography color="text.secondary">Suy nghĩ của tác giả: {recipe.moTa}</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Các nguyên liệu:</Typography>
        <TextField
          fullWidth
          label=""
          name="steps"
          value={recipe.nguyenLieu}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            readOnly: true
          }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Các bước làm</Typography>
        <TextField
          fullWidth
          label=""
          name="steps"
          value={recipe.step}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            readOnly: true
          }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography variant="h6">Bình luận ({comments.length })</Typography>
        <List>
          {comments.map(item => (
            <ListItem key={item.IDbinhLuan}>
              <ListItemAvatar>
                <Avatar alt={item.fullName} src= {item.imageUser ? `../${item.imageUser}` : '' } />
              </ListItemAvatar>
              <ListItemText
                primary={item.fullName}
                secondary={item.comment}
              />
            </ListItem>
          ))}
        </List>

        <TextField
          fullWidth
          label="Viết bình luận"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={2}
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ mt: 2 }}
        >
      Bình luận
        </Button>
      </Box>

    </Box>
  )
}

export default RecipeDetail
