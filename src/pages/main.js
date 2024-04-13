import React, { useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';

function Main() {
    const username = localStorage.getItem('username');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    const fetchSubscriptions = useCallback(async () => {
        const apiUrl = `https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/subscription?username=${username}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log('Data:', data);
          setSubscriptions(data);
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
        }
      }, [username]);
      useEffect(() => {
        fetchSubscriptions();
      }, [fetchSubscriptions]);
  const handleQuery = async () => {
    const apiUrl = 'https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/music';
    
    const queryParams = new URLSearchParams();
    if (title) queryParams.append('title', title);
    if (year) queryParams.append('year', year);
    if (artist) queryParams.append('artist', artist);
    
    try {
      const response = await fetch(`${apiUrl}?${queryParams}`);
  
      
      if (!response.ok) {
        if (response.status === 404) {
          setQueryResult("No search criteria provided");
        } else if (response.status === 500) {
          setQueryResult("Internal server error. Please try again later.");
        } else {
          setQueryResult(`An unexpected error occurred: ${response.status}`);
        }
    }
  
      const data = await response.json();
      console.log('Data:', data);
  
      if (data.length === 0) {
        setQueryResult("No result is retrieved. Please query again");
      } else {
        setQueryResult(data);
      }
    } catch (error) {
      console.error('Error querying DynamoDB:', error);
      setQueryResult("Failed to retrieve data. Please try again later.");
    }
  };
  
  
  const handleRemoveSubscription = async (title, username) => {
    const apiUrl = `https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/subscription?title=${title}&username=${username}`;
    try {
      const response = await fetch(apiUrl, { method: 'DELETE' });

      if (response.ok) {
        await fetchSubscriptions(); 
      } else {
        console.error(`Failed to delete subscription: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing subscription:', error);
    }
  };
  const renderSubscriptions = () => {
    const validSubscriptions = subscriptions.filter(sub => sub.username===username);
    return validSubscriptions.map((sub, index) =>(
        <div key={index} style={resultItemStyle}>
          <div style={detailGroupStyle}>
            <div style={imageContainerStyle}>
              {sub.image && <img src={`data:image/jpeg;base64,${sub.image}`} alt={sub.artist} style={imageStyle} />}
            </div>
            <div style={textDetailStyle}>
              <p>Title: {sub.title}</p>
              <p>Artist: {sub.artist}</p>
              <p>Year: {sub.year}</p>
            </div>
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => handleRemoveSubscription(sub.title, sub.username)}>Remove</button>
          </div>
        </div>
      ));
  };

  const handleSubscribe = async (username, title, artist, year, image) => {
    const subscriptionData = {
      username,
      title,
      artist,
      year,
      image
    };

    try {
      const response = await fetch('https://oko2sanpil.execute-api.us-east-1.amazonaws.com/test/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchSubscriptions(); 
    } catch (error) {
      console.error('Error subscribing to music:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Main Page</h1>
      
      <div style={areaStyle}>
        <div style={sectionContainerStyle}>
          <h2 style={sectionTitleStyle}>User</h2>
          <p style={usernameStyle}>{username}</p>
        </div>
      </div>
      
      <div style={areaStyle}>
        <div style={sectionContainerStyle}>
          <h2 style={sectionTitleStyle}>Subscription</h2>
          <div>
            {subscriptions.length > 0 ? (
              renderSubscriptions()
            ) : (
              <p>No subscriptions found.</p>
            )}
          </div>
        </div>
      </div>


      <div style={areaStyle}>
  <div style={sectionContainerStyle}>
    <h2 style={sectionTitleStyle}>Query</h2>
    <div style={queryFormStyle}>
      <input style={inputStyle} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input style={inputStyle} type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" />
      <input style={inputStyle} type="text" value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist" />
      <button style={buttonStyle} onClick={handleQuery}>Query</button>
    </div>
    {queryResult && (
  <div>
    {Array.isArray(queryResult) ? (
      queryResult.map((music, index) => (
        <div key={index} style={resultItemStyle}>
          <div style={detailGroupStyle}>
            <div style={imageContainerStyle}>
              {music.image_data && (
                <img src={`data:image/jpeg;base64,${music.image_data}`} alt={music.artist} style={imageStyle} />
              )}
            </div>
            <div style={textDetailStyle}>
              <p>Title: {music.title}</p>
              <p>Artist: {music.artist}</p>
              <p>Year: {music.year}</p>
            </div>
          </div>
          <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={() => handleSubscribe(username, music.title, music.artist, music.year, music.image_data)}>
        Subscribe
      </button>
          </div>
        </div>
      ))
    ) : (
      <p>{queryResult}</p>
    )}
  </div>
)}

  </div>
</div>
      
      <Link to="/" style={logoutButtonStyle} onClick={() => localStorage.clear()}>Logout</Link>
    </div>
  );
}

export default Main;



const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '800px',
  margin: 'auto',
  marginTop: '20px',
  padding: '20px',
};

const titleStyle = {
  fontSize: '28px',
  color: '#333',
  fontWeight: 'bold',
  marginBottom: '30px',
};

const areaStyle = {
  width: '100%',
  margin: '20px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: '#fff',
};

const sectionContainerStyle = {
  padding: '20px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  color: '#0056b3',
  marginBottom: '15px',
  textAlign: 'center',
};

const usernameStyle = {
  fontSize: '18px',
  fontWeight: '500',
  color: '#4A4A4A',
  marginBottom: '10px',
};

const logoutButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  background: '#FF4757',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
  marginTop: '20px',
};

const queryFormStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const inputStyle = {
  marginRight: '10px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '200px',
};

const buttonStyle = {
    padding: '8px 16px',
    fontSize: '14px',
    background: '#ffffff',  
    color: '#4CAF50',      
    border: '2px solid #4CAF50',  
    borderRadius: '20px',   
    cursor: 'pointer',
    outline: 'none',        
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
    transition: 'all 0.3s ease',  
  };
  
  
const resultItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '10px 0',
    background: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };
  
  const detailGroupStyle = {
    display: 'flex',
    alignItems: 'center', 
  };
  
  const textDetailStyle = {
    margin: '0 12px', 
  };
  
  const imageContainerStyle = {
    marginRight: '20px', 
  };
  
  const imageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover'
  };
  
  const buttonContainerStyle = {
    marginLeft: '20px', 
  };