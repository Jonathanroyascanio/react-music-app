import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 
    try {
      const response = await fetch('https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/login',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json(); 
      const users = JSON.parse(result.body);
      const user = users.find((user) => user.user_name === username && user.password === password);

      if (user) {
        localStorage.setItem('username', user.user_name);
        navigate('/main'); 
      }
    } catch (error) {
      console.error('There was an error fetching the users!', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Login</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </label>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {error && <div style={errorStyle}>{error}</div>}
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Login;

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




