import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
//  import {} from '~/pages/Boards/BoardContent/add-new-mon/them_mon_moi'


// Biểu tượng và tên thương hiệu ở trên cùng
const BrandLogo = () => {
  const navigate = useNavigate()
  const handleLogo = () => {
    navigate('/board')
  }
  return (
    <ListItem onClick={ handleLogo }>
      <ListItemIcon>
        <Avatar src="src/image/Logo/logo.jpg" alt="Logo" sx={{ width: 80, height: 80, mr: 2, cursor:'pointer' }} />
      </ListItemIcon>
      <Typography variant="h9" color='white'>Ngoan Xinh Yêu Bếp</Typography>
    </ListItem>
  )
}

const SideBar = () => {

  const navigate = useNavigate()

  const handleClickThemMonMoi = () => {
    navigate('/them_mon_moi')
  }

  const handleClickMonCuaToi = () => {
    navigate('/mon-cua-toi')
  }
  const handleTrangChu = () => {
    navigate('/board')
  }
  const handleMondaLuu = () => {
    navigate('/mon-da-luu')
  }

  const [searchValue, setSearchValue] = useState('')

  return (
    <Box>
      <List>
        {/* Logo và tên thương hiệu */}
        <BrandLogo />

        {/* Menu items */}

        <ListItem button onClick={handleTrangChu}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>

        {/* search */}
        <ListItem button>
          <TextField id="outlined-basic"
            label="Tìm kiếm món ăn"
            type="text"
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }}/>
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color:'white',
                    cursor:'pointer'
                  }}
                  onClick = {(e) => setSearchValue('')}
                />
              )
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '180px',
              '& label':{ color:'white' },
              '& input':{ color:'white' },
              '& label.Mui-focused':{ color:'white' },
              '& .MuiOutlinedInput-root':{
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}>
          </TextField>
        </ListItem>
        
        <ListItem button onClick={handleClickThemMonMoi}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Thêm món mới"/>
        </ListItem>

        <ListItem button onClick={handleMondaLuu}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Món đã lưu" />
        </ListItem>
        
        <ListItem button onClick={handleClickMonCuaToi}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Món của tôi" />
        </ListItem>
        
      </List>
    </Box>
  )
}

export default SideBar
