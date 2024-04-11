import React from 'react'
import { Link } from "react-router-dom";
import { useUser } from './Context/UserContext';
import './Home.css';

function Home() {

  const { user } = useUser();

  return (
      <div className="home-container">
      <h1>Welcome to React Jobly</h1>
      <p>All the jobs in one convenient place.</p>
      {!user ? (
        <div className="home-actions">
          <Link to="/login"><button className="home-button">Log in</button></Link>
          <Link to="/signup"><button className="home-button">Sign up</button></Link>
        </div>
      ) : (
        <h2>Welcome back, {user.username}!</h2>
      )}
    </div>
  )
}

export default Home;
