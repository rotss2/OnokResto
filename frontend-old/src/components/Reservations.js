import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation } from '../services/api';
import { useHistory } from 'react-router-dom';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reservations');
      setLoading(false);
      console.error('Error fetching reservations:', err);
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await deleteReservation(reservationId);
        // Remove from local state
        setReservations(reservations.filter(r => r.id !== reservationId));
        alert('Reservation cancelled successfully!');
      } catch (err) {
        alert('Failed to cancel reservation');
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading reservations...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Reservations</h1>
        <button 
          style={styles.newButton}
          onClick={() => history.push('/book')}
        >
          + New Reservation
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {reservations.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No reservations yet</h3>
          <p>Make your first reservation to get started!</p>
          <button 
            style={styles.button}
            onClick={() => history.push('/book')}
          >
            Make a Reservation
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {reservations.map((reservation) => (
            <div key={reservation.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Table {reservation.table_id}</h3>
                <span style={styles.badge}>Active</span>
              </div>
              
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.icon}>📅</span>
                  <span>{reservation.time}</span>
                </div>
                
                <div style={styles.infoRow}>
                  <span style={styles.icon}>👥</span>
                  <span>{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              </div>

              <div style={styles.cardFooter}>
                <button 
                  style={styles.editButton}
                  onClick={() => history.push(`/edit/${reservation.id}`)}
                >
                  Edit
                </button>
                <button 
                  style={styles.deleteButton}
                  onClick={() => handleDelete(reservation.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.backButton}>
        <button 
          style={styles.button}
          onClick={() => history.push('/')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '40px 20px'
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    color: '#333',
    margin: 0
  },
  newButton: {
    background: '#667eea',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#666'
  },
  error: {
    background: '#fee',
    color: '#c00',
    padding: '15px',
    borderRadius: '5px',
    margin: '0 auto 20px',
    maxWidth: '1200px',
    textAlign: 'center'
  },
  emptyState: {
    background: 'white',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '60px 40px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee'
  },
  cardTitle: {
    margin: 0,
    color: '#333'
  },
  badge: {
    background: '#efe',
    color: '#0a0',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  cardBody: {
    marginBottom: '20px'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    color: '#666'
  },
  icon: {
    fontSize: '18px'
  },
  cardFooter: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    flex: 1,
    background: '#667eea',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  deleteButton: {
    flex: 1,
    background: '#ff4444',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  button: {
    background: '#667eea',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  backButton: {
    maxWidth: '1200px',
    margin: '30px auto 0',
    textAlign: 'center'
  }
};

export default Reservations;