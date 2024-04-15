import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const queryParams = new URLSearchParams();
    if (email) queryParams.append('email', email);
    if (password) queryParams.append('password', password);
    const apiUrl = 'https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/login/users';

    try {
      const response = await fetch(`${apiUrl}?${queryParams}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json(); 
      if (result.ok) {
        setErrorMessage('The email already exists');
      } else {
        // Post registration data
        const registerResponse = await fetch('https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });
        if (registerResponse.ok) {
          navigate('/login');
        } else {
          throw new Error('Registration failed');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration.');
    }
  };
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Register</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        </label>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Register;

// Styles
const containerStyle = {
  textAlign: 'center',
};

const titleStyle = {
  marginBottom: '20px',
  fontSize: '24px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const labelStyle = {
  margin: '10px 0',
  fontSize: '18px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
};

const buttonStyle = {
  padding: '10px 20px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  marginTop: '20px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};

const linkStyle = {
  marginTop: '20px',
  fontSize: '16px',
  textDecoration: 'none',
  color: '#007bff',
};