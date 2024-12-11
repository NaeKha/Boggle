import React, { useState, useEffect, useMemo } from 'react';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom'

function Login() {
    return (
        <>
            <GoogleLogin onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
                navigate('/home')  //SHOULD RENAVIGATE TO GAME START MENU
            }}
            onError={() => console.log("Login Failed")}
            />
        </>
    )
}
// CODE TO HANDLE LOGGING OUT CAN JUST ADD THIS TO A BUTTON IN THE APP
//function handleLogout() {
   //googleLogout()
   //navigate('/login')  //THEN PROBABLY WANT TO NAVIGATE BACK TO THE LOGIN PAGE
 //}

export default Login;