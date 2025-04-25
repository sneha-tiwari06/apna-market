import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Navigate to login page
  };

  return (
    <div className="header">
      <nav className="nav justify-content-center">
        <ul className="list-inline d-flex gap-3 align-items-center">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li>
            <button className="btn btn-danger btn-sm mt-3" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
