import React from 'react'
import { Link } from "react-router-dom";
import { useUser } from './Context/UserContext';
import './NavBar.css';

function NavBar() {

  const { user, setUser } = useUser();

  //handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <nav className="nav-bar">
      <div>
        <Link to="/">Jobly</Link>
      </div>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/profile">Profile</Link>
            <span>{user.username}</span>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar;
