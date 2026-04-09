import { useState, useEffect } from "react";
import CalendarComponent from "../../components/Room Calendar Component/CalendarComponent";
import LoginPopupComponent from "../../components/LoginPopup Component/LoginPopupComponent";
import { useParams } from "react-router-dom";
import { createBooking, getByRoomBooking } from "../../utils/bookingsAPI";
import { getOneRoom } from "../../utils/roomsAPI";
import { useAuth } from "../../context/AuthenticationContext";
import { guestLogin, guestMe, guestRegister } from "../../utils/guestsAPI";

type RoomBookings = {
    check_in_date: string,
    check_out_date: string
}


function RoomCalendarPage()
{

const { setUser } = useAuth();

 const { id } = useParams<{id: string}>(); //Still needs to be converted with Number(id)
 const [parentPStatus, setParentPStatus] = useState<string>("");
 const [currentBookings, setCurrentBookings] = useState<RoomBookings[]>([]);

 const [roomTitle, setRoomTitle] = useState<string>('');
 const [roomDescription, setRoomDescription] = useState<string>('');
 const [roomStatus, setRoomStatus] = useState<string>('');

//  const [roomUrl, setRoomUrl] = useState<string>(''); when cloudinary is applied use this:
const [loginStatus, setLoginStatus] = useState<string>("");

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


    useEffect (() => {
        GetThisRoomBookings();
        GetThisRoomInformation();
    },[])

//   const fakeBookings = [
//     {
//       check_in_date: "2026-03-16",
//       check_out_date: "2026-03-20",
//     },
//     {
//       check_in_date: "2026-04-05",
//       check_out_date: "2026-04-08",
//     },
//     {
//       check_in_date: "2026-03-03",
//       check_out_date: "2026-03-05",
//     },
//   ];

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
    }
    catch{
        console.log("Error Logging In")
    }
  }

  const ConfirmRoomBooking = async (name: string, country: string, address: string) =>
  {
    console.log("Booking Details", name, country, address);
    const res = await createBooking(Number(id), 1, selectedRange.check_in_date, selectedRange.check_out_date);
    console.log("created Booking", res);
  }

  const RegisterGuest = async (name: string, email: string, password: string, confirmPassword: string) => {
    try{
          if(password !== confirmPassword)
          {
            alert("Passwords do not match");
            return;
          }

          const res = await guestRegister(name, password, email);
          console.log("Registered Guest", res);
          setParentPStatus("loggingIn");
    }
    catch(err)
    {
      console.log("Error Registering Guest");
    }
  }




  //TryBookRoom Logic
const TryBookRoom = async() =>
{
    if(true)
    {
        setParentPStatus('loggingIn')
    }
    else{
        setParentPStatus('paying')
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

        <button onClickCapture={TryBookRoom} className="book-btn" onClick={seeSelectedDates}>
          Book Now
        </button>

      </div>

       {parentPStatus != "" && <LoginPopupComponent InputLoginDetails={LoginGuest} InputRegisterDetails={RegisterGuest} InputBookingDetails={ConfirmRoomBooking} loginStatus={loginStatus} cuStatus ={parentPStatus} setCuStatus = {setPopupStatus}></LoginPopupComponent>}

    </div>
  )
}

export default RoomCalendarPage;