import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Main = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Send the token to the backend for verification
    const token = response.credential;
    
    // Example: send token to backend
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend Response:', data);
        // Optionally, store user data or token in local storage/session
        setUser(data.user);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        {!user ? (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        ) : (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Main;
