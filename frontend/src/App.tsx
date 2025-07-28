import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


function App() {
  const {REACT_APP_GOOGLE_CLIENT_ID} = process.env
  return (
    <div>
      <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID!}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={
              <div>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </div>
            } />
            <Route path="*" element={<div>No page</div>} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>

  );
}

export default App;
