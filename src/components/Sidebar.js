import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home as HomeIcon, Android as BotIcon, Campaign as BroadcastIcon, Settings as SettingsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import "./CSS/Sidebar.css"
const Sidebar = () => {
    const location = useLocation();  

    
    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex flex-column text-white p-3" style={{ width: '250px', height: '100vh', background: '#1F263E' }}>
            <h4 className="mb-4">CHATBOT</h4>

            <ul className="nav flex-column">
                <li className={`nav-item mb-2 ${isActive('/Dashboard') ? 'active' : ''}`}>
                    <a href="/Dashboard" className="nav-link text-white">
                        <HomeIcon className="me-2 fs-2" /> Dashboard
                    </a>
                </li>
                <li className={`nav-item mb-2 ${isActive('#') ? 'active' : ''}`}>
                    <a href="#" className="nav-link text-white">
                        <BotIcon className="me-2 fs-2" /> My Bots
                    </a>
                </li>
                <li className={`nav-item mb-2 ${isActive('#') ? 'active' : ''}`}>
                    <a href="#" className="nav-link text-white">
                        <BroadcastIcon className="me-2 fs-2" /> Broadcast
                    </a>
                </li>
            </ul>

            <div className="mt-auto">
                <ul className="nav flex-column">
                    <li className={`nav-item mb-2 ${isActive('#') ? 'active' : ''}`}>
                        <a href="#" className="nav-link text-white">
                            <SettingsIcon className="me-2" /> Settings
                        </a>
                    </li>
                    <li className={`nav-item ${isActive('/Logout') ? 'active' : ''}`}>
                        <a href="/" className="nav-link text-white">
                            <LogoutIcon className="me-2" /> Log Out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
