import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Import the Google Login component
import './Home.css';

const Home = ({ onLogin }) => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    onLogin(); // Trigger the parent `onLogin` handler
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <div className="home">
      <h1 className="title">Welcome to Boggle</h1>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
        useOneTap // Optional: Enables One Tap sign-in
      />
    </div>
  );
};

export default Home;
