import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Logout from '@mui/icons-material/Logout'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function Recent() {
  const token = localStorage.getItem('token')
  const avatarUser = jwtDecode(token)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleTrangCaNhan = () => {
    navigate('/trang-ca-nhan')
  }
  const handleLogOut = () => {
    navigate('/', { replace: true })
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding:0 }}
          aria-controls={open ? 'basic-menu-recent-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            alt="DucTamdev"
            src= {avatarUser.avatarUser}
            sx={{ width: 36, height: 36 }}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-recent-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem onClick = {handleTrangCaNhan} >
          <Avatar src={jwtDecode(localStorage.getItem('token')).avatarUser} sx={{ width:28, height:28, mr:2 }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick = {handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
export default Recent