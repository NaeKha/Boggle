import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';

const CLIENT_ID = "749605149162-b35q9japuq2c5i2rp8c7jj2kumnt91pf.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {CLIENT_ID}>
      <App/>
    </GoogleOAuthProvider>
  </StrictMode>
)

