import { useState, useEffect } from "react";
import CalendarComponent from "../../components/Room Calendar Component/CalendarComponent";
import LoginPopupComponent from "../../components/LoginPopup Component/LoginPopupComponent";
import { useParams } from "react-router-dom";
import { createBooking, getByRoomBooking, getByRoomId } from "../../utils/bookingsAPI";
import { getOneRoom } from "../../utils/roomsAPI";
import { useAuth } from "../../context/AuthenticationContext";
import { guestLogin, guestRegister } from "../../utils/guestsAPI";

type RoomBookings = {
    check_in_date: string,
    check_out_date: string
}


function RoomCalendarPage()
{

const { user, setUser } = useAuth();

 const { id } = useParams<{id: string}>(); //Still needs to be converted with Number(id)
 const [parentPStatus, setParentPStatus] = useState<string>("");
 const [currentBookings, setCurrentBookings] = useState<RoomBookings[]>([]);

 const [roomTitle, setRoomTitle] = useState<string>('');
 const [roomDescription, setRoomDescription] = useState<string>('');
 const [roomStatus, setRoomStatus] = useState<string>('');

//  const [roomUrl, setRoomUrl] = useState<string>(''); when cloudinary is applied use this:
const [loginError, setLoginError] = useState<string>("");
const [registerError, setRegisterError] = useState<string>("");
const [bookingError, setBookingError] = useState<string>("");
const [hasBooked, setHasBooked] = useState<boolean>(false);
const [userBookingDetails, setUserBookingDetails] = useState<any>(null);

  const setPopupStatus = (input: string) => 
    {
      setParentPStatus(input);
    } 

    const GetThisRoomBookings = async () =>
    {
        try{
        const roomid = Number(id);
        const res = await getByRoomBooking(roomid);
        setCurrentBookings(res);
        }
        catch(err)
        {
            console.log("Error Getting Booking by ID", id);
        }
        
    }

    const GetThisRoomInformation = async () =>
    {
        const roomid = Number(id);
        try{
            const [res] = await getOneRoom(roomid)
            setRoomTitle(res.room_title);
            setRoomDescription(res.room_description);
            setRoomStatus(res.room_availability);

        }
        catch(err)
        {
            console.log("Error Getting Room Info");
        }
    }

    const GetUserBookings = async () => {
        if (user && user.guestid && id) {
            try {
                const roomid = Number(id);
                console.log(`Calling getByRoomId with guestid: ${user.guestid}, roomid: ${roomid}`);
                const res = await getByRoomId(user.guestid, roomid);
                console.log("GetUserBookings response:", res);
                
                if (Array.isArray(res) && res.length > 0) {
                    const activeBooking = res.find((booking: any) => booking.status === "confirmed" || booking.status === "pending");
                    if (activeBooking) {
                        console.log("Found active booking:", activeBooking);
                        setHasBooked(true);
                        setUserBookingDetails(activeBooking);
                    } else {
                        console.log("No active bookings found. Bookings:", res);
                        setHasBooked(false);
                        setUserBookingDetails(null);
                    }
                } else {
                    console.log("No bookings found");
                    setHasBooked(false);
                    setUserBookingDetails(null);
                }
            } catch (err) {
                console.log("Error getting user bookings", err);
                setHasBooked(false);
                setUserBookingDetails(null);
            }
        } else {
            console.log("SetHasBooked to false - user or id not available", { user, id });
            setHasBooked(false);
            setUserBookingDetails(null);
        }
    };

    useEffect (() => {
        if (id) {
            GetThisRoomBookings();
            GetThisRoomInformation();
            if (user && user.id) {
              console.log("getuserbooking is executed");
                GetUserBookings();
            }
        }
    },[id, user?.id])

    useEffect(() => {
        if (user) {
            GetUserBookings();
        } else {
            setHasBooked(false);
        }
    }, [user])



  const [selectedRange, setSelectedRange] = useState({
    check_in_date: "",
    check_out_date: "",
  });

  const seeSelectedDates = () => {
    console.log(selectedRange.check_in_date, selectedRange.check_out_date);
  };



  //Login Logic
  const LoginGuest = async (email: string, password: string) => {
    try{
        const reslog =  await guestLogin(email, password);
        console.log(reslog);
        setUser(reslog);
         setParentPStatus("paying");
         setLoginError("");
    }
    catch(err){
        console.log("Error Logging In", err);
        setLoginError("Invalid email or password.");
    }
  }

  const ConfirmRoomBooking = async (name: string, country: string, address: string) =>
  {
    if (!user) {
        setBookingError("You must be logged in to book.");
        return;
    }
    try {
        console.log("Booking Details", name, country, address);
        const res = await createBooking(Number(id), user.guestid, selectedRange.check_in_date, selectedRange.check_out_date);
        console.log("created Booking", res);
        setBookingError("");
        setParentPStatus("");
        // Refresh bookings from API
        GetThisRoomBookings();
        
        // Wait a moment for backend to process, then refresh user bookings
        setTimeout(() => {
            GetUserBookings();
        }, 800);
    } catch (err) {
        console.log("Error creating booking", err);
        setBookingError("Booking failed. Please check dates and try again.");
    }
  }

  const RegisterGuest = async (name: string, email: string, password: string, confirmPassword: string) => {
    try{
          if(password !== confirmPassword)
          {
            setRegisterError("Passwords do not match.");
            return;
          }

          const res = await guestRegister(name, password, email);
          console.log("Registered Guest", res);
          setUser(res);
          setRegisterError("");
          setParentPStatus("loggingIn");
    }
    catch(err)
    {
      console.log("Error Registering Guest", err);
      setRegisterError("Registration failed. Email might already be in use.");
    }
  }

//TryBookRoom Logic
const TryBookRoom = async() =>
{
    if (user) {
        if (hasBooked) {
            setBookingError("You have already booked this room.");
            return;
        }
        setParentPStatus('paying');
    } else {
        setParentPStatus('loggingIn');
    }
}

  return (
    <div className="room-page">
      <div className="room-container">
        {/* LEFT SIDE - ROOM INFO */}
        <div className="room-info">

          <img
            src="https://picsum.photos/600/400"
            alt="Room"
            className="room-image"
          />

          <h1>{roomTitle}</h1>

          <p className="room-description">
            {roomDescription}
          </p>

          <p className="availability">
            Status:
            <span className={roomStatus == "Available" ? "available" : "unavailable"}>
              {roomStatus ? roomStatus : " Currently Booked"} Today
            </span>
          </p>

          {hasBooked && user && userBookingDetails && (
            <div className="user-booking-status">
              <div style={{ marginBottom: "8px" }}>
                ✓ You have already booked this room
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                <div>Check-in: {userBookingDetails.check_in_date}</div>
                <div>Check-out: {userBookingDetails.check_out_date}</div>
                <div>Status: <strong>{userBookingDetails.status?.toUpperCase()}</strong></div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDE - CALENDAR */}
        <div className="calendar-section">

          <h2>Choose Booking Date</h2>

          <CalendarComponent
            bookings={currentBookings}
            onRangeSelect={setSelectedRange}
          />

           <div className="amenities">
            <h2>Amenities</h2>
            <ul className="amenities-list">
              <li>Free WiFi</li>
              <li>Air Conditioning</li>
              <li>Smart TV</li>
              <li>Free Breakfast</li>
            </ul>
          </div>

        </div>

        

      </div>

   

      {/* BOOKING ACTION */}
      <div className="booking-action">

        <p>
          Selected Dates: <strong>
            {selectedRange.check_in_date || " --- "} →{" "}
            {selectedRange.check_out_date || " --- "}
          </strong>
          
        </p>

        <button onClickCapture={TryBookRoom} className="book-btn" onClick={seeSelectedDates} disabled={hasBooked}>
          {hasBooked ? "Already Booked" : "Book Now"}
        </button>

      </div>

       {parentPStatus != "" && <LoginPopupComponent InputLoginDetails={LoginGuest} InputRegisterDetails={RegisterGuest} InputBookingDetails={ConfirmRoomBooking} cuStatus ={parentPStatus} setCuStatus = {setPopupStatus} loginError={loginError} registerError={registerError} bookingError={bookingError}></LoginPopupComponent>}

    </div>
  )
}

export default RoomCalendarPage;