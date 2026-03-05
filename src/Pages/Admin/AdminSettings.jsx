import React, { useState, useEffect } from 'react';
import { initialCmsData } from "../../Data/cms_data";

const AdminSettings = () => {
    const [cmsData, setCmsData] = useState(initialCmsData);

    useEffect(() => {
        const saved = localStorage.getItem('enfono_cms_data');
        if (saved) {
            setCmsData(JSON.parse(saved));
        }
    }, []);

    const handleSaveConfig = () => {
        localStorage.setItem('enfono_cms_data', JSON.stringify(cmsData));
        alert('Global configurations saved successfully!');
    };

    const updateContact = (field, value) => {
        setCmsData({
            ...cmsData,
            contact: { ...cmsData.contact, [field]: value }
        });
    };

    const updateHero = (field, value) => {
        setCmsData({
            ...cmsData,
            hero: { ...cmsData.hero, [field]: value }
        });
    };

    return (
        <div className="admin-settings">
            <div className="admin-header">
                <h1>Global Settings</h1>
                <p>Manage application-wide configurations and contact details.</p>
            </div>

            <div className="admin-content-card">
                <h3>Contact & Support</h3>
                <p className="muted-text">These details map to the footer, top nav, and contact pages.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
                    <div className="admin-form-group">
                        <label>WhatsApp Number</label>
                        <input
                            type="text"
                            value={cmsData.contact.whatsapp}
                            onChange={(e) => updateContact('whatsapp', e.target.value)}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Support Email</label>
                        <input
                            type="text"
                            value={cmsData.contact.email}
                            onChange={(e) => updateContact('email', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="admin-content-card" style={{ marginTop: '24px' }}>
                <h3>Integration Links</h3>
                <p className="muted-text">External booking and scheduling URLs.</p>

                <div className="admin-form-group" style={{ marginTop: '24px' }}>
                    <label>Calendly / Booking URL</label>
                    <input
                        type="text"
                        value={cmsData.hero.booking_url}
                        onChange={(e) => updateHero('booking_url', e.target.value)}
                        placeholder="https://calendly.com/your-link"
                    />
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
                        Connects the "Schedule Demo" and consultation buttons across the site directly to your booking gateway.
                    </p>
                </div>
            </div>

            <button
                className="admin-btn-primary"
                onClick={handleSaveConfig}
                style={{ marginTop: '32px' }}
            >
                <i className="fas fa-save" /> Save Configurations
            </button>
        </div>
    );
};

export default AdminSettings;
