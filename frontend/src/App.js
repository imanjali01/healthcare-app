import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import MedicalHistory from './pages/MedicalHistory';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#f0f4f8'
    }}>
      <div style={{ textAlign: 'center', color: '#0ea5e9' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏥</div>
        <p style={{ fontSize: 16, fontWeight: 500 }}>Loading HealthCare+...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
        <Route path="/book/:doctorId" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/medical-history" element={<PrivateRoute><MedicalHistory /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}