import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import Auth from './hoc/auth'
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import MyPage from './components/views/MyPage/MyPage';
import React from 'react';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  const NewLandingPage = Auth(LandingPage, true);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  const NewMyPage = Auth(MyPage, true);

  return (
  
    <Routes>
      <Route path="/" element={<NewLandingPage />} />
      <Route path="/login" element={<NewLoginPage />} />
      <Route path="/register" element={<NewRegisterPage />} />
      <Route path="/mypage" element={<NewMyPage />} />
      </Routes>
  );
}

export default App;

