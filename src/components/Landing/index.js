import React from 'react';
 
const LandingPage = () => (
  <div style={{
                backgroundImage: `url("https://i.pinimg.com/originals/4a/94/26/4a94268541d7a0ed95a8be5138e8a288.jpg")`,
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundSize: 'cover',
                height:'832px',//'100vh',
                margin: 0,
                color:'white',
                backgroundPosition: 'center',
             }}>
      <h1 style={{ fontSize: '3em' }}>Welcome to Admin-Dashboard</h1>
  </div>
);
 
export default LandingPage;