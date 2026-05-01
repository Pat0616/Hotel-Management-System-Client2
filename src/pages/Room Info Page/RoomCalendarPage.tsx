import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CalendarComponent from "../../components/Room Calendar Component/CalendarComponent";
import LoginPopupComponent from "../../components/LoginPopup Component/LoginPopupComponent";
import { createBooking, getByRoomBooking, getByRoomId, massUpdateBooking } from "../../utils/bookingsAPI";
import { getOneRoom } from "../../utils/roomsAPI";
import { useAuth } from "../../context/AuthContext";
import { guestLogin, guestRegister } from "../../utils/guestsAPI";

type RoomBookings = {
  check_in_date: string;
  check_out_date: string;
};

type BookingSummary = {
  check_in_date: string;
  check_out_date: string;
  status?: string;
};

type RoomDetails = {
  room_title: string;
  room_description: string;
  room_availability: string;
  room_price?: number;
  room_url?: string;
};

function RoomCalendarPage() {
  const { user, setUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [popupStatus, setPopupStatus] = useState<string>("");
  const [currentBookings, setCurrentBookings] = useState<RoomBookings[]>([]);

  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    room_title: "Signature Suite",
    room_description: "Elegant coastal interiors with curated comfort and premium guest amenities.",
    room_availability: "Available",
  });

  const [loginError, setLoginError] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [bookingError, setBookingError] = useState<string>("");
  const [calendarError, setCalendarError] = useState<string>("");
  const [hasBooked, setHasBooked] = useState<boolean>(false);
  const [userBookingDetails, setUserBookingDetails] = useState<BookingSummary | null>(null);
  const [autoLoginCounter, setAutoLoginCounter] = useState<number>(0);



  const [selectedRange, setSelectedRange] = useState({
    check_in_date: "",
    check_out_date: "",
  });

  const roomId = Number(id);
  const isSelectionComplete = Boolean(selectedRange.check_in_date && selectedRange.check_out_date);

  const GetThisRoomBookings = async () => {
    if (!roomId) {
      return;
    }

    try {
      const res = await getByRoomBooking(roomId);
      setCurrentBookings(Array.isArray(res) ? res : []);
    } catch {
      setCurrentBookings([]);
    }
  };

  const GetUserBookings = async () => {
    if (!user?.guestid || !roomId) {
      setHasBooked(false);
      setUserBookingDetails(null);
      return;
    }

    try {
      const res = await getByRoomId(user.guestid, roomId);
      const reservations = Array.isArray(res) ? res : [];
      const activeBooking = reservations.find(
        (booking: { status?: string }) => booking.status === "confirmed" || booking.status === "pending" || booking.status === "checked in",
      );

      if (activeBooking) {
        setHasBooked(true);
        setUserBookingDetails(activeBooking);
      } else {
        setHasBooked(false);
        setUserBookingDetails(null);
      }
    } catch {
      setHasBooked(false);
      setUserBookingDetails(null);
    }
  };

  useEffect(() => {
    if (!roomId) {
      return;
    }

    let isMounted = true;

    getByRoomBooking(roomId)
      .then((res) => {
        if (isMounted) {
          setCurrentBookings(Array.isArray(res) ? res : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCurrentBookings([]);
        }
      });

    getOneRoom(roomId)
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const room = Array.isArray(response) ? response[0] : response;

        if (!room) {
          return;
        }

        setRoomDetails({
          room_title: room.room_title || "Signature Suite",
          room_description:
            room.room_description ||
            "A premium room curated for modern comfort, privacy, and effortless hospitality.",
          room_availability: room.room_availability || "Available",
          room_price: room.room_price,
          room_url: room.room_url,
        });
      })
      .catch(() => {
        // Keep default details for graceful fallback.
      });

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  useEffect(() => {
    let isMounted = true;

    if (!user?.guestid || !roomId) {
      const resetTimer = window.setTimeout(() => {
        if (isMounted) {
          setHasBooked(false);
          setUserBookingDetails(null);
        }
      }, 0);

      return () => {
        isMounted = false;
        window.clearTimeout(resetTimer);
      };
    }

    getByRoomId(user.guestid, roomId)
      .then((res) => {
        if (!isMounted) {
          return;
        }

        const reservations = Array.isArray(res) ? res : [];
        const activeBooking = reservations.find(
          (booking: { status?: string }) => booking.status === "confirmed" || booking.status === "pending",
        );

        if (activeBooking) {
          setHasBooked(true);
          setUserBookingDetails(activeBooking);
        } else {
          setHasBooked(false);
          setUserBookingDetails(null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasBooked(false);
          setUserBookingDetails(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [roomId, user?.guestid]);


 useEffect (() => 
    {
        TryLoginPastAccount();

        setAutoLoginCounter((prev) => prev + 1);
  
        RefreshBookingsAutomatically();
        
    },[])

    useEffect (()=> {
      GetUserBookings();
    },[autoLoginCounter])



  const LoginGuest = async (email: string, password: string) => {
    try {
      setLoginError("");
      const loggedInUser = await guestLogin(email, password);
      setUser(loggedInUser);

        localStorage.setItem("GuestUsername", JSON.stringify(email));
        localStorage.setItem("GuestPassword", JSON.stringify(password));
      setPopupStatus("paying");
    } catch {
      setLoginError("Invalid email or password.");
    }
  };

  const RegisterGuest = async (name: string, email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    try {
      setRegisterError("");
      await guestRegister(name, password, email);
      setPopupStatus("loggingIn");
    } catch {
      setRegisterError("Registration failed. Email might already be in use.");
    }
  };

  const ConfirmRoomBooking = async (fullname: string, country: string, address: string) => {
    if (!user?.guestid) {
      setBookingError("You must be logged in to continue.");
      return;
    }

    if (!isSelectionComplete) {
      setBookingError("Please choose both check-in and check-out dates.");
      return;
    }

    try {
      await createBooking(roomId, user.guestid, selectedRange.check_in_date, selectedRange.check_out_date, fullname, country, address);
      setBookingError("");
      setPopupStatus("");
      await GetThisRoomBookings();
      await GetUserBookings();
    } catch {
      setBookingError("Booking failed. Please verify your details and try again.");
    }
  };

  const TryBookRoom = () => {
    setBookingError("");

    if (hasBooked) {
      setBookingError("You already have an active booking for this room.");
      return;
    }

    if (!isSelectionComplete) {
      setBookingError("Select your check-in and check-out dates first.");
      return;
    }

    if (calendarError) {
      setBookingError(calendarError);
      return;
    }

    if (user) {
      setPopupStatus("paying");
    } else {
      setPopupStatus("loggingIn");
    }
  };

  const TryLoginPastAccount = async() =>
{
  try{
      const remuser = localStorage.getItem("GuestUsername");
      const rempass = localStorage.getItem("GuestPassword");

    if(remuser && rempass)
    {
      const email = JSON.parse(remuser);
      const password = JSON.parse(rempass);
      const res = await guestLogin(email, password);
      setUser(res);
      console.log("Auto-login result", res);
    }

   
  }
  catch(err)
  {
    console.log("Error with past account login", err);
  }
    
}

const DeleteStoragePastAccount = () =>
{
  localStorage.removeItem("GuestUsername");
  localStorage.removeItem("GuestPassword");

  window.location.href="/room/" + id; // Refresh page to reset state after deleting storage
}

const RefreshBookingsAutomatically = () =>{
  try{
    massUpdateBooking();
    console.log("Bookings auto-refresh triggered");
  }
  catch(err)
  {
    console.log("Error with auto-refreshing bookings", err);
  }
}


  const roomImage = roomDetails.room_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
  const statusClass = roomDetails.room_availability === "Available" ? "status-pill available" : "status-pill unavailable";

  return (
    <main className="room-page">
      <div className="room-page-nav">
        <Link to="/home" className="room-page-back">
          ← Back to collections
        </Link>
        {!user && (
          <button className="btn btn-secondary" onClick={() => setPopupStatus("loggingIn")}>
            Sign In to Book
          </button>
        )}
      </div>

      <div className="room-container">
        <section className="room-info-panel">
          <img src={roomImage} alt={roomDetails.room_title} className="room-image" />
          <h1 className="room-title">{roomDetails.room_title}</h1>
          <p className="room-description">{roomDetails.room_description}</p>
          <span className={statusClass}>{roomDetails.room_availability || "Unavailable"}</span>

          {hasBooked && userBookingDetails && (
            <div className="user-booking-status">
              <div>
                You already have a reservation for this room from <strong>{userBookingDetails.check_in_date}</strong> to{" "}
                <strong>{userBookingDetails.check_out_date}</strong>.
              </div>
              <div>
                Status: <strong>{userBookingDetails.status?.toUpperCase() || "PENDING"}</strong>
              </div>
            </div>
          )}

          <div className="amenities">
            <h3>Included amenities</h3>
            <ul className="amenities-list">
              <li>High-speed WiFi</li>
              <li>Smart room controls</li>
              <li>Daily premium breakfast</li>
              <li>Priority concierge support</li>
            </ul>
          </div>
        </section>

        <section className="booking-panel">
          <h2>Reserve your stay</h2>
          <p className="booking-panel-subtext">
            Select available dates and confirm your booking through a secure checkout flow.
          </p>

          <CalendarComponent
            bookings={currentBookings}
            onRangeSelect={setSelectedRange}
            onSelectionError={setCalendarError}
          />

          {calendarError && <p className="form-error">{calendarError}</p>}

          <div className="booking-details">
            <div className="booking-details-row">
              <span>Check-in</span>
              <strong>{selectedRange.check_in_date || "Not selected"}</strong>
            </div>
            <div className="booking-details-row">
              <span>Check-out</span>
              <strong>{selectedRange.check_out_date || "Not selected"}</strong>
            </div>
            <div className="booking-details-row">
              <span>Room Rate</span>
              <strong>
                {roomDetails.room_price ? `$${new Intl.NumberFormat("en-US").format(roomDetails.room_price)} / night` : "Available on checkout"}
              </strong>
            </div>
          </div>

          <div className="booking-action">
            <button onClick={TryBookRoom} className="btn btn-primary btn-full" disabled={hasBooked}>
              {hasBooked ? "Already Booked" : "Continue to Checkout"}
            </button>
            {bookingError && <p className="form-error">{bookingError}</p>}
          </div>
        </section>
      </div>

      {popupStatus !== "" && (
        <LoginPopupComponent
          InputLoginDetails={LoginGuest}
          InputRegisterDetails={RegisterGuest}
          InputBookingDetails={ConfirmRoomBooking}
          cuStatus={popupStatus}
          setCuStatus={setPopupStatus}
          loginError={loginError}
          registerError={registerError}
          bookingError={bookingError}
        />
      )}
    </main>
  );
}

export default RoomCalendarPage;
