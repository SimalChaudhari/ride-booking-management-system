import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <nav>
                <ul className="menu">
                    <li className="menu-item">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/bookings">Bookings</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/bookings-list">Bookings List</Link>
                    </li>
                    <li className='menu-item'>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
