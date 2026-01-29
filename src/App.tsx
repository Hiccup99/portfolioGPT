import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<UploadPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
    </Routes>
  )
}

export default App
