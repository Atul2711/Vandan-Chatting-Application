import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home"

export default function App() {
  return (
    <Router>
        <Routes>
        <Route path="/login" exact element={<LoginPage />}></Route>
        <Route path="/register" exact element={<RegisterPage />}></Route>
        <Route path="/" exact element={<HomePage />}></Route>
        </Routes>
    </Router>
  )
}
