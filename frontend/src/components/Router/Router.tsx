import { FC } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "../../pages/HomePage";
import { Login } from "../../pages/Login";
import { NotFound } from "../../pages/NotFound";

export const Router: FC = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    )
}