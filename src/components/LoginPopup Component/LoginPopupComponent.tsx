import './loginpopup.css'
import {useState} from 'react';

interface Props{
setCuStatus: (input: string) => void;
cuStatus: string;

InputLoginDetails: (email: string, password: string) => void | Promise<void>;
InputRegisterDetails: (name: string, email: string, password: string, confirmPassword: string) => void | Promise<void>;
InputBookingDetails?: (name: string, country: string, address: string) => void | Promise<void>;

loginError?: string;
registerError?: string;
bookingError?: string;
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
    InputBookingDetails?.(BookingName, BookingCountry, BookingAddress);
}



    return(
    
        <div className='loginpopup-background' onMouseDown={() => setCuStatus("")}>

        {cuStatus === "loggingIn" && <div className='loginpopup-card' role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
                    <span className='popupcard-headertitle'>Welcome Back</span>
                    <p className='popupcard-subtitle'>Sign in to continue your reservation journey.</p>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='login-email'>User </label>
                      <input id='login-email' type='' className='popup-form-input' placeholder='' onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='login-password'>Password</label>
                      <input id='login-password' type='password' className='popup-form-input' placeholder='Enter your password' onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    {loginError && <p className="error">{loginError}</p>}
                    <div className='popup-actions'>
                      <button onClick={handleLogin}  className='btn btn-primary popup-enterbutton'>Sign In</button>
                      <button  onClick={() => setCuStatus("")} className='btn btn-ghost popup-cancelbutton'>Cancel</button>
                    </div>
                    <p className='popup-helper-link'>New guest?
                      <button type='button' onClick={() => setCuStatus("registering")}>Create account</button>
                    </p>
        </div> }


        {cuStatus === "registering" && <div className='loginpopup-card' role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
                    <span className='popupcard-headertitle'>Guest Registration</span>
                    <p className='popupcard-subtitle'>Create your account to secure and manage reservations.</p>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='register-name'>Full Name</label>
                      <input id='register-name' className='popup-form-input' onChange={(e) => setRegisterName(e.target.value)} />
                    </div>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='register-email'>Email</label>
                      <input id='register-email' type='email' className='popup-form-input' onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='register-password'>Password</label>
                      <input id='register-password' type='password' className='popup-form-input' onChange={(e) => setRegisterPassword(e.target.value)} />
                    </div>
                    <div className='popup-form-group'>
                      <label className='popup-form-label' htmlFor='register-confirm'>Confirm Password</label>
                      <input id='register-confirm' type='password' className='popup-form-input' onChange={(e) => setRegisterConfirmPassword(e.target.value)} />
                    </div>
                    {registerError && <p className="error">{registerError}</p>}
                    <div className='popup-actions'>
                      <button onClick={handleRegister} className='btn btn-primary popup-enterbutton'>Create Account</button>
                      <button onClick={() => setCuStatus("")} className='btn btn-ghost popup-cancelbutton'>Cancel</button>
                    </div>
                    <p className='popup-helper-link'>Already registered?
                      <button type='button' onClick={() => setCuStatus("loggingIn")}>Sign in</button>
                    </p>
           </div> }


            {cuStatus === "paying" && <div className='loginpopup-paymentcard' role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
                
                     <span className='popupcard-headertitle'>Payment Details</span>
                     <p className='popupcard-subtitle'>Secure your stay with quick card checkout.</p>
                     <div className='popup-form-group'>
                       <label className='popup-form-label' htmlFor='card-number'>Card Number</label>
                       <input id='card-number' className='popup-form-input' placeholder='1234 1234 1234 1234' />
                     </div>

                     <div className='creditcard-details-container'>
                         <div className='creditcard-details-container1'>
                             <div className='popup-form-group'>
                               <label className='popup-form-label' htmlFor='card-expiration'>Expiration Date</label>
                               <input id='card-expiration' className='popup-form-input' placeholder='MM/YY' />
                             </div>
                         </div>

                         <div className='creditcard-details-container1'>
                             <div className='popup-form-group'>
                               <label className='popup-form-label' htmlFor='card-cvc'>Security Code</label>
                               <input id='card-cvc' className='popup-form-input' placeholder='CVC' />
                             </div>
                         </div>
                        
                        
                     </div>

                     <p className='popupcard-centeredtext'>By confirming payment, you authorize PatHotelia to process your reservation under our booking terms.</p>

                     <div className='popup-form-group'>
                       <label className='popup-form-label' htmlFor='booking-name'>Full Name</label>
                       <input id='booking-name' className='popup-form-input' onChange={(e) => setBookingName(e.target.value)} />
                     </div>

                     <div className='popup-form-group'>
                       <label className='popup-form-label' htmlFor='booking-country'>Country or Region</label>
                       <input id='booking-country' className='popup-form-input' onChange={(e) => setBookingCountry(e.target.value)} />
                     </div>

                     <div className='popup-form-group'>
                       <label className='popup-form-label' htmlFor='booking-address'>Address</label>
                       <input id='booking-address' className='popup-form-input' onChange={(e) => setBookingAddress(e.target.value)} />
                     </div>
                     {bookingError && <p className="error">{bookingError}</p>}
                     <div className='popup-actions'>
                       <button onClick={handleBookingDetails} className='btn btn-primary popup-enterbutton'>Confirm Booking</button>
                       <button onClick={() => setCuStatus("")} className='btn btn-ghost popup-cancelbutton'>Cancel</button>
                     </div>
             </div> }

            

        </div>
    )
}

export default LoginPopupComponent;
