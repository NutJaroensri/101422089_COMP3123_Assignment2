import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', {
        email,
        password,
      });

      // On successful login
      setSuccess(response.data.message);
      localStorage.setItem('token', response.data.token); // Save token to local storage
      navigate('/employeesList');
      setError(''); // Clear any previous error
    } catch (err) {
      // Handle login failure
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.signupContainer}>
          <button onClick={() => navigate('/signup')} style={styles.signupButton}>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

// Styling to center the content at the top of the page
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default Login;
