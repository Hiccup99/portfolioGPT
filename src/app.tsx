import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingpage'
import UploadPage from './pages/uploadpage'
import PortfolioPage from './pages/portfoliopage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<UploadPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  )
}

export default App
