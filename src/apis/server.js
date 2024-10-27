
import sql from 'mssql'
import express from 'express'
import cors from 'cors'

import jwt from 'jsonwebtoken'
import authenticateUerToken from '../pages/Auth/authenticateUserToken.js'



const app = express()
app.use(cors())

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
app.get('/chitietmonan/:id', authenticateUerToken, async (req, res) => {
  const { id } = req.params// Lấy id từ params URL
  const t = req.userIdAuthen
  console.log(t)
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

const secretKey = 'vuductam'//PrivateKey
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Create a SQL query to find the user by username and password (plaintext)
    const query = 'SELECT * FROM users WHERE username = @username AND password = @password'
    const pool = await sql.connect()
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query(query)

    const user = result.recordset[0]

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
    const userId = result.recordset[0].ID
    //Tạo token
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' })

    // Send the token and success response
    res.json({ success: true, token })

  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})



//API Đăng kí tài khoản
app.post('/register', async (req, res) => {
  try {
    // Kết nối đến SQL Server
    await sql.connect()

    // Lấy dữ liệu từ body request
    const { fullName, username, birthYear, password, email, gender } = req.body

    // Kiểm tra nếu username đã tồn tại
    const checkUserQuery = 'SELECT * FROM Users WHERE username = @username'
    
    const request = new sql.Request()
    request.input('username', sql.VarChar, username)

    const result = await request.query(checkUserQuery)

    if (result.recordset.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' })
    }

    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `
      INSERT INTO Users (fullName, username, birthYear, password, email, gender)
      VALUES (@fullName, @username, @birthYear, @password, @email, @gender)
    `

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('fullName', sql.VarChar, fullName)
    insertRequest.input('username', sql.VarChar, username)
    insertRequest.input('birthYear', sql.Int, birthYear)
    insertRequest.input('password', sql.VarChar, password)
    insertRequest.input('email', sql.VarChar, email)
    insertRequest.input('gender', sql.VarChar, gender)

    // Thực hiện câu lệnh insert
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'User registered successfully' })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ success: false, message: 'Registration failed' })
  }
})

//API THÊM MÓN MỚI 


// Cấu hình multer để xử lý file upload
const storage = multer.memoryStorage()
const upload = multer({ storage })



app.post('/add-recipe', authenticateUerToken, upload.single('image'), async (req, res) => {
  const { danhMuc, name, description, portion, cookingTime, ingredients, steps, coreMonAn } = req.body
  const userId = req.userIdAuthen // Lấy userId đã xác thực từ middleware

  try {
    // Kết nối đến SQL Server
    const pool = await sql.connect()

    // Nếu có file ảnh thì xử lý ảnh ở đây (nếu bạn lưu ảnh vào cơ sở dữ liệu)
    let image = null
    if (req.file) {
      image = req.file.buffer // Lấy buffer của file để lưu vào cơ sở dữ liệu (nếu cần)
    }

    // Thực hiện truy vấn để thêm món ăn mới
    const query = `
      INSERT INTO monAn (danhMuc, name, moTa, khauPhan, timeNau, nguyenLieu, step, core, image, userId)
      VALUES (@danhMuc, @name, @description, @portion, @cookingTime, @ingredients, @steps, @coreMonAn, @image, @userId)
    `
    await pool.request()
      .input('danhMuc', sql.NVarChar, danhMuc)
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('portion', sql.Int, portion)
      .input('cookingTime', sql.Int, cookingTime)
      .input('ingredients', sql.NVarChar, ingredients)
      .input('steps', sql.NVarChar, steps)
      .input('coreMonAn', sql.Int, coreMonAn)
      .input('image', sql.VarBinary, image)
      .input('userId', sql.Int, userId)
      .query(query)

    res.status(201).json({ success: true, message: 'Recipe added successfully' })
  } catch (error) {
    console.error('Error adding recipe:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})