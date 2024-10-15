import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color:'white',
  bgcolor:'transparent',
  border: 'none',
  borderRadius: '4px',
  paddingX: '5px',
  '.MuiSvgIcon-root':{
    color:'white'
  },
  '&:hover':{
    bgcolor:'primary.50'
  }
}
function BoardBar({ board }) {
  
  return (
    <Box sx={{
      height:(theme) => theme.trello. boardBarHeight,
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label= {board?.title}
          onClick = { () => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label= { capitalizeFirstLetter(board?.type) }
          onClick = { () => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to GG Driver"
          onClick = { () => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          onClick = { () => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          onClick = { () => {}}
        />
      </Box>
      <Box sx={{
        display:'flex',
        alignItems:'center', gap:2,
        '& .MuiAvatarGroup-root':{ gap: 1
        }
      }}>
        <Button
          startIcon={<PersonAddIcon />}
          variant="outlined"
          sx={{ color:'white', borderColor:'white' }}
        >Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root':{
              height: 34,
              width: 34,
              fontSize:16,
              cursor:'pointer'
            }
          }}>
          <Tooltip title="ductamdev">
            <Avatar
              alt="ductamdev"
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" />
          </Tooltip>
          <Tooltip title="ductamdev">
            <Avatar
              alt="ductamdev"
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" />
          </Tooltip>
          <Tooltip title="ductamdev">
            <Avatar
              alt="ductamdev"
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" />
          </Tooltip>
          <Tooltip title="ductamdev">
            <Avatar
              alt="ductamdev"
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" />
          </Tooltip>
          <Tooltip title="ductamdev">
            <Avatar
              alt="ductamdev"
              src="https://img.thuthuattinhoc.vn/uploads/2019/10/26/hinh-anh-que-huong-con-song-uon-quanh_055458566.jpg" />
          </Tooltip>


        </AvatarGroup>

      </Box>

    </Box>)
}

export default BoardBar