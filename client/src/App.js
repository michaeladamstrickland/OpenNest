// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import SinglePropertyPage from './components/SinglePropertyPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Import SignUp page
import Messages from './pages/Messages';
import Offers from './pages/Offers';
import Tours from './pages/Tours';
import BuyerSellerDashboardNavbar from './components/BuyerSellerDashboardNavBar';
import Chatbot from './components/Chatbot';

const ProtectedRoute = ({ children }) => {
  const { authenticatedUser } = useAuth(); // Ensure context is available here
  return authenticatedUser ? children : <Navigate to="/login" />;
};

const App = () => {
  const { authenticatedUser, logout } = useAuth(); // Get context values

  return (
    <div>
       {/* Conditionally render the navbar based on route */}
       {window.location.pathname.includes('/buyer-dashboard') ? (
        <BuyerSellerDashboardNavbar authenticatedUser={authenticatedUser} />
      ) : (
        <Navbar authenticatedUser={authenticatedUser} handleLogout={logout} />
      )}
      <Chatbot />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        
        
         <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/dashboard/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
        <Route path="/dashboard/tours" element={<ProtectedRoute><Tours /></ProtectedRoute>} />

        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <SinglePropertyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
