const BACKEND_URL = 'https://healthcare-backend-hzbg.onrender.com';

export const keepBackendAlive = () => {
  // Ping the backend every 10 minutes to prevent it sleeping
  const ping = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/doctors/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Backend pinged successfully');
    } catch (err) {
      console.log('Ping failed:', err);
    }
  };

  // Ping immediately on load
  ping();

  // Then ping every 10 minutes
  setInterval(ping, 10 * 60 * 1000);
};