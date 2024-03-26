import React, { useEffect } from "react";
import { GoogleButton} from 'react-google-button'
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Signin = () => {
    const { googleSignIn, user, logOut } = UserAuth ();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn();
        } catch(error){
            console.log(error);
        }
    };
    const handleSignOut = async() => {
        try{
            await logOut()
        } catch (error){
            console.log(error)
        }
    }

    useEffect(()=> {
        if(user != null){
            navigate('/Dashboard')
        }
    },[user])

    return (
        <>
        <div className='flexxx'>
            <h1 className='textxx'>
                Firebase Google Auth & Context
            </h1>
            {user?.displayName ? <button onClick={handleSignOut}>Logout</button> : <Link to='/login'> Sign in</Link>}

            
        </div>
        <h1 className='text-center'> Sign In</h1>
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>

        </>
    );
}

export default Signin;