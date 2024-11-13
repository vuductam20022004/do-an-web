import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

const pages = ['Món chính', 'Món mặn', 'Món chay', 'Món tráng miệng', 'Đồ uống']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleMenuItemClick = async (page) => {

    navigate(`/searchDanhMuc?query=${encodeURIComponent(page)}`)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0') }}>
        <Toolbar disableGutters>
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
          }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
          }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{ my: 2, color: 'white', mr:10, display: 'block', bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0') }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
