import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px', 
    fontSize: '16px',
    background: '#4CAF50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    textDecoration: 'none', 
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', 
  };

  const containerStyle = {
    textAlign: 'center', 
    paddingTop: '50px', 
  };

  return (
    <div style={containerStyle}>
      <h1>Home Page</h1>
      <Link to="/login"><button style={buttonStyle}>Login</button></Link>
      <Link to="/register"><button style={buttonStyle}>Register</button></Link>
    </div>
  );
}

export default Index;
