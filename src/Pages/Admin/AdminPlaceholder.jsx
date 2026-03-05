import React from 'react';

const AdminPlaceholder = ({ title, icon }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <i className={icon} style={{ fontSize: '32px', color: '#64748b' }} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{title}</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>This module will be available in a future update.</p>
        </div>
    );
};

export const AdminLeads = () => <AdminPlaceholder title="Leads Management" icon="fas fa-envelope-open-text" />;
export const AdminTestimonials = () => <AdminPlaceholder title="Testimonials" icon="fas fa-star" />;
export const AdminTrash = () => <AdminPlaceholder title="Trash Bin" icon="fas fa-trash-alt" />;
export const AdminUsers = () => <AdminPlaceholder title="User Management" icon="fas fa-users-cog" />;
