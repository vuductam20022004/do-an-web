
import sql from 'mssql'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import authenticateUerToken from './pages/Auth/authenticateUserToken.js'


// const __filename1 = fileURLToPath(import.meta.url)
// const __dirname1 = path.dirname(__filename1)

const app = express()
app.use(cors())


// Cấu hình kết nối tới SQL Server
const dbConfig = {
  user: 'sa',
  password: '123456',
  server: 'localhost', // Địa chỉ SQL Server
  database: 'do-an-web',
  port: 3307,
  options: {
    trustServerCertificate: true // Chỉ cần khi server là local hoặc không có chứng chỉ SSL
  }
}




// // Serve static files from 'dist'
// app.use(express.static(path.join(__dirname1, '..', 'dist')))

// // Route for '/'
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname1, '..', 'dist', 'index.html'))
// })
// // Ensure all routes (other than static files) return index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
// })




// Kết nối tới SQL Server
sql.connect(dbConfig)
  .then(() => {
    console.log('Đã kết nối SQL Server')
  })
  .catch(err => {
    console.error('Lỗi kết nối: ', err)
  })


// Route mẫu
// const localIP = '192.168.1.53'
const port = 3000
app.listen(port, '0.0.0.0', () => {
  console.log('Server đang chạy trên cổng 3000')
})


app.use(express.json()) // Để xử lý JSON từ request body

// Route: Lấy danh sách tất cả mon an
app.get('/board/all', authenticateUerToken, async (req, res) => {
  try {
    const coreUser = req.userCoreAuthen
    const pool = await sql.connect(dbConfig)
    const result = await pool.request()
      .query(`SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
          FROM monAn
          left join users on monAn.userId = users.ID
          where monAn.core <= ${coreUser}`)
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})

// API lấy chi tiết món theo ID
app.get('/chitietmonan/:id', async (req, res) => {
  const { id } = req.params// Lấy id từ params URL
  try {

    const result = await sql.query(`select 
t.ID, [name], moTa, nguyenLieu, step, khauPhan, timeNau, [image], t.core, 
timePost,binhLuan.ID as IDbinhLuan, binhLuan.userId,danhMuc, idMonAn, comment, users.fullName, users.imageUser
from(
	select * from monAn
	where monAn.ID = ${id}) as t LEFT join binhLuan on t.ID = binhLuan.idMonAn
	left join users on binhLuan.userId = users.ID `)

    if (result.recordset.length > 0) {
      res.json(result.recordset)// Trả về dữ liệu chi tiết món ăn nếu tìm thấy
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
    // console.log(user)

    if (!user) {
      return res.json({ success: false, message: 'Invalid username or password' })
    }
    const userId = result.recordset[0].ID
    const coreUser = result.recordset[0].core
    const fullNameUser = result.recordset[0].fullName
    const avatarUser = result.recordset[0].imageUser
    //Tạo token
    const token = jwt.sign({ userId, coreUser, fullNameUser, avatarUser }, secretKey, { expiresIn: '1h' })


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
      return res.status(201).json({ success: false, message: 'Username đã tồn tại' })
    }
    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `
      INSERT INTO Users (fullName, username, birthYear, password, email, gender ,core)
      VALUES (@fullName, @username, @birthYear, @password, @email, @gender ,100)
    `

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('fullName', sql.NVarChar, fullName)
    insertRequest.input('username', sql.NVarChar, username)
    insertRequest.input('birthYear', sql.Int, birthYear)
    insertRequest.input('password', sql.VarChar, password)
    insertRequest.input('email', sql.VarChar, email)
    insertRequest.input('gender', sql.NVarChar, gender)

    // Thực hiện câu lệnh insert
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'Đăng kí thành công!' })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ success: false, message: 'Registration failed' })
  }
})

//API THÊM MÓN MỚI


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/src/image/monAn', express.static(path.join(__dirname, 'src/image/monAn')))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/image/monAn/') // Đường dẫn thư mục lưu ảnh,/Cấu hình multer để lưu file ảnh vào thư mục "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = path.extname(file.originalname)
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`
    cb(null, fileName)
  }
})

const upload = multer({ storage })

app.post('/add-new-mon/them_mon_moi', authenticateUerToken, upload.single('image'), async (req, res) => {
  const { danhMuc, name, description, portion, cookingTime, ingredients, steps, coreMonAn } = req.body
  const userId = req.userIdAuthen // Lấy userId đã xác thực từ middleware
  try {
    // Kết nối đến SQL Server
    const pool = await sql.connect()

    // Nếu có file ảnh thì xử lý ảnh ở đây (nếu bạn lưu ảnh vào cơ sở dữ liệu)
    let imagePath = null
    if (req.file) {
      imagePath = `src/image/monAn/${req.file.filename}`//đường dẫn lưu vào db
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
      .input('image', sql.NVarChar, imagePath)
      .input('userId', sql.Int, userId)
      .query(query)

    res.status(201).json({ success: true, message: 'Recipe added successfully' })
  } catch (error) {
    console.error('Error adding recipe:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})


//API XEm TẤT CẢ CÁC MÓN CỦA TÔI
app.get('/mon-cua-toi', authenticateUerToken, async (req, res) => {
  try {
    const userId = req.userIdAuthen
    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query(`SELECT * FROM monAn where userId = ${userId}`)
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})


//API LƯU MÓN ĂN
app.post('/luu-mon', authenticateUerToken, async (req, res) => {
  try {
    const idMonAn = req.body.ID
    const userId = req.userIdAuthen // Lấy id user
    // Kết nối đến SQL Server
    await sql.connect()
    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `
      INSERT INTO luuMonAn (userId, idMonAn)
      VALUES (@userId, @idMonAn )
    `

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('userId', sql.Int, userId)
    insertRequest.input('idMonAn', sql.Int, idMonAn)

    // Thực hiện câu lệnh insert
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'Lưu món thành công' })
  } catch (error) {
    console.error('Error during Lưu món:', error)
    res.status(500).json({ success: false, message: 'Lỗi trong quá trình lưu món' })
  }
})



//API LẤY RA TẤT CẢ CÁC MÓN ĂN ĐÃ LƯU CỦA MỖI USER KHÁC NHAU

app.get('/mon-da-luu', authenticateUerToken, async (req, res) => {
  try {
    const userId = req.userIdAuthen

    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query(`
      select luuMonAn.userId, monAn.ID, [name], moTa, nguyenLieu, step,khauPhan,timeNau,[image],monAn.core,users.fullName from luuMonAn 
      join monAn on luuMonAn.idMonAn = monAn.ID  join users on monAn.userId = users.ID
	  where luuMonAn.userId = ${userId}`)
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})


//API LẤY THÔNG TIN CỦA CÁ NHÂN VỚI ID ĐƯỢC LƯU Ở sTORAGE
app.get('/trang-ca-nhan', authenticateUerToken, async (req, res) => {
  try {
    const userId = req.userIdAuthen
    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query(`select * from users where users.ID = ${userId}`)

    res.json(result.recordset[0]) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})



//API TÌM KIẾM
app.get('/search', authenticateUerToken, async (req, res) => {
  const searchValue = req.query.q //Lấy từ URL
  const coreUser = req.userCoreAuthen
  try {
    const pool = await sql.connect()
    const query = `
    SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
          FROM monAn
          join users on monAn.userId = users.ID
      WHERE (name LIKE '%' + @searchValue + '%' 
      OR moTa LIKE '%' + @searchValue + '%') and monAn.core <= ${coreUser} `
    const result = await pool.request()
      .input('searchValue', sql.NVarChar, searchValue)
      .query(query)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})


//API Bình Luận
app.post('/binh-luan', authenticateUerToken, async (req, res) => {
  try {
    const idMonAn = req.body.ID
    const comment = req.body.comment
    const userId = req.userIdAuthen // Lấy id user

    // Kết nối đến SQL Server
    await sql.connect()
    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `
      INSERT INTO binhLuan (idMonAn, userId, comment)
      VALUES (@idMonAn, @userId, @comment )
    `

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('idMonAn', sql.Int, idMonAn)
    insertRequest.input('userId', sql.Int, userId)
    insertRequest.input('comment', sql.NVarChar, comment)

    // Thực hiện câu lệnh insert
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'Bình Luận thành công' })
  } catch (error) {
    console.error('Error during Bình Luận:', error)
    res.status(500).json({ success: false, message: 'Lỗi trong quá trình bình luận' })
  }
})

//API lọc món ăn theo danh mục
app.get('/searchDanhMuc', authenticateUerToken, async (req, res) => {
  const searchValue = req.query.q //Lấy từ URL
  const coreUser = req.userCoreAuthen
  try {
    const pool = await sql.connect()
    const query = `SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
	  FROM monAn left join users on monAn.userId = users.ID
where danhMuc = @searchValue and monAn.core <= ${coreUser}`

    const result = await pool.request()
      .input('searchValue', sql.NVarChar, searchValue )
      .query(query)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error searching recipes(DanhMuc):', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})



//API đổi mật khẩu
app.post('/doi-mat-khau', authenticateUerToken, async (req, res) => {
  try {
    // Lấy dữ liệu từ body request
    const { newPassword, currentPassword } = req.body
    const userId = req.userIdAuthen
    // Kết nối đến SQL Server
    await sql.connect()

    // Kiểm tra mật khẩu cũ nhập có đúng hay không
    const checkPasswordUserQuery = `SELECT * FROM users WHERE ID = ${ userId } and password = @currentPassword `
    const request = new sql.Request()
    request.input('currentPassword', sql.NVarChar, currentPassword)

    const result = await request.query(checkPasswordUserQuery)

    if (result.recordset.length == 0) {
      return res.status(201).json({ success: false, message: 'Password cũ nhập không chính xác' })
    }
    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `update users set users.password = @newPassword where ID = ${ userId }`

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('newPassword', sql.NVarChar, newPassword)

    // Thực hiện câu lệnh update
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'Thay đổi Password sucessful' })
  } catch (error) {
    console.error('Error during Change password:', error)
    res.status(500).json({ success: false, message: 'Change Password failed' })
  }
})

//API xóa món của tôi
app.post('/xoa-mon-cua-toi', async (req, res) => {
  const { id } = req.body
  console.log(id)
  try {
    await sql.connect()
    const deleteQuery = `delete from monAn where ID = ${id}`

    const request = new sql.Request()
    await request.query(deleteQuery)
    res.status(201).json({ success: true, message: 'Xóa Thành Công' })


  } catch (err) {
    console.error('Lỗi khi xóa món ăn:', err)
    res.status(500).json({ message: 'Lỗi xóa món ăn' })
  }
})

//API đổi avatar
const __filename1 = fileURLToPath(import.meta.url)
const __dirname1 = path.dirname(__filename1)
app.use('/src/image/AvatarUser', express.static(path.join(__dirname1, 'src/image/AvatarUser')))
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/image/AvatarUser/') // Đường dẫn thư mục lưu ảnh,/Cấu hình multer để lưu file ảnh vào thư mục "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = path.extname(file.originalname)
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`
    cb(null, fileName)
  }
})

const uploadAvatar = multer({ storage: avatarStorage })
app.post('/doi-avatar', authenticateUerToken, uploadAvatar.single('avatar'), async (req, res) => {
  try {
    const userId = req.userIdAuthen
    // Kết nối đến SQL Server
    await sql.connect()
    let imagePath = null
    if (req.file) {
      imagePath = `src/image/AvatarUser/${req.file.filename}`//đường dẫn lưu vào db
    }

    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = `update users set users.imageUser = @avatar where ID = ${ userId }`

    // Tạo request mới và thêm các input
    const insertRequest = new sql.Request()
    insertRequest.input('avatar', sql.NVarChar, imagePath)

    // Thực hiện câu lệnh update
    await insertRequest.query(query)

    res.status(201).json({ success: true, message: 'Thay đổi avatar sucessful' })
  } catch (error) {
    console.error('Error during Change avatar:', error)
    res.status(500).json({ success: false, message: 'Change avatar failed' })
  }
})

//API xóa món tôi đã lưu
app.post('/xoa-mon-da-luu', authenticateUerToken, async (req, res) => {
  const { id } = req.body
  const userIdJWT = req.userIdAuthen
  try {
    await sql.connect()
    const deleteQuery = `delete from luuMonAn where idMonAn = ${id} and userId = ${userIdJWT}`

    const request = new sql.Request()
    await request.query(deleteQuery)
    res.status(201).json({ success: true, message: 'Xóa món đã lưu Thành Công' })


  } catch (err) {
    console.error('Lỗi khi xóa món ăn đã lưu:', err)
    res.status(500).json({ message: 'Lỗi xóa món ăn đã lưu' })
  }
})






// Xư lí tất cả các API của admin
// Route: Lấy danh sách tất cả mon an(admin)
app.get('/board-admin', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig)
    const result = await pool.request()
      .query(`SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
          FROM monAn
          left join users on monAn.userId = users.ID`)
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})

// API lấy chi tiết món theo ID(admin)
app.get('/chitietmonan-admin/:id', async (req, res) => {
  const { id } = req.params// Lấy id từ params URL
  try {
    // Tạo một truy vấn để lấy chi tiết món ăn từ SQL Server
    const result = await sql.query`select 
t.ID, [name], moTa, nguyenLieu, step, khauPhan, timeNau, [image], t.core, 
timePost,binhLuan.ID as IDbinhLuan, binhLuan.userId,danhMuc, idMonAn, comment, users.fullName, users.imageUser
from(
	select * from monAn
	where monAn.ID = ${ id }) as t LEFT join binhLuan on t.ID = binhLuan.idMonAn
	left join users on binhLuan.userId = users.ID `

    if (result.recordset.length > 0) {
      res.json(result.recordset)// Trả về dữ liệu chi tiết món ăn nếu tìm thấy
    } else {
      res.status(404).json({ message: 'Món ăn không tồn tại' })
    }
  } catch (err) {
    console.error('Lỗi khi truy vấn:', err)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

//API xóa bài viết admin

app.post('/xoa-bai-viet-admin', async (req, res) => {
  try {
    const idMonAn = req.body.ID
    // const userId = req.userIdAuthen
    // Kết nối đến SQL Server
    await sql.connect()
    // Thực hiện câu lệnh SQL để lưu người dùng vào database
    const query = 'delete from monAn where ID = @idMonAn'

    // Tạo request mới và thêm các input
    const Request = new sql.Request()
    Request.input('idMonAn', sql.Int, idMonAn)

    // Thực hiện câu lệnh insert
    await Request.query(query)

    res.status(201).json({ success: true, message: 'Xóa món thành công' })
  } catch (error) {
    console.error('Error during Lưu món:', error)
    res.status(500).json({ success: false, message: 'Lỗi trong quá trình xóa món' })
  }
})

//API đăng nhập admin

app.post('/login-admin', async (req, res) => {
  const { username, password } = req.body

  try {
    // Create a SQL query to find the user by username and password (plaintext)
    const query = 'SELECT * FROM admins WHERE username = @username AND password = @password'
    const pool = await sql.connect()
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query(query)

    const user = result.recordset[0]

    if (!user) {
      return res.status(201).json({ success: false, message: 'Invalid username or password' })
    }
    const adminId = result.recordset[0].ID
    const coreAdmin = result.recordset[0].core
    const fullNameAdmin = result.recordset[0].fullName
    //Tạo token
    const token = jwt.sign({ adminId, coreAdmin, fullNameAdmin }, secretKey, { expiresIn: '1h' })

    // Send the token and success response
    res.json({ success: true, token })

  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})


//API XEm TẤT CẢ CÁC MÓN CỦA TÔI trong profile user
app.post('/mon-cua-toi-admin', async (req, res) => {
  try {
    const ID = req.body.ID
    const pool = await sql.connect(dbConfig)
    const result = await pool.request()
      .query(`SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
          FROM monAn
          join users on monAn.userId = users.ID
		  where userId = ${ID}`)
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})

//API admin lấy profile của user
app.post('/profile-user-admin', async (req, res) => {
  try {
    const ID = req.body.ID
    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query(`select * from users where users.ID = ${ID}`)

    res.json(result.recordset[0]) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})


//API LẤY TẤT CẢ USERS

app.get('/lay-user-admin', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query('select * from users')
    res.json(result.recordset) // Trả về kết quả
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err) // Log lỗi ra console để kiểm tra
    res.status(500).send('Lỗi khi lấy dữ liệu') // Trả về lỗi cho client
  }
})

//API tìm kiếm ADMIN

app.get('/search2-admin', async (req, res) => {
  const searchValue = req.query.q //Lấy từ URL
  try {
    const pool = await sql.connect()
    const query = `
      SELECT * FROM monAn 
      WHERE name LIKE '%' + @searchValue + '%' 
      OR moTa LIKE '%' + @searchValue + '%'
    `

    const result = await pool.request()
      .input('searchValue', sql.NVarChar, searchValue)
      .query(query)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error searching recipes:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// API xóa tài khoản user(admin)

app.post('/xoa-tai-khoan-admin', async (req, res) => {
  try {
    const id = req.body.ID
    await sql.connect()
    const query = 'delete from users where ID = @id'

    // Tạo request mới và thêm các input
    const Request = new sql.Request()
    Request.input('id', sql.Int, id)
    await Request.query(query)
    res.status(201).json({ success: true, message: 'Xóa tài khoản thành công' })
  } catch (error) {
    console.error('Error during xóa tài khoản:', error)
    res.status(500).json({ success: false, message: 'Lỗi trong quá trình xóa user' })
  }
})

//API xóa comment
app.post('/xoa-comment-admin', async (req, res) => {
  try {
    const IDbinhLuan = req.body.IDbinhLuan
    // Kết nối đến SQL Server
    await sql.connect()
    const query = 'delete from binhLuan where ID = @IDbinhLuan'
    const Request = new sql.Request()
    Request.input('IDbinhLuan', sql.Int, IDbinhLuan)
    await Request.query(query)
    res.status(201).json({ success: true, message: 'Xóa comment thành công' })
  } catch (error) {
    console.error('Error during xoa comment:', error)
    res.status(500).json({ success: false, message: 'Lỗi trong quá trình xóa comment' })
  }
})


//API Tìm kiếm USER (admin)
app.get('/search-users-admin', async (req, res) => {
  const searchValue = req.query.q //Lấy từ URL
  try {
    const pool = await sql.connect()
    const query = `
      SELECT * FROM users 
      WHERE fullName LIKE '%' + @searchValue + '%' 
      OR username LIKE '%' + @searchValue + '%'
    `

    const result = await pool.request()
      .input('searchValue', sql.NVarChar, searchValue)
      .query(query)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error searching recipes:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

//API search Danh muc Admin
app.get('/searchDanhMuc-admin', async (req, res) => {
  const searchValue = req.query.q //Lấy từ URL
  try {
    const pool = await sql.connect()
    const query = `SELECT monAn.ID, monAn.[name], monAn.moTa, monAn.nguyenLieu,monAn.step,
          monAn.khauPhan,monAn.timeNau,monAn.[image], monAn.core, monAn.timePost,
          monAn.userId,monAn.danhMuc,users.fullName
	  FROM monAn left join users on monAn.userId = users.ID
where danhMuc = @searchValue`

    const result = await pool.request()
      .input('searchValue', sql.NVarChar, searchValue )
      .query(query)

    res.json(result.recordset)
  } catch (error) {
    console.error('Error searching recipes(DanhMuc):', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})