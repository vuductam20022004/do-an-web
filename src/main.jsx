import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import theme from './theme'

// import AppRoutes from './pages/Routing/routing'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </CssVarsProvider>
  </React.StrictMode>

)
