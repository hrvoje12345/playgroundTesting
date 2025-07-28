import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<div>login</div>} />
          <Route path="*" element={<div>No page</div>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
