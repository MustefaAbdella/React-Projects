import React from 'react'
import './LoginPopUp.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'

const LoginPopUp = ({ setShowLogin }) => {

  const [currenetState, setCurrenetState] = useState("Login")
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currenetState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currenetState === "Login" ? <></> :
            <input type="text" placeholder='Your name' required />}
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='Password' required />
        </div>
        <button>{currenetState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use and privacy policy</p>
        </div>
        {currenetState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrenetState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrenetState("Login")}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopUp