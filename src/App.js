import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Index from './pages/index';

function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
  };

  const logoStyle = {
    height: '50px',
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
  };

  const navButtonStyle = {
    ...navLinkStyle, 
    background: '#ffffff',
    color: '#4CAF50',
    border: '2px solid #4CAF50',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  return (
    <Router>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <img src="/logo.png" alt="Logo" style={logoStyle} />
          <nav style={navStyle}>
            <Link to="/" style={navButtonStyle}>Home</Link>
            <Link to="/register" style={navButtonStyle}>Register</Link>
            <Link to="/login" style={navButtonStyle}>Login</Link>
            <Link to="/main" style={navButtonStyle}>Dashboard</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
