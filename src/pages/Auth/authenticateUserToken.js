




// authMiddleware.js
import jwt from 'jsonwebtoken'
const secretKey = 'vuductam'

const authenticateUserToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(403).json({ success: false, message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, secretKey)
    req.userIdAuthen = decoded.userId // Lưu userId vào request để sử dụng ở các hàm sau
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized access' })
  }
}

export default authenticateUserToken
