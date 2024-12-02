import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
        username,
        email,
        password,
      });

      // On successful signup
      setSuccess(response.data.message);
      setError(''); // Clear any previous error

      // Redirect to Login page after successful signup
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      // Handle signup failure
      setError(err.response?.data?.err[0]?.msg || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.signupContainer}>
          <button onClick={() => navigate('/')} style={styles.signupButton}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

// Styling for consistent design
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    paddingTop: '50px', // Adjust padding to position content
  },
  formContainer: {
    textAlign: 'center',
    width: '400px', // Increased width for a larger form
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fefdf1',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between form elements
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#17a589',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
  },
  signupContainer: {
    marginTop: '20px',
  },
  signupButton: {
    backgroundColor: '#17a589',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Signup;
