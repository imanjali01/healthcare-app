import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
      padding: '0 32px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(14,165,233,0.3)',
      position: 'sticky', top: 0, zIndex: 100
    }}>

      {/* Logo */}
      <Link to={user ? '/dashboard' : '/'} style={{
        display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0
      }}>
        <span style={{ fontSize: 24 }}>🏥</span>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>HealthCare+</span>
      </Link>

      {/* Center nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <NavLink to="/" active={isActive('/')}>Home</NavLink>
        <NavLink to="/about" active={isActive('/about')}>About</NavLink>
        <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>

        {user && (
          <>
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.35)', margin: '0 6px' }} />
            <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
            {user.role === 'patient' && (
              <>
                <NavLink to="/doctors" active={isActive('/doctors')}>Find Doctors</NavLink>
                <NavLink to="/appointments" active={isActive('/appointments')}>Appointments</NavLink>
                <NavLink to="/medical-history" active={isActive('/medical-history')}>Medical History</NavLink>
              </>
            )}
            {user.role === 'doctor' && (
              <NavLink to="/appointments" active={isActive('/appointments')}>Appointments</NavLink>
            )}
            <NavLink to="/profile" active={isActive('/profile')}>Profile</NavLink>
          </>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {user ? (
          <>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0
            }}>
              {user.profile_picture
                ? <img
                    src={'https://healthcare-backend-hzbg.onrender.com' + user.profile_picture}
                    alt="avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                : user.first_name ? user.first_name[0].toUpperCase() : 'U'}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 14, fontWeight: 500 }}>
              {user.first_name || user.username}
            </span>
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', padding: '7px 16px', borderRadius: 7,
              cursor: 'pointer', fontSize: 13, fontWeight: 500
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              padding: '7px 16px', borderRadius: 7,
              border: '1px solid rgba(255,255,255,0.4)'
            }}>Login</Link>
            <Link to="/register" style={{
              background: 'white', color: '#0ea5e9', textDecoration: 'none',
              fontSize: 14, fontWeight: 600, padding: '8px 18px', borderRadius: 7
            }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link to={to} style={{
      color: active ? 'white' : 'rgba(255,255,255,0.80)',
      textDecoration: 'none', fontSize: 13,
      fontWeight: active ? 600 : 400,
      padding: '6px 10px', borderRadius: 8,
      background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
      transition: 'all 0.2s', whiteSpace: 'nowrap'
    }}>{children}</Link>
  );
}