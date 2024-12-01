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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  );
};

export default Signup;
