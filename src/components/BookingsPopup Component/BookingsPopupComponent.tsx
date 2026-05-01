import './bookingspopup.css'
import { useState, useEffect } from 'react'
import { getBookingsByGuest } from '../../utils/bookingsAPI'
import { useAuth } from '../../context/AuthContext'

interface Booking {
  roomid: number
  check_in_date: string
  check_out_date: string
  status: string
  fullname: string
  country: string
  address: string
  room_title: string
  room_price: number
}

interface Props {
  setBookingsPopupStatus: (status: string) => void
  bookingsPopupStatus: string
}

function BookingsPopup({ setBookingsPopupStatus, bookingsPopupStatus }: Props) {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    if (bookingsPopupStatus === 'viewing' && user?.guestid) {
      setLoading(true)
      getBookingsByGuest(user.guestid)
        .then((data) => {
          setBookings(data)
        })
        .catch(() => {
          setBookings([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [bookingsPopupStatus, user?.guestid])

  const handleClose = () => {
    setBookingsPopupStatus('')
    setSelectedBooking(null)
  }

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
  }

  const handleDetailClose = () => {
    setSelectedBooking(null)
  }

  if (bookingsPopupStatus !== 'viewing') return null

  return (
    <div className='bookingspopup-background' onMouseDown={handleClose}>
      <div className='bookingspopup-card' role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <span className='popupcard-headertitle'>My Bookings</span>
        <p className='popupcard-subtitle'>View your upcoming and current reservations.</p>

        {loading && <p>Loading your bookings...</p>}

        {!loading && bookings.length === 0 && (
          <p>You have no upcoming bookings.</p>
        )}

        {!loading && bookings.length > 0 && (
          <div className='bookings-list'>
            {bookings.map((booking, index) => (
              <div
                key={index}
                className='booking-summary'
                onClick={() => handleBookingClick(booking)}
              >
                <div className='booking-info'>
                  <h3>{booking.room_title}</h3>
                  <p>${booking.room_price} per night</p>
                  <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='popup-actions'>
          <button onClick={handleClose} className='btn btn-ghost popup-cancelbutton'>Close</button>
        </div>
      </div>

      {selectedBooking && (
        <div className='bookingdetail-background' onMouseDown={handleDetailClose}>
          <div className='bookingdetail-card' role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
            <span className='popupcard-headertitle'>Booking Receipt</span>
            <div className='receipt-details'>
              <div className='receipt-item'>
                <strong>Room:</strong> {selectedBooking.room_title}
              </div>
              <div className='receipt-item'>
                <strong>Price:</strong> ${selectedBooking.room_price} per night
              </div>
              <div className='receipt-item'>
                <strong>Check-in Date:</strong> {selectedBooking.check_in_date}
              </div>
              <div className='receipt-item'>
                <strong>Check-out Date:</strong> {selectedBooking.check_out_date}
              </div>
              <div className='receipt-item'>
                <strong>Status:</strong> <span className={`status ${selectedBooking.status.toLowerCase()}`}>{selectedBooking.status}</span>
              </div>
              <div className='receipt-item'>
                <strong>Full Name:</strong> {selectedBooking.fullname}
              </div>
              <div className='receipt-item'>
                <strong>Country:</strong> {selectedBooking.country}
              </div>
              <div className='receipt-item'>
                <strong>Address:</strong> {selectedBooking.address}
              </div>
            </div>
            <div className='popup-actions'>
              <button onClick={handleDetailClose} className='btn btn-ghost popup-cancelbutton'>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsPopup