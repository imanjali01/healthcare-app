import React, { useState, useEffect } from 'react';

const BACKEND_URL = 'https://healthcare-backend-hzbg.onrender.com';

export default function BackendLoader({ children }) {
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('Starting up server...');
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);

    const wakeUp = async () => {
      let attempts = 0;
      while (attempts < 10) {
        try {
          setMessage(attempts === 0
            ? 'Waking up server...'
            : `Still loading, please wait... (attempt ${attempts + 1})`
          );
          const res = await fetch(`${BACKEND_URL}/api/auth/doctors/`);
          if (res.ok || res.status === 401 || res.status === 403) {
            clearInterval(dotInterval);
            setReady(true);
            return;
          }
        } catch {}
        attempts++;
        await new Promise(r => setTimeout(r, 5000));
      }
      // Give up after 10 attempts and show app anyway
      clearInterval(dotInterval);
      setReady(true);
    };

    wakeUp();
    return () => clearInterval(dotInterval);
  }, []);

  if (ready) return children;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🏥</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HealthCare+</h1>
        <p style={{ opacity: 0.85, marginBottom: 32, fontSize: 15 }}>
          {message}{dots}
        </p>

        {/* Loading spinner */}
        <div style={{
          width: 48, height: 48, margin: '0 auto 24px',
          border: '4px solid rgba(255,255,255,0.2)',
          borderTop: '4px solid white', borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />

        <p style={{ fontSize: 13, opacity: 0.7, maxWidth: 300, margin: '0 auto' }}>
          The server sleeps when inactive on the free plan.
          It usually wakes up in 30-60 seconds. Please wait.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}