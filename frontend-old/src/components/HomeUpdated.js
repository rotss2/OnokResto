import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { checkHealth } from "../services/api";

function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const history = useHistory();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await checkHealth();
        setBackendStatus("✅ Connected to backend!");
      } catch (err) {
        setBackendStatus("❌ Backend not connected");
        console.error("Backend health check failed:", err);
      }
    };

    checkBackend();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>🍽️ OnokResto</h1>
        <p style={styles.subtitle}>Your Premium Restaurant Reservation System</p>
        
        <div style={styles.statusCard}>
          <p style={styles.statusText}>{backendStatus}</p>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📅</div>
          <h3>Easy Booking</h3>
          <p>Reserve your table in seconds with our simple booking system</p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⏰</div>
          <h3>Real-time Updates</h3>
          <p>Get instant confirmations and manage your reservations</p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎉</div>
          <h3>Special Events</h3>
          <p>Book tables for special occasions and celebrations</p>
        </div>
      </div>

      <div style={styles.actions}>
        <button 
          style={styles.primaryButton}
          onClick={() => history.push('/book')}
        >
          Make a Reservation
        </button>
        
        <button 
          style={styles.secondaryButton}
          onClick={() => history.push('/reservations')}
        >
          View My Reservations
        </button>
      </div>

      <div style={styles.authLinks}>
        <button 
          style={styles.linkButton}
          onClick={() => history.push('/login')}
        >
          Login
        </button>
        <span style={styles.separator}>|</span>
        <button 
          style={styles.linkButton}
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    color: 'white'
  },
  hero: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 60px'
  },
  title: {
    fontSize: '56px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  subtitle: {
    fontSize: '24px',
    margin: '0 0 30px 0',
    opacity: 0.9
  },
  statusCard: {
    background: 'rgba(255,255,255,0.2)',
    padding: '15px',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    display: 'inline-block'
  },
  statusText: {
    margin: 0,
    fontSize: '16px'
  },
  features: {
    maxWidth: '1200px',
    margin: '0 auto 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  featureCard: {
    background: 'rgba(255,255,255,0.15)',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s'
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  actions: {
    maxWidth: '600px',
    margin: '0 auto 30px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryButton: {
    background: 'white',
    color: '#667eea',
    padding: '15px 40px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  secondaryButton: {
    background: 'transparent',
    color: 'white',
    padding: '15px 40px',
    border: '2px solid white',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  authLinks: {
    textAlign: 'center',
    marginTop: '40px'
  },
  linkButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '5px 10px'
  },
  separator: {
    margin: '0 10px',
    opacity: 0.7
  }
};

export default Home;