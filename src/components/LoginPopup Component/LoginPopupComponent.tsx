import './loginpopup.css'
import {useState} from 'react';

interface Props{
setCuStatus: (input: string) => void;
cuStatus: string;

InputLoginDetails: (email: string, password: string) => void;
InputRegisterDetails: (name: string, email: string, password: string, confirmPassword: string) => void;
InputBookingDetails: (name: string, country: string, address: string) => void;

loginError: string;
registerError: string;
bookingError: string;
}

function LoginPopupComponent({cuStatus, setCuStatus, InputLoginDetails, InputRegisterDetails, InputBookingDetails, loginError, registerError, bookingError}: Props){
const [LoginEmail, setLoginEmail] = useState<string>("");
const [LoginPassword, setLoginPassword] = useState<string>("");

const [RegisterName, setRegisterName] = useState<string>("");
const [RegisterEmail, setRegisterEmail] = useState<string>("");
const [RegisterPassword, setRegisterPassword] = useState<string>("");
const [RegisterConfirmPassword, setRegisterConfirmPassword] = useState<string>("");

const [BookingName, setBookingName] = useState<string>("");
const [BookingCountry, setBookingCountry] = useState<string>("");
const [BookingAddress, setBookingAddress] = useState<string>("");

const handleLogin = () => {
    InputLoginDetails(LoginEmail, LoginPassword);
}

const handleRegister = () => {
    InputRegisterDetails(RegisterName, RegisterEmail, RegisterPassword, RegisterConfirmPassword);
}

const handleBookingDetails = () => {
    InputBookingDetails(BookingName, BookingCountry, BookingAddress);
}



    return(
    
        <div className='loginpopup-background'>

        {cuStatus == "loggingIn" && <div className='loginpopup-card'>
                    <p>Sign in to Book a Reservation</p>
                    <p>Email</p>
                    <input onChange={(e) => setLoginEmail(e.target.value)}></input>
                    <p>Password</p>
                    <input onChange={(e) => setLoginPassword(e.target.value)}></input>
                    {loginError && <p className="error">{loginError}</p>}
                    <button onClick={handleLogin}  className='popup-enterbutton'>Login</button>
                    <button  onClick={() => setCuStatus("")} className='popup-cancelbutton'>Cancel</button>
                    <p onClick={() => setCuStatus("registering")} className='popupcar-centeredtext'>Don't have an Account? Register</p>
        </div> }


        {cuStatus == "registering" && <div className='loginpopup-card'>
                    <p>Register an Account</p>
                    <p>Full Name</p>
                    <input onChange={(e) => setRegisterName(e.target.value)}></input>
                    <p>Email</p>
                    <input onChange={(e) => setRegisterEmail(e.target.value)}></input>
                    <p>Password</p>
                    <input onChange={(e) => setRegisterPassword(e.target.value)}></input>
                    <p>Confirm Password</p>
                    <input onChange={(e) => setRegisterConfirmPassword(e.target.value)}></input>
                    {registerError && <p className="error">{registerError}</p>}
                    <button onClick={handleRegister} className='popup-enterbutton'>Register</button>
                    <button onClick={() => setCuStatus("")} className='popup-cancelbutton'>Cancel</button>
                    <p onClick={() => setCuStatus("loggingIn")} className='popupcar-centeredtext'>Already have an Account? Login</p>
           </div> }


            {cuStatus == "paying" && <div className='loginpopup-paymentcard'>
                
                     <span className='popupcard-headertitle'>Payment Details</span>
                     <p>Card Number</p>
                     <input placeholder='1234 1234 1234 1234'></input>

                     <div className='creditcard-details-container'>
                         <div className='creditcard-details-container1'>
                             <p>Expiration Date</p>
                             <input placeholder='MM/YY'></input>
                         </div>

                         <div className='creditcard-details-container1'>
                             <p>Security Code</p>
                             <input placeholder='CVC' className='securitycode-input'></input>
                         </div>
                        
                        
                     </div>

                     <p className='popupcar-centeredtext'>By providing your card information, you allow PatHotelia, to charge your card for future payments in accordance with their terms</p>

                     <p>Full Name</p>
                     <input onChange={(e) => setBookingName(e.target.value)}></input>

                     <p>Country or Region</p>
                     <input onChange={(e) => setBookingCountry(e.target.value)}></input>

                     <p>Address</p>
                     <input onChange={(e) => setBookingAddress(e.target.value)}></input>
                     {bookingError && <p className="error">{bookingError}</p>}
                     <button onClick={handleBookingDetails} className='popup-enterbutton'>Book</button>
                     <button onClick={() => setCuStatus("")} className='popup-cancelbutton'>Cancel</button>
             </div> }

            

        </div>
    )
}

export default LoginPopupComponent;