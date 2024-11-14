import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'


import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'


const RecipeGrid = () => {
  const [data, setMonAns] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/board/all', {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setMonAns(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
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
                image={item.image}
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
  )
}
export default RecipeGrid
