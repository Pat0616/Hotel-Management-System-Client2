// components/UpcomingBookings Component/UpcomingBookingsComponent.tsx

import './upcomingbookings.css'

type ConfirmedBooking = {
  roomid: number
  check_in_date: string
  check_out_date: string
  status: string
  fullname: string
  country: string
  address: string
  room_title: string
  room_price: number
  number_of_days: number
  total_price: number
}

type UpcomingBookingsProps = {
  bookings: ConfirmedBooking[]
  onViewBookings: () => void
}

function UpcomingBookingsComponent({
  bookings,
  onViewBookings,
}: UpcomingBookingsProps) {

  const calculateDaysLeft = (checkInDate: string) => {
    const today = new Date()
    const checkIn = new Date(checkInDate)

    const diff = checkIn.getTime() - today.getTime()

    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <section className="upcoming-stays-section">

      <div className="upcoming-stays-layout">

        {/* LEFT INFO PANEL */}
        <div className="upcoming-stays-info">

          <span className="collections-label">
            Upcoming Stay
          </span>

          <h2>Your confirmed reservations</h2>

          <p>
            Your journey is already prepared in advance.
            We’ve reserved everything for a seamless arrival experience.
          </p>


        </div>

        {/* RIGHT BOOKINGS */}
        <div className="upcoming-stays-slider">

          {bookings.map((booking, index) => {

            const daysLeft =
              calculateDaysLeft(booking.check_in_date)

            return (
              <article
                className="upcoming-booking-card"
                key={index}
              >

                <div className="upcoming-booking-overlay" />

                <div className="upcoming-booking-content">

                  <div className="upcoming-booking-top">

                    <span className="upcoming-booking-status">
                      Confirmed
                    </span>

                    <span className="upcoming-booking-price">
                      ₱{booking.total_price.toLocaleString()}
                    </span>

                  </div>

                  <h3>
                    {booking.room_title}
                  </h3>

                  <div className="upcoming-booking-dates">

                    <div>
                      <span>Check-in</span>
                      <strong>
                        {booking.check_in_date}
                      </strong>
                    </div>

                    <div>
                      <span>Check-out</span>
                      <strong>
                        {booking.check_out_date}
                      </strong>
                    </div>

                  </div>

                  <div className="upcoming-booking-meta">

                    <span className="upcoming-booking-chip">
                      {booking.number_of_days} Nights
                    </span>

                    <span className="upcoming-booking-chip">
                      Premium Preparation Ready
                    </span>

                  </div>

                  <div className="upcoming-booking-footer">

                    <p className="upcoming-booking-countdown">

                      {daysLeft > 0
                        ? `Check-in in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`
                        : 'Check-in available today'}

                    </p>

                    <button
                      className="btn btn-primary"
                      onClick={onViewBookings}
                    >
                      View Booking
                    </button>

                  </div>

                </div>

              </article>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default UpcomingBookingsComponent