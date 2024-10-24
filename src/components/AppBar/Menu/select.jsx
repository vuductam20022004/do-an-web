import { useState } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function SelectDanhMuc() {
  const [danhMuc, setDanhMuc] = useState('')

  const handleChange = (event) => {
    setDanhMuc(event.target.value)
  }

  return (
    <FormControl sx={{ m: 1, width:'400px' }} size="big">
      <InputLabel variant='outlined' id="demo-select-small-label">Danh mục món ăn</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={danhMuc}
        label="Danh mục"
        onChange={handleChange}
      >
        <MenuItem value={10}>Chay</MenuItem>
        <MenuItem value={20}>Mặn</MenuItem>
        <MenuItem value={30}>Bánh</MenuItem>
      </Select>
    </FormControl>
  )
}
export default SelectDanhMuc