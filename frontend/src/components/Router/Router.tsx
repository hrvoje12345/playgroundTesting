import { GoogleLogin } from "@react-oauth/google";
import { FC } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router: FC = () => {
    return (
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
    )
}