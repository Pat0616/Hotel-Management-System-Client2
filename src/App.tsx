import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HotelHomePage from './pages/Home Page/HotelHomePage'
import RoomCalendarPage from './pages/Room Info Page/RoomCalendarPage'
import { AuthProvider } from './context/AuthenticationContext'

function App() {
  

  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to ="/home" replace/>}></Route>
            <Route path ="/home" element={
                <>
                   <HotelHomePage></HotelHomePage>
                </>}>
            </Route>

            <Route path="/room/:id" element={<>
            <RoomCalendarPage/>
            </>}></Route>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
