import React, { useState } from 'react'
import "./LoginSignup.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


import usericon from "../assets/person.png"
import emailicon from "../assets/email.png"
import passwordicon from "../assets/password.png"

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    


    const submitform = async (e) => {
        e.preventDefault();

        try {
            if (action === 'Sign Up') {
                const checkExistingUser = await axios.post('http://localhost:3001/signup', { name, email, password });

                if (checkExistingUser.data.error === 'Email already exists') {
                    setErrorMessage('Email already exists. Please choose a different email.');
                } else if (checkExistingUser.data.error) {
                    setErrorMessage('Signup failed. Please try again.');
                } else {
                    setErrorMessage('Signup successful');
                    console.log('Signup successful:', checkExistingUser.data);
                    setPassword('');
                    setAction('Login');
                }
            } else {
                const response = await axios.post('http://localhost:3001/login', { email, password });

                if (response.data.error === 'Email not found') {
                    setErrorMessage('Email not found. Please check your email or sign up.');
                } else if (response.data.error === 'Incorrect password') {
                    setErrorMessage('Incorrect password. Please try again.');
                } else if (response.data.error) {
                    setErrorMessage('Login failed. Please try again.');
                } else {
                    setErrorMessage('Login successful:');
                    console.log('Login successful:', response.data);
                    
                    navigate('../NextPage');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error occurred. Please try again.');
        }
    };




  return (
    <form onSubmit={submitform} className='container'>
        <div className="header">
            {action}
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={usericon} alt="personicon"  />
                <input required type="text" placeholder='Name' name='name' onChange={(e)=>setName(e.target.value)}/>
            </div>}
            <div className="input">
                <img src={emailicon} alt="emailicon" />
                <input required type="email" placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input">
                <img src={passwordicon} alt="passwordicon" />
                <input required type="password" placeholder='Password' name='password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
        </div>
        <div>{errorMessage && <div className='error-message'>{errorMessage}</div>}</div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
        <div className="buttons">
            <button type='submit' className={action==="Login"?"Submit gray":"Submit"} onClick={()=>setAction("Sign Up")}>Sign Up</button>
            <button type='submit' className={action==="Sign Up"?"Submit gray":"Submit"} onClick={()=>setAction("Login")}>Login</button>
        </div>
    </form>
  )
}

export default LoginSignup