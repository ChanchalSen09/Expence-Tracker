import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout.jsx';
import Dashboard from './Components/dashboard.jsx';
import Login from './Components/login.jsx';
import Signup from './Components/Signup.jsx';
import OtpPage from './Components/otppage.jsx';
import ExpenseHistoryPage from './Components/allexpence.jsx';
import AuthRoute from './Components/authroute.jsx';
import Home from './Components/home.jsx';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/expense-history" element={<AuthRoute><ExpenseHistoryPage /></AuthRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
