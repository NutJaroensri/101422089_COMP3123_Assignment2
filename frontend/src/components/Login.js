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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        {/* Add "Sign Up" button that navigates to the sign-up page */}
        <button onClick={() => navigate('/signup')}>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

// Make sure to export the component correctly
export default Login;
