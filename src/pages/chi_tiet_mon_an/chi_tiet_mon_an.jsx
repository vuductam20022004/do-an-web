
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

function RecipeDetail() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([{ username: 'Tên tài khoản', content: 'Nội dung bình luận' }])

  const handleAddComment = () => {
    setComments([...comments, { username: 'Tên tài khoản', content: comment }])
    setComment('')
  }

  return (
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography>30 phút</Typography>
          <Group sx={{ ml: 3, mr: 1 }} />
          <Typography>4 người</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
        >
          Lưu món
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">Tên món ăn</Typography>
        <Typography color="text.secondary">Suy nghĩ của người đăng</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Nguyên liệu</Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Nguyên liệu 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Nguyên liệu 2" />
          </ListItem>
          {/* Add more ingredients here */}
        </List>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Các bước làm</Typography>
        <Typography paragraph>
          Bước 1: Mô tả chi tiết các bước làm món ăn ở đây.
        </Typography>
        <Typography paragraph>
          Bước 2: Mô tả chi tiết các bước tiếp theo.
        </Typography>
        {/* Add more steps here */}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6">Bình luận ({comments.length})</Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={comment.username} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.username}
                secondary={comment.content}
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
