

import './Sidebar.css'

// import { useNavigate } from 'react-router-dom's


const Sidebar = () => {

  // const navigate = useNavigate()
  // const handleClick = (menuItem) => {
  //   switch (menuItem) {
  //   case 'Tìm kiếm':
  //     navigate('/search')
  //     break
  //   case 'Premium':
  //     navigate('/premium')
  //     break
  //   case 'Thống Kê Bếp':
  //     navigate('/stats')
  //     break
  //   case 'Tương Tác':
  //     navigate('/interaction')
  //     break
  //   case 'Kho Món Ngon Của Bạn':
  //     navigate('/your-recipes')
  //     break
  //   default:
  //     // eslint-disable-next-line no-console
  //     console.log(`Unknown menu item: ${menuItem}`)
  //   }
  // }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-que-huong-22.jpg" alt="logo-side-bar" className="logo" />
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <span className="icon">🔍</span>
          <span>Tìm kiếm</span>
        </li>
        <li className="sidebar-item">
          <span className="icon">📜</span>
          <span>Premium</span>
        </li>
        <li className="sidebar-item">
          <span className="icon">📊</span>
          <span>Thống Kê Bếp</span>
        </li>
        <li className="sidebar-item">
          <span className="icon">🔔</span>
          <span>Tương Tác</span>
        </li>
        <li className="sidebar-item">
          <span className="icon">📋</span>
          <span>Kho Món Ngon Của Bạn</span>
        </li>
      </ul>
      <div className="sidebar-search">
        <input type="text" placeholder="Tìm trong kho món n" />
      </div>
    </div>
  )
}

export default Sidebar