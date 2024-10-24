import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent' // Đường dẫn tới BoardContent
import AddNewRecipe from '~/pages/add-new-mon/them_mon_moi'

import  RecipeDetail from '~/pages/chi_tiet_mon_an/chi_tiet_mon_an'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardContent />} />
        <Route path="/add-new-mon/them_mon_moi" element={<AddNewRecipe />} />
        <Route path="/chitietmonan/:ID" element={< RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
