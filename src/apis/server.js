
import sql from 'mssql'
import express from 'express'
import cors from 'cors'

import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())

const JWT_SECRET = 'your_jwt_secret_key'



// app.use(bodyParser.json())

// Cấu hình kết nối tới SQL Server
const dbConfig = {
  user: 'sa',
  password: '123456',
  server: 'localhost', // Địa chỉ SQL Server
  database: 'do-an-web',
  port: 3306,
  options: {
    trustServerCertificate: true // Chỉ cần khi server là local hoặc không có chứng chỉ SSL
  }
}

// Kết nối tới SQL Server
sql.connect(dbConfig)
  .then(() => {
    console.log('Đã kết nối SQL Server')
  })
  .catch(err => {
    console.error('Lỗi kết nối: ', err)
  })

// Route mẫu
app.listen(3000, () => {
  console.log('Server đang chạy trên cổng 3000')
})


app.use(express.json()) // Để xử lý JSON từ request body

// Route: Lấy danh sách tất cả mon an
app.get('/board/all', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig) 
    const result = await pool.request().query('SELECT * FROM monAn')
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})


// API lấy chi tiết món theo ID
app.get('/chitietmonan/:id', async (req, res) => {
  const { id } = req.params// Lấy id từ params URL
  // console.log(id)

  try {
    // Tạo một truy vấn để lấy chi tiết món ăn từ SQL Server
    const result = await sql.query`SELECT * FROM monAn WHERE id = ${id} `
    if (result.recordset.length > 0) {
      res.json(result.recordset[0])// Trả về dữ liệu chi tiết món ăn nếu tìm thấy
    } else {
      res.status(404).json({ message: 'Món ăn không tồn tại' })
    }
  } catch (err) {
    console.error('Lỗi khi truy vấn:', err)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})




//API đăng nhập
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Create a SQL query to find the user by username and password (plaintext)
    const query = 'SELECT * FROM users WHERE username = @username AND password = @password'
    const pool = await sql.connect()
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password) // plaintext password
      .query(query)

    const user = result.recordset[0]// Get the first user from the result

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' })
    }

    // If credentials are valid, create a JWT token
    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    // Send the token and success response
    res.json({ success: true })
    // res.json({ success: true, token })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})