import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent' // Đường dẫn tới BoardContent
import AddNewRecipe from '~/pages/add-new-mon/them_mon_moi'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardContent />} />
        <Route path="/add-new-mon/them_mon_moi" element={<AddNewRecipe />} />
      </Routes>
    </Router>
  )
}

export default App
