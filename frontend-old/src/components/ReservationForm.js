import React, { useState } from 'react';
import { createReservation } from '../services/api';
import { useHistory } from 'react-router-dom';

function ReservationForm() {
  const [formData, setFormData] = useState({
    table_id: '',
    date: '',
    time: '',
    guests: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Combine date and time
      const reservationTime = `${formData.date} ${formData.time}`;
      
      const reservationData = {
        table_id: parseInt(formData.table_id),
        time: reservationTime,
        guests: parseInt(formData.guests)
      };

      const response = await createReservation(reservationData);
      console.log('Reservation created!', response);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        table_id: '',
        date: '',
        time: '',
        guests: 1
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        history.push('/reservations');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to create reservation. Please try again.');
      console.error('Reservation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>🍽️ Make a Reservation</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>Reservation created successfully! Redirecting...</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Table Number</label>
            <select
              name="table_id"
              value={formData.table_id}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select a table</option>
              <option value="1">Table 1 (2 seats - Window)</option>
              <option value="2">Table 2 (4 seats - Corner)</option>
              <option value="3">Table 3 (4 seats - Center)</option>
              <option value="4">Table 4 (6 seats - Private)</option>
              <option value="5">Table 5 (8 seats - Large)</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              max="10"
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Table'}
          </button>

          <button 
            type="button"
            onClick={() => history.push('/')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  formCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    background: '#667eea',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  cancelButton: {
    background: '#ccc',
    color: '#333',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  error: {
    background: '#fee',
    color: '#c00',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  success: {
    background: '#efe',
    color: '#0a0',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  }
};

export default ReservationForm;