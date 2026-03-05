import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        // For now, just redirect
        navigate('/admin/login');
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="admin-sidebar-header">
                    <img src="/assets/img/enfono-logo.png" alt="Enfono" className="admin-logo" />
                    {!isSidebarCollapsed && <span className="admin-badge">Admin V2</span>}
                </div>

                <nav className="admin-nav">
                    <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <i className="fas fa-chart-line" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <i className="fas fa-cog" />
                        <span>Settings</span>
                    </NavLink>
                    <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <i className="fas fa-home" />
                        <span>Home</span>
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <i className="fas fa-sign-out-alt" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`admin-main ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <div className="admin-top-bar">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <i className="fas fa-bars" />
                    </button>
                    <div className="admin-profile-badge">
                        <div className="status-dot" /> Admin
                    </div>
                </div>
                <div className="admin-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
