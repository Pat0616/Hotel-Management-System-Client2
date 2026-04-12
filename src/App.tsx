import './App.css'
import './components/global.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HotelHomePage from './pages/Home Page/HotelHomePage'
import RoomCalendarPage from './pages/Room Info Page/RoomCalendarPage'
import { AuthProvider } from './context/AuthenticationContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HotelHomePage />} />
          <Route path="/room/:id" element={<RoomCalendarPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
