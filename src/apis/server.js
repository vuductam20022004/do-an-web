
import sql from 'mssql'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

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
app.get('/all', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig) // Kết nối tới SQL Server
    const result = await pool.request().query('SELECT * FROM monAn') // Truy vấn SQL
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