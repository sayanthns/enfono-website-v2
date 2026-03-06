import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';

const navGroups = [
    {
        label: 'Content',
        items: [
            { tab: 'leads', icon: 'fas fa-inbox', label: 'Leads' },
            { tab: 'blogs', icon: 'fas fa-rss', label: 'Blog Posts' },
            { tab: 'media', icon: 'fas fa-photo-video', label: 'Media & Events' },
            { tab: 'work', icon: 'fas fa-briefcase', label: 'Our Work' },
            { tab: 'about', icon: 'fas fa-building', label: 'About Page' },
        ]
    },
    {
        label: 'Site Settings',
        items: [
            { tab: 'hero', icon: 'fas fa-home', label: 'Hero Section' },
            { tab: 'services_hero', icon: 'fas fa-cogs', label: 'Services Hero' },
            { tab: 'ai_cta', icon: 'fas fa-robot', label: 'AI Page CTA' },
            { tab: 'stats', icon: 'fas fa-chart-bar', label: 'Stats' },
            { tab: 'brands', icon: 'fas fa-cube', label: 'Products' },
            { tab: 'careers', icon: 'fas fa-users', label: 'Careers' },
            { tab: 'clients', icon: 'fas fa-handshake', label: 'Clients' },
            { tab: 'testimonials', icon: 'fas fa-quote-right', label: 'Testimonials' },
        ]
    },
    {
        label: 'Global Settings',
        items: [
            { tab: 'chatbot', icon: 'fas fa-comment-dots', label: 'AI Chatbot' },
            { tab: 'file_manager', icon: 'fas fa-folder-open', label: 'File Manager' },
            { tab: 'backup', icon: 'fas fa-download', label: 'Backup & Restore' },
        ]
    }
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const currentTab = new URLSearchParams(location.search).get('tab') || 'leads';

    const handleLogout = () => {
        localStorage.removeItem('enfono_admin_session');
        localStorage.removeItem('enfono_mfa_verified');
        navigate('/admin/login');
    };

    const handleTabClick = (tab) => {
        navigate(`/admin/content?tab=${tab}`);
    };

    const isContentPage = location.pathname.includes('/admin/content');

    const navItemStyle = (active) => ({
        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
        padding: '9px 12px', background: active ? 'rgba(16,185,129,0.12)' : 'none',
        border: active ? '1px solid rgba(16,185,129,0.25)' : '1px solid transparent',
        borderRadius: '8px', color: active ? '#10B981' : '#94a3b8',
        cursor: 'pointer', fontWeight: active ? 700 : 400, fontSize: '13px',
        textAlign: 'left', transition: 'all 0.15s', textDecoration: 'none'
    });

    const groupLabelStyle = {
        padding: '4px 12px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '1.2px', color: '#64748b', marginTop: '16px', marginBottom: '4px'
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
                style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div className="admin-sidebar-header">
                    <img src="/assets/img/enfono-logo.png" alt="Enfono" className="admin-logo" />
                    {!isSidebarCollapsed && <span className="admin-badge">Admin V2</span>}
                </div>

                <nav className="admin-nav" style={{ flex: 1, overflowY: 'auto' }}>
                    {/* Top-level routes */}
                    <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <i className="fas fa-chart-line" />
                        {!isSidebarCollapsed && <span>Dashboard</span>}
                    </NavLink>

                    {/* CMS Groups — only show when not collapsed */}
                    {!isSidebarCollapsed && navGroups.map(group => (
                        <div key={group.label}>
                            <div style={groupLabelStyle}>{group.label}</div>
                            {group.items.map(item => (
                                <button
                                    key={item.tab}
                                    onClick={() => handleTabClick(item.tab)}
                                    style={navItemStyle(isContentPage && currentTab === item.tab)}
                                >
                                    <i className={item.icon} style={{ width: '15px', textAlign: 'center', fontSize: '12px' }} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    ))}

                    {/* Collapsed state: just icon buttons */}
                    {isSidebarCollapsed && navGroups.flatMap(g => g.items).map(item => (
                        <button
                            key={item.tab}
                            onClick={() => handleTabClick(item.tab)}
                            title={item.label}
                            style={{ ...navItemStyle(isContentPage && currentTab === item.tab), justifyContent: 'center' }}
                        >
                            <i className={item.icon} style={{ fontSize: '14px' }} />
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <a href="/" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px' }}
                        title="View Website">
                        <i className="fas fa-external-link-alt" />
                        {!isSidebarCollapsed && <span>View Website</span>}
                    </a>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <i className="fas fa-sign-out-alt" />
                        {!isSidebarCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`admin-main ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <div className="admin-top-bar">
                    <button className="sidebar-toggle" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
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
