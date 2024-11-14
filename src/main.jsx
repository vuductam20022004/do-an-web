import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import theme from './theme'
import AuthPage from '~/pages/Auth/login_and_register.jsx'

// import AppRoutes from './pages/Routing/routing'

import BoardContent from '~/pages/Boards/BoardContent/BoardContent' // Đường dẫn tới BoardContent
import AddNewRecipe from '~/pages/add-new-mon/them_mon_moi'
import RecipeDetail from '~/pages/chi_tiet_mon_an/chi_tiet_mon_an.jsx'
import Board from '~/pages/Boards/_id.jsx'
import MonCuaToi from '~/pages/monCuaToi/monCuaToi.jsx'
import MonDaLuu from '~/pages/monDaLuu/monDaLuu.jsx'
import ProfilePage from '~/pages/Profile/profile.jsx'
import Search from '~/pages/search/search.jsx'
import SearchDanhMuc from './pages/search/searchDanhMuc.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      {/* <AuthPage /> */}
      <Router>
        <Routes>
          <Route path='/' element = {<AuthPage />}/>
          {/* <Route path="/board" element={<App />} /> */}
          <Route path="/board" element={<Board />} />
          <Route path="/them_mon_moi" element={<AddNewRecipe />} />
          <Route path="/chitietmonan/:ID" element={< RecipeDetail />} />
          <Route path="/mon-cua-toi" element = {< MonCuaToi /> } />
          <Route path="/mon-da-luu" element = {< MonDaLuu /> } />
          <Route path="/trang-ca-nhan" element = {< ProfilePage /> } />
          <Route path="/search" element = {<Search /> } />
          <Route path="/searchDanhMuc" element = {<SearchDanhMuc /> } />

        </Routes>
      </Router>
      <ToastContainer />
      {/* <App /> */}

    </CssVarsProvider>
  </React.StrictMode>

)
