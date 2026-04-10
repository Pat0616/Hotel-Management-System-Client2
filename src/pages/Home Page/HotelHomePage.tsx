import Hero from '../../components/Hero Component/HeroComponent'
import RoomSlider from '../../components/Room Slider Component/RoomSliders'
import LoginPopupComponent from '../../components/LoginPopup Component/LoginPopupComponent'
import { useState, useEffect } from 'react'
import { getRoomCard } from '../../utils/roomsAPI'
import { guestLogin, guestRegister } from '../../utils/guestsAPI'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const standardRooms = [
  {
    roomid: 1,
    room_title: 'Signature Queen Room',
    room_price: 180,
    room_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Soft neutral palette, work nook, and a private lounge chair for restorative stays.',
    room_tag: 'Classic',
    room_capacity: '2 Guests',
  },
  {
    roomid: 2,
    room_title: 'Garden View Retreat',
    room_price: 195,
    room_url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Morning light and curated interiors designed for relaxed weekend escapes.',
    room_tag: 'Nature View',
    room_capacity: '2 Guests',
  },
  {
    roomid: 3,
    room_title: 'Business Comfort Suite',
    room_price: 210,
    room_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    room_description: 'A calm layout with high-speed connectivity and ergonomic workspace.',
    room_tag: 'Executive',
    room_capacity: '2 Guests',
  },
]

const premiumRooms = [
  {
    roomid: 7,
    room_title: 'Coastal Premium Suite',
    room_price: 280,
    room_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Open-plan premium suite with deep-soak bath and private dining alcove.',
    room_tag: 'Premium',
    room_capacity: '3 Guests',
  },
  {
    roomid: 8,
    room_title: 'Skyline King Residence',
    room_price: 320,
    room_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Floor-to-ceiling glazing and tailored lighting for evenings in comfort.',
    room_tag: 'Skyline',
    room_capacity: '3 Guests',
  },
  {
    roomid: 9,
    room_title: 'Panoramic Harbor Suite',
    room_price: 350,
    room_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Statement living space ideal for longer stays and special occasions.',
    room_tag: 'Panoramic',
    room_capacity: '4 Guests',
  },
]

const deluxeRooms = [
  {
    roomid: 13,
    room_title: 'Presidential Ocean Loft',
    room_price: 460,
    room_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    room_description: 'High-floor suite with dedicated lounge, skyline deck, and butler-ready layout.',
    room_tag: 'Deluxe',
    room_capacity: '4 Guests',
  },
  {
    roomid: 14,
    room_title: 'Royal Wellness Suite',
    room_price: 520,
    room_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Private wellness corner, calming textures, and handcrafted finishing details.',
    room_tag: 'Wellness',
    room_capacity: '4 Guests',
  },
  {
    roomid: 15,
    room_title: 'Grand Penthouse Collection',
    room_price: 620,
    room_url: 'https://images.unsplash.com/photo-1631049035331-f0e1f98f6404?auto=format&fit=crop&w=1200&q=80',
    room_description: 'Our most exclusive residence with curated art, terrace views, and chef service.',
    room_tag: 'Penthouse',
    room_capacity: '5 Guests',
  },
]

type RoomCardDetails = {
  roomid: number
  room_title: string
  room_price: number
  room_url: string
  room_description?: string
  room_tag?: string
  room_capacity?: string
}

function HotelHomePage() {
  const { user, setUser } = useAuth()
  const [roomCardDetailsSamp, setRoomCardDetailsSamp] = useState<RoomCardDetails[]>([])
  const [popupStatus, setPopupStatus] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>('')

  const normalizeFeaturedRooms = (rooms: unknown): RoomCardDetails[] => {
    if (!Array.isArray(rooms)) {
      return []
    }

    return rooms.map((room: Partial<RoomCardDetails>, index: number) => ({
      roomid: room.roomid ?? index + 1,
      room_title: room.room_title ?? `Featured Room ${index + 1}`,
      room_price: room.room_price ?? 240,
      room_url: room.room_url ?? `https://picsum.photos/600/400?featured-${index + 1}`,
      room_description:
        room.room_description ||
        'A thoughtfully designed featured stay with elevated comfort and hospitality.',
      room_tag: room.room_tag || 'Featured',
      room_capacity: room.room_capacity || '2 Guests',
    }))
  }

  useEffect(() => {
    let isMounted = true

    getRoomCard('Single')
      .then((res) => {
        if (isMounted) {
          setRoomCardDetailsSamp(normalizeFeaturedRooms(res))
        }
      })
      .catch(() => {
        if (isMounted) {
          setRoomCardDetailsSamp([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoginError('')
      const res = await guestLogin(email, password)
      setUser(res)
      setPopupStatus('')
    } catch {
      setLoginError('Unable to sign in with those credentials. Please try again.')
    }
  }

  const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      setRegisterError('')
      if (password !== confirmPassword) {
        setRegisterError('Passwords do not match.')
        return
      }
      await guestRegister(name, password, email)
      setPopupStatus('loggingIn')
    } catch {
      setRegisterError('Registration failed. This email may already be in use.')
    }
  }

  const handleBookingDetails = () => {
    setPopupStatus('')
  }

  const guestFirstName = (user?.guest || user?.name || 'Guest').toString().split(' ')[0]

  return (
    <main className="home-page">
      <Hero
        onLoginClick={() => {
          setLoginError('')
          setRegisterError('')
          setPopupStatus('loggingIn')
        }}
        guestName={user?.guest || user?.name}
      />

      {user && (
        <section className="guest-dashboard" id="experience">
          <div className="guest-dashboard-card">
            <span className="guest-dashboard-label">Guest Dashboard</span>
            <h2>Welcome back, {guestFirstName}</h2>
            <p>
              Your account is active. Select a suite below, review availability, and complete booking in
              a single flow designed for comfort.
            </p>
            <div className="guest-dashboard-actions">
              <a href="#room-collections" className="btn btn-primary">
                Book Another Stay
              </a>
              <Link to="/room/1" className="btn btn-secondary">
                View A Room
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="roomselection-container" id="room-collections">
        <header className="collections-header">
          <span className="collections-label">Room Collections</span>
          <h2>Choose your next premium stay</h2>
          <p>
            Browse room categories curated for every travel purpose, from elegant short escapes to
            long-stay luxury experiences.
          </p>
        </header>

        <RoomSlider
          category="Classic Collection"
          description="Elegant essentials crafted for focused business trips and weekend escapes."
          rooms={standardRooms}
        />
        <RoomSlider
          category="Premium Suites"
          description="Upgraded spaces with enhanced views, larger layouts, and premium amenities."
          rooms={premiumRooms}
        />
        <RoomSlider
          category="Deluxe Residences"
          description="Our most refined suites for signature stays, celebrations, and luxury retreats."
          rooms={deluxeRooms}
        />
        <RoomSlider
          category="Featured From Live Inventory"
          description="Real-time featured rooms from your backend feed."
          rooms={roomCardDetailsSamp}
        />

        {!roomCardDetailsSamp.length && (
          <div className="empty-state">
            Featured inventory is currently unavailable. Curated collections remain open for booking.
          </div>
        )}

        <footer className="site-footer" id="contact">
          <p>
            <strong>PatHotelia Concierge</strong> · Available 24/7 for reservations and special requests.
          </p>
        </footer>
      </div>

      {popupStatus !== '' && (
        <LoginPopupComponent
          cuStatus={popupStatus}
          setCuStatus={setPopupStatus}
          InputLoginDetails={handleLogin}
          InputRegisterDetails={handleRegister}
          InputBookingDetails={handleBookingDetails}
          loginError={loginError}
          registerError={registerError}
          bookingError=""
        />
      )}
    </main>
  )
}

export default HotelHomePage
