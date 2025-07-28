import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Router } from './components/Router/Router';


function App() {
  const {REACT_APP_GOOGLE_CLIENT_ID} = process.env
  return (
    <div>
      <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID!}>
        
        <Router />
      </GoogleOAuthProvider>
    </div>

  );
}

export default App;
