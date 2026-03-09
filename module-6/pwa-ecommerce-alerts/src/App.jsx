import { useState, useEffect } from 'react';
import './App.css';
 
function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [product, setProduct] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
 
  // Capture the install prompt event
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    });
  }, []);
 
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the browser's install prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User installed the PWA');
      }
      setDeferredPrompt(null); // We can only use the prompt once
    }
  };
 
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    const status = await Notification.requestPermission();
    setPermission(status);
  };
 
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🛍️ PWA Deal Alerts From Thiru</h1>
      
      {/* --- INSTALL APP BUTTON --- */}
      {deferredPrompt && (
        <div style={{ padding: '15px', background: '#d0d0d0', borderRadius: '8px', marginBottom: '20px' }}>
          <p>Get the best experience by installing our app!</p>
          <button onClick={handleInstallClick} style={{ padding: '10px', background: '#00838f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Install App
          </button>
        </div>
      )}
 
      <div style={{ padding: '15px', background: '#cdcdcd', borderRadius: '8px', marginBottom: '20px' }}>
        <p><strong>Push Permission Status:</strong> {permission}</p>
        {permission !== 'granted' && (
          <button onClick={requestNotificationPermission} style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Enable Background Alerts
          </button>
        )}
      </div>
    </div>
  );
}
export default App;