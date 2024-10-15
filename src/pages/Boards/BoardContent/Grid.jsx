import { Grid, Card, CardMedia, CardContent, Typography,Avatar, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

const data = [
  {
    title: 'Cánh Gà Chiên Nước Mắm Mật Ong',
    author: 'Emily Luu',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 1
  },
  {
    title: 'Cánh gà chiên mắm',
    author: 'Phạm Minh Trang',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 1
  },
  {
    title: 'Cánh gà chiên nước mắm',
    author: 'Phuoc Le',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 4
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  },
  {
    title: 'Cánh Gà Chiên Nước Mắm',
    author: 'Bòn Bon',
    image: 'https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg',
    cooksnap: 3
  }
]

const RecipeGrid = () => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">{item.author}</Typography>
              <IconButton size="small">
                <BookmarkBorderIcon />
              </IconButton>
              <Typography variant="body2" color="textSecondary">
                {item.cooksnap} cooksnap
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
export default RecipeGrid
