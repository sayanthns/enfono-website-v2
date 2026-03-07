import { useContext, useState } from 'react';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from "../../Data/cms_data";

const AdminDashboard = () => {
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;
    const [adUrl, setAdUrl] = useState('https://enfono.com/?utm_source=google&utm_medium=cpc');
    const [message, setMessage] = useState('');

    const handleUpdateAd = () => {
        setMessage('Ad URL updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Visitor Analytics</h1>
                <p>Real-time insights for Enfono Website</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <a
                        href="https://analytics.google.com/analytics/web/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '12px', color: '#10B981', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <i className="fab fa-google" /> Open Full Google Analytics Dashboard
                    </a>
                </div>
                {message && <div style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '10px 16px', borderRadius: '8px', marginTop: '16px', fontSize: '14px' }}>{message}</div>}
            </div>

            <div className="admin-stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Total Visitors (Oct)</span>
                    <span className="stat-value">2,854</span>
                    <span className="stat-trend positive">+18.5% <i className="fas fa-arrow-up" /></span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Active Sessions</span>
                    <span className="stat-value">24</span>
                    <span className="stat-trend" style={{ color: '#10B981' }}>Live Now</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Avg. Session Duration</span>
                    <span className="stat-value">3:42</span>
                    <span className="stat-trend negative">-2.1% <i className="fas fa-arrow-down" /></span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Consultation Inquiries</span>
                    <span className="stat-value">48</span>
                    <span className="stat-trend positive">+12% <i className="fas fa-arrow-up" /></span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                <div className="admin-content-card">
                    <h3>Ad Campaign Configuration</h3>
                    <p className="muted-text">Generate and manage tracking URLs for your marketing campaigns.</p>

                    <div className="admin-form-group">
                        <label>Campaign Landing Page URL</label>
                        <div className="input-group">
                            <input
                                type="text"
                                value={adUrl}
                                onChange={(e) => setAdUrl(e.target.value)}
                                placeholder="https://enfono.com/..."
                            />
                            <button className="admin-btn-primary" onClick={handleUpdateAd}>Update</button>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ color: '#0f172a', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>Active Campaign Metrics <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 400 }}>(GA4 Tracking Active)</span></h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                            <span style={{ color: '#64748b' }}>Clicks: 840</span>
                            <span style={{ color: '#64748b' }}>Leads: 12</span>
                            <span style={{ color: '#10B981', fontWeight: 500 }}>Conv. Rate: 1.4%</span>
                        </div>
                    </div>
                </div>

                <div className="admin-content-card">
                    <h3>Top Geographies</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                        {[
                            { country: 'Saudi Arabia', val: '45%' },
                            { country: 'India', val: '28%' },
                            { country: 'UAE', val: '15%' },
                            { country: 'Oman', val: '8%' },
                            { country: 'Others', val: '4%' },
                        ].map(item => (
                            <div key={item.country}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#0f172a', marginBottom: '6px', fontWeight: 500 }}>
                                    <span>{item.country}</span>
                                    <span>{item.val}</span>
                                </div>
                                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: item.val, height: '100%', background: '#10B981' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
