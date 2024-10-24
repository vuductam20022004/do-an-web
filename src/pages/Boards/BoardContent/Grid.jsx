import { Grid, Card, CardMedia, CardContent, Typography,Avatar, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'


import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Style } from '@mui/icons-material'

import { useState, useEffect } from 'react'



// const data = [
//   {
//     title: 'Cánh Gà Chiên Nước Mắm Mật Ong',
//     author: 'Emily Luu',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 1
//   },
//   {
//     title: 'Cánh gà chiên mắm',
//     author: 'Phạm Minh Trang',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 1
//   },
//   {
//     title: 'Cánh gà chiên nước mắm',
//     author: 'Phuoc Le',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 4
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   },
//   {
//     title: 'Cánh Gà Chiên Nước Mắm',
//     author: 'Bòn Bon',
//     image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
//     cooksnap: 3
//   }
// ]

const RecipeGrid = () => {
  const [data, setMonAns] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/board/all')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMonAns(data)// Giả sử bạn đã định nghĩa setUsers để lưu dữ liệu
      })
      .catch(error => console.error('Error:', error))
  }, [])
  
  return (
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
                <Typography variant="h6">{item.moTa}</Typography>
                <Typography variant="body2" color="textSecondary">{item.moTa}</Typography>
                <IconButton size="small">
                  <BookmarkBorderIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item.nguyenLieu} Tác giả
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}
export default RecipeGrid
