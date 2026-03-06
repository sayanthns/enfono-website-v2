import React, { useState, useEffect } from 'react';
import { initialCmsData } from "../../Data/cms_data";

const AdminCMS = () => {
    const [cmsData, setCmsData] = useState(initialCmsData);
    const [activeTab, setActiveTab] = useState('hero');
    const [message, setMessage] = useState('');
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const storedLeads = localStorage.getItem('enfono_leads');
        if (storedLeads) setLeads(JSON.parse(storedLeads));
    }, [activeTab]);

    useEffect(() => {
        const saved = localStorage.getItem('enfono_cms_data');
        if (saved) {
            let parsed = JSON.parse(saved);
            // Merge with initialCmsData to ensure new keys exist
            let merged = { ...initialCmsData, ...parsed };
            let migrated = false;

            // Migrate success_stories to our_work if needed
            if ((!merged.our_work || merged.our_work.length === 0) && merged.success_stories) {
                merged.our_work = merged.success_stories.map(s => ({
                    id: s.id || Math.random(),
                    category: s.meta || 'Manufacturing',
                    country: 'Saudi Arabia',
                    title: s.title,
                    subtitle: s.desc,
                    outcome: s.result,
                    bullets: [],
                    results: []
                }));
                migrated = true;
            }

            if (migrated) {
                localStorage.setItem('enfono_cms_data', JSON.stringify(merged));
            }

            setCmsData(merged);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('enfono_cms_data', JSON.stringify(cmsData));
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all home screen content to defaults? All your current changes will be lost.')) {
            localStorage.removeItem('enfono_cms_data');
            setCmsData(initialCmsData);
            setMessage('Content reset to defaults.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const updateField = (section, field, value) => {
        setCmsData({
            ...cmsData,
            [section]: { ...cmsData[section], [field]: value }
        });
    };

    const updateItem = (section, index, field, value) => {
        const newList = [...(cmsData[section] || [])];
        newList[index] = { ...newList[index], [field]: value };
        setCmsData({ ...cmsData, [section]: newList });
    };

    const addItem = (section, defaultValue) => {
        setCmsData({
            ...cmsData,
            [section]: [...(cmsData[section] || []), defaultValue]
        });
    };

    return (
        <div className="admin-cms">
            <div className="admin-header">
                <h1>Home Screen Editor</h1>
                <p>Manage the homepage sections and dynamic content</p>

                <div className="admin-tabs" style={{ display: 'flex', gap: '8px', marginTop: '24px', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
                    {['hero', 'services_hero', 'ai_cta', 'stats', 'brands', 'careers', 'clients', 'testimonials', 'work', 'media', 'blogs', 'about', 'leads'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '12px 20px',
                                background: 'none',
                                border: 'none',
                                color: activeTab === tab ? '#10B981' : '#64748b',
                                borderBottom: activeTab === tab ? '2px solid #10B981' : 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {message && <div style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '10px 16px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>{message}</div>}
            </div>

            <div className="admin-main-content" style={{ marginTop: '24px' }}>
                {activeTab === 'about' && (
                    <div className="admin-content-card">
                        <h3>About Page Content</h3>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>Manage the team members, journey timeline, and office details.</p>

                        {/* Who We Are */}
                        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Section: Who We Are</h4>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600 }}>Heading</label>
                                <input
                                    type="text"
                                    value={cmsData.about?.who_we_are?.heading || ''}
                                    onChange={(e) => setCmsData({
                                        ...cmsData,
                                        about: {
                                            ...cmsData.about,
                                            who_we_are: { ...cmsData.about.who_we_are, heading: e.target.value }
                                        }
                                    })}
                                    style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', fontWeight: 600 }}>Subtext</label>
                                <textarea
                                    value={cmsData.about?.who_we_are?.subtext || ''}
                                    onChange={(e) => setCmsData({
                                        ...cmsData,
                                        about: {
                                            ...cmsData.about,
                                            who_we_are: { ...cmsData.about.who_we_are, subtext: e.target.value }
                                        }
                                    })}
                                    style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '80px' }}
                                />
                            </div>
                        </div>

                        {/* Team Management */}
                        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Leadership Team</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(cmsData.about?.team || []).map((member, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Name</label>
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) => {
                                                        const newTeam = [...cmsData.about.team];
                                                        newTeam[idx] = { ...newTeam[idx], name: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, team: newTeam } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Role</label>
                                                <input
                                                    type="text"
                                                    value={member.role}
                                                    onChange={(e) => {
                                                        const newTeam = [...cmsData.about.team];
                                                        newTeam[idx] = { ...newTeam[idx], role: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, team: newTeam } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Initials</label>
                                                <input
                                                    type="text"
                                                    value={member.initials}
                                                    onChange={(e) => {
                                                        const newTeam = [...cmsData.about.team];
                                                        newTeam[idx] = { ...newTeam[idx], initials: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, team: newTeam } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Order</label>
                                                <input
                                                    type="number"
                                                    value={member.order}
                                                    onChange={(e) => {
                                                        const newTeam = [...cmsData.about.team];
                                                        newTeam[idx] = { ...newTeam[idx], order: parseInt(e.target.value) || 0 };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, team: newTeam } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newTeam = cmsData.about.team.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, about: { ...cmsData.about, team: newTeam } });
                                            }}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                                        >
                                            Remove Member
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newMember = { id: Date.now(), name: 'New Member', role: 'Position', order: (cmsData.about.team?.length || 0) + 1, initials: 'NM' };
                                        setCmsData({ ...cmsData, about: { ...cmsData.about, team: [...(cmsData.about.team || []), newMember] } });
                                    }}
                                    style={{ padding: '10px', border: '2px dashed #e2e8f0', background: 'none', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add Team Member
                                </button>
                            </div>
                        </div>

                        {/* Journey Management */}
                        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Our Journey Timeline</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(cmsData.about?.journey || []).map((item, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Year</label>
                                                <input
                                                    type="text"
                                                    value={item.year}
                                                    onChange={(e) => {
                                                        const newJouney = [...cmsData.about.journey];
                                                        newJouney[idx] = { ...newJouney[idx], year: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, journey: newJouney } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Title</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newJouney = [...cmsData.about.journey];
                                                        newJouney[idx] = { ...newJouney[idx], title: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, journey: newJouney } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 600 }}>Description</label>
                                            <textarea
                                                value={item.desc}
                                                onChange={(e) => {
                                                    const newJouney = [...cmsData.about.journey];
                                                    newJouney[idx] = { ...newJouney[idx], desc: e.target.value };
                                                    setCmsData({ ...cmsData, about: { ...cmsData.about, journey: newJouney } });
                                                }}
                                                style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', minHeight: '60px' }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newJouney = cmsData.about.journey.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, about: { ...cmsData.about, journey: newJouney } });
                                            }}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newItem = { year: '20XX', title: 'Title', desc: '' };
                                        setCmsData({ ...cmsData, about: { ...cmsData.about, journey: [...(cmsData.about.journey || []), newItem] } });
                                    }}
                                    style={{ padding: '10px', border: '2px dashed #e2e8f0', background: 'none', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add Timeline Item
                                </button>
                            </div>
                        </div>

                        {/* Offices Management */}
                        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Our Offices</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(cmsData.about?.offices || []).map((office, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Country</label>
                                                <input
                                                    type="text"
                                                    value={office.country}
                                                    onChange={(e) => {
                                                        const newOffices = [...cmsData.about.offices];
                                                        newOffices[idx] = { ...newOffices[idx], country: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>City</label>
                                                <input
                                                    type="text"
                                                    value={office.city}
                                                    onChange={(e) => {
                                                        const newOffices = [...cmsData.about.offices];
                                                        newOffices[idx] = { ...newOffices[idx], city: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Flag (Emoji)</label>
                                                <input
                                                    type="text"
                                                    value={office.flag}
                                                    onChange={(e) => {
                                                        const newOffices = [...cmsData.about.offices];
                                                        newOffices[idx] = { ...newOffices[idx], flag: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 600 }}>Address</label>
                                            <textarea
                                                value={office.address}
                                                onChange={(e) => {
                                                    const newOffices = [...cmsData.about.offices];
                                                    newOffices[idx] = { ...newOffices[idx], address: e.target.value };
                                                    setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                }}
                                                style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', minHeight: '60px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Phone</label>
                                                <input
                                                    type="text"
                                                    value={office.phone}
                                                    onChange={(e) => {
                                                        const newOffices = [...cmsData.about.offices];
                                                        newOffices[idx] = { ...newOffices[idx], phone: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '11px', fontWeight: 600 }}>Email</label>
                                                <input
                                                    type="text"
                                                    value={office.email}
                                                    onChange={(e) => {
                                                        const newOffices = [...cmsData.about.offices];
                                                        newOffices[idx] = { ...newOffices[idx], email: e.target.value };
                                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                                    }}
                                                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newOffices = cmsData.about.offices.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, about: { ...cmsData.about, offices: newOffices } });
                                            }}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                                        >
                                            Remove Office
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newOffice = { country: 'Country', city: 'City', flag: '🏳️', address: '', phone: '', email: '', type: 'Main' };
                                        setCmsData({ ...cmsData, about: { ...cmsData.about, offices: [...(cmsData.about.offices || []), newOffice] } });
                                    }}
                                    style={{ padding: '10px', border: '2px dashed #e2e8f0', background: 'none', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add Office
                                </button>
                            </div>
                        </div>

                        <button onClick={handleSave} className="admin-btn-primary">Save About Content</button>
                    </div>
                )}

                {activeTab === 'hero' && (
                    <div className="admin-content-card">
                        <h3>Our Brands & Products</h3>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>Manage proprietary SaaS products. Rename 'CHMS' to 'Fateh ERP' here if not already done.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {(cmsData.brands || []).map((brand, idx) => (
                                <div key={idx} style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Brand Name</label>
                                            <input
                                                type="text"
                                                value={brand.name}
                                                onChange={(e) => updateItem('brands', idx, 'name', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Icon Class (FontAwesome)</label>
                                            <input
                                                type="text"
                                                value={brand.icon}
                                                onChange={(e) => updateItem('brands', idx, 'icon', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Tag Line</label>
                                            <input
                                                type="text"
                                                value={brand.tag}
                                                onChange={(e) => updateItem('brands', idx, 'tag', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Brand Color (HEX)</label>
                                            <input
                                                type="text"
                                                value={brand.color}
                                                onChange={(e) => updateItem('brands', idx, 'color', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 600 }}>Headline</label>
                                        <input
                                            type="text"
                                            value={brand.headline}
                                            onChange={(e) => updateItem('brands', idx, 'headline', e.target.value)}
                                            style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 600 }}>Description</label>
                                        <textarea
                                            value={brand.desc}
                                            onChange={(e) => updateItem('brands', idx, 'desc', e.target.value)}
                                            style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', minHeight: '80px' }}
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newList = cmsData.brands.filter((_, i) => i !== idx);
                                            setCmsData({ ...cmsData, brands: newList });
                                        }}
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        Remove Brand
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addItem('brands', { name: 'New Brand', icon: 'fas fa-cube', tag: 'Product Tag', headline: 'Brand Headline', desc: 'Short description', color: '#10B981', features: [], status: 'Available', link: '#' })}
                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                            >
                                + Add New Brand
                            </button>
                        </div>
                        <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Brands</button>
                    </div>
                )}

                {activeTab === 'careers' && (
                    <div className="admin-content-card">
                        <h3>Careers & Job Openings</h3>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
                            Post new roles and update 'Apply Now' links.
                            <br />
                            <strong style={{ color: '#10B981' }}>Tip:</strong> Use <code>/contact</code> for the default form, or an external URL (e.g., LinkedIn/Indeed) starting with <code>https://</code>.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {(cmsData.careers || []).map((job, idx) => (
                                <div key={idx} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Job Title</label>
                                            <input
                                                type="text"
                                                value={job.title}
                                                onChange={(e) => updateItem('careers', idx, 'title', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Department</label>
                                            <select
                                                value={job.dept}
                                                onChange={(e) => updateItem('careers', idx, 'dept', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            >
                                                <option value="Engineering">Engineering</option>
                                                <option value="Consulting">Consulting</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Operations">Operations</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Customer Success">Customer Success</option>
                                                <option value="Finance">Finance</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Location</label>
                                            <input
                                                type="text"
                                                value={job.location}
                                                onChange={(e) => updateItem('careers', idx, 'location', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600 }}>Employment Type</label>
                                            <input
                                                type="text"
                                                value={job.type}
                                                onChange={(e) => updateItem('careers', idx, 'type', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '12px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 600 }}>Apply Now URL</label>
                                        <input
                                            type="text"
                                            value={job.apply_url}
                                            onChange={(e) => updateItem('careers', idx, 'apply_url', e.target.value)}
                                            style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            placeholder="/contact or external URL"
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 600 }}>Description</label>
                                        <textarea
                                            value={job.desc}
                                            onChange={(e) => updateItem('careers', idx, 'desc', e.target.value)}
                                            style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', minHeight: '60px' }}
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newList = cmsData.careers.filter((_, i) => i !== idx);
                                            setCmsData({ ...cmsData, careers: newList });
                                        }}
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        Delete Opening
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addItem('careers', { id: Date.now(), title: 'New Role', dept: 'Engineering', location: 'Remote', type: 'Full-time', desc: '', apply_url: '/contact' })}
                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                            >
                                + Add New Job Opening
                            </button>
                        </div>
                        <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Careers</button>
                    </div>
                )}

                <div className="admin-main-content" style={{ marginTop: '24px' }}>
                    {activeTab === 'hero' && (
                        <div className="admin-content-card">
                            <h3>Hero Section</h3>
                            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                                <label>Hero Heading</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                    value={cmsData.hero.heading}
                                    onChange={(e) => updateField('hero', 'heading', e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Hero Subtext</label>
                                <textarea
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', minHeight: '100px' }}
                                    value={cmsData.hero.subtext}
                                    onChange={(e) => updateField('hero', 'subtext', e.target.value)}
                                />
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '16px' }}>Save Hero</button>
                        </div>
                    )}

                    {activeTab === 'services_hero' && (
                        <div className="admin-content-card">
                            <h3>Services Page Hero</h3>
                            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                                <label>Services Heading</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                    value={cmsData.services_hero?.heading || ''}
                                    onChange={(e) => updateField('services_hero', 'heading', e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                                <label>Services Subtext</label>
                                <textarea
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', minHeight: '100px' }}
                                    value={cmsData.services_hero?.subtext || ''}
                                    onChange={(e) => updateField('services_hero', 'subtext', e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="admin-form-group">
                                    <label>Button Text</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.services_hero?.cta_primary || ''}
                                        onChange={(e) => updateField('services_hero', 'cta_primary', e.target.value)}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Button URL</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.services_hero?.cta_url || ''}
                                        onChange={(e) => updateField('services_hero', 'cta_url', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '16px' }}>Save Services Hero</button>
                        </div>
                    )}

                    {activeTab === 'ai_cta' && (
                        <div className="admin-content-card">
                            <h3>AI Page CTA Section</h3>
                            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                                <label>CTA Heading</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                    value={cmsData.ai_cta?.heading || ''}
                                    onChange={(e) => updateField('ai_cta', 'heading', e.target.value)}
                                />
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                                <label>CTA Subtext</label>
                                <textarea
                                    style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', minHeight: '100px' }}
                                    value={cmsData.ai_cta?.subtext || ''}
                                    onChange={(e) => updateField('ai_cta', 'subtext', e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div className="admin-form-group">
                                    <label>Primary Button Text</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.ai_cta?.btn_primary_txt || ''}
                                        onChange={(e) => updateField('ai_cta', 'btn_primary_txt', e.target.value)}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Primary Button URL</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.ai_cta?.btn_primary_url || ''}
                                        onChange={(e) => updateField('ai_cta', 'btn_primary_url', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="admin-form-group">
                                    <label>Secondary Button Text</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.ai_cta?.btn_secondary_txt || ''}
                                        onChange={(e) => updateField('ai_cta', 'btn_secondary_txt', e.target.value)}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Secondary Button URL</label>
                                    <input
                                        type="text"
                                        style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        value={cmsData.ai_cta?.btn_secondary_url || ''}
                                        onChange={(e) => updateField('ai_cta', 'btn_secondary_url', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save AI CTA</button>
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="admin-content-card">
                            <h3>Company Stats</h3>
                            <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                {(cmsData.stats || []).map((stat, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ marginBottom: '10px' }}>
                                            <label style={{ fontSize: '12px', opacity: 0.6 }}>Label (e.g. Projects Delivered)</label>
                                            <input
                                                type="text"
                                                style={{ width: '100%', padding: '8px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#0f172a' }}
                                                value={stat.label}
                                                onChange={(e) => updateItem('stats', idx, 'label', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', opacity: 0.6 }}>Value (e.g. 120)</label>
                                            <input
                                                type="text"
                                                style={{ width: '100%', padding: '8px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#0f172a' }}
                                                value={stat.value}
                                                onChange={(e) => updateItem('stats', idx, 'value', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '16px' }}>Save Stats</button>
                        </div>
                    )}

                    {activeTab === 'clients' && (
                        <div className="admin-content-card">
                            <h3>Client Scrolling Section</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {(cmsData.client_logos || []).map((client, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <input
                                            type="text"
                                            value={client.name}
                                            onChange={(e) => updateItem('client_logos', idx, 'name', e.target.value)}
                                            style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        />
                                        <button
                                            onClick={() => {
                                                const newList = cmsData.client_logos.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, client_logos: newList });
                                            }}
                                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-trash" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('client_logos', { name: 'New Client' })}
                                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add New Client
                                </button>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Clients</button>
                        </div>
                    )}

                    {activeTab === 'testimonials' && (
                        <div className="admin-content-card">
                            <h3>Testimonials</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {(cmsData.testimonials || []).map((t, idx) => (
                                    <div key={idx} style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Quote</label>
                                            <textarea
                                                value={t.quote}
                                                onChange={(e) => updateItem('testimonials', idx, 'quote', e.target.value)}
                                                style={{ width: '100%', minHeight: '80px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Author Name</label>
                                                <input
                                                    type="text"
                                                    value={t.name}
                                                    onChange={(e) => updateItem('testimonials', idx, 'name', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Role / Position</label>
                                                <input
                                                    type="text"
                                                    value={t.role}
                                                    onChange={(e) => updateItem('testimonials', idx, 'role', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newList = cmsData.testimonials.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, testimonials: newList });
                                            }}
                                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '16px', fontSize: '13px' }}
                                        >
                                            Remove Testimonial
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('testimonials', { quote: '', name: '', role: '', initials: 'NEW' })}
                                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add Testimonial
                                </button>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Testimonials</button>
                        </div>
                    )}

                    {activeTab === 'work' && (
                        <div className="admin-content-card">
                            <h3>Portfolio (Our Work)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {(cmsData.our_work || []).map((w, idx) => (
                                    <div key={idx} style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Project Title</label>
                                                <input
                                                    type="text"
                                                    value={w.title}
                                                    onChange={(e) => updateItem('our_work', idx, 'title', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Category</label>
                                                <select
                                                    value={w.category}
                                                    onChange={(e) => updateItem('our_work', idx, 'category', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', appearance: 'none' }}
                                                >
                                                    {(cmsData.our_work_categories || []).map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Country Name</label>
                                                <input
                                                    type="text"
                                                    value={w.country || ''}
                                                    onChange={(e) => updateItem('our_work', idx, 'country', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Country Flag (Emoji)</label>
                                                <input
                                                    type="text"
                                                    value={w.flag || ''}
                                                    onChange={(e) => updateItem('our_work', idx, 'flag', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Subtitle / Short Description</label>
                                            <textarea
                                                value={w.subtitle || ''}
                                                onChange={(e) => updateItem('our_work', idx, 'subtitle', e.target.value)}
                                                style={{ width: '100%', minHeight: '60px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Short Metric (e.g., '25 branches connected' for the pill badge)</label>
                                            <input
                                                type="text"
                                                value={w.metric || ''}
                                                onChange={(e) => updateItem('our_work', idx, 'metric', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Outcome / Results Text (Alternative to Key Results metrics)</label>
                                            <textarea
                                                value={w.outcome || ''}
                                                onChange={(e) => updateItem('our_work', idx, 'outcome', e.target.value)}
                                                style={{ width: '100%', minHeight: '60px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Bullet Points (One per line)</label>
                                            <textarea
                                                value={w.bullets ? w.bullets.join('\n') : ''}
                                                onChange={(e) => updateItem('our_work', idx, 'bullets', e.target.value.split('\n').filter(Boolean))}
                                                style={{ width: '100%', minHeight: '80px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                placeholder="Point 1&#10;Point 2&#10;Point 3"
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Cover Image URL / Path</label>
                                                <input
                                                    type="text"
                                                    value={w.image || ''}
                                                    onChange={(e) => updateItem('our_work', idx, 'image', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                    placeholder="/assets/img/work1.jpg"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Client Logo URL</label>
                                                <input
                                                    type="text"
                                                    value={w.logo || ''}
                                                    onChange={(e) => updateItem('our_work', idx, 'logo', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                    placeholder="/assets/img/logo.png"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>External Link URL</label>
                                                <input
                                                    type="text"
                                                    value={w.url || ''}
                                                    onChange={(e) => updateItem('our_work', idx, 'url', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                const newList = cmsData.our_work.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, our_work: newList });
                                            }}
                                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '16px', fontSize: '13px' }}
                                        >
                                            Remove Project
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('our_work', { id: Date.now(), category: 'Manufacturing', country: 'Saudi Arabia', flag: '🇸🇦', title: 'New Project', subtitle: '', outcome: '', metric: '', bullets: [], image: '', logo: '', url: '' })}
                                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add Project
                                </button>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Work</button>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="admin-content-card">
                            <h3>Media & Events</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {(cmsData.media_events || []).map((ev, idx) => (
                                    <div key={idx} style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Event Title</label>
                                                <input
                                                    type="text"
                                                    value={ev.title}
                                                    onChange={(e) => updateItem('media_events', idx, 'title', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Date (e.g. 15 SEP)</label>
                                                <input
                                                    type="text"
                                                    value={ev.date}
                                                    onChange={(e) => updateItem('media_events', idx, 'date', e.target.value)}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Image URL</label>
                                            <input
                                                type="text"
                                                value={ev.image}
                                                onChange={(e) => updateItem('media_events', idx, 'image', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                placeholder="/assets/img/..."
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Tag 1 (e.g. Jeddah, KSA)</label>
                                                <input
                                                    type="text"
                                                    value={ev.tags?.[0]?.text || ''}
                                                    onChange={(e) => {
                                                        const newTags = [...(ev.tags || [])];
                                                        newTags[0] = { text: e.target.value, icon: 'fas fa-map-marker-alt' };
                                                        updateItem('media_events', idx, 'tags', newTags);
                                                    }}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '13px', opacity: 0.6 }}>Tag 2 (e.g. Summit)</label>
                                                <input
                                                    type="text"
                                                    value={ev.tags?.[1]?.text || ''}
                                                    onChange={(e) => {
                                                        const newTags = [...(ev.tags || [])];
                                                        if (!newTags[0]) newTags[0] = { text: '', icon: 'fas fa-map-marker-alt' };
                                                        newTags[1] = { text: e.target.value, icon: 'fas fa-tag' };
                                                        updateItem('media_events', idx, 'tags', newTags);
                                                    }}
                                                    style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Short Description</label>
                                            <textarea
                                                value={ev.desc}
                                                onChange={(e) => updateItem('media_events', idx, 'desc', e.target.value)}
                                                style={{ width: '100%', minHeight: '60px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                            <div style={{ padding: '12px', background: '#0f172afff', borderRadius: '8px' }}>
                                                <label style={{ fontSize: '12px', opacity: 0.5 }}>Button 1</label>
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={ev.buttons?.[0]?.label || ''}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        newBtns[0] = { ...newBtns[0], label: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a', marginBottom: '8px' }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL"
                                                    value={ev.buttons?.[0]?.url || ''}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        newBtns[0] = { ...newBtns[0], url: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a' }}
                                                />
                                                <select
                                                    value={ev.buttons?.[0]?.type || 'youtube'}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        newBtns[0] = { ...newBtns[0], type: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a', marginTop: '8px' }}
                                                >
                                                    <option value="youtube">YouTube</option>
                                                    <option value="instagram">Instagram</option>
                                                    <option value="disabled">Disabled/Gallery</option>
                                                </select>
                                            </div>
                                            <div style={{ padding: '12px', background: '#0f172afff', borderRadius: '8px' }}>
                                                <label style={{ fontSize: '12px', opacity: 0.5 }}>Button 2</label>
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={ev.buttons?.[1]?.label || ''}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        if (!newBtns[0]) newBtns[0] = { label: '', url: '', type: 'youtube' };
                                                        newBtns[1] = { ...newBtns[1], label: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a', marginBottom: '8px' }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL"
                                                    value={ev.buttons?.[1]?.url || ''}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        if (!newBtns[0]) newBtns[0] = { label: '', url: '', type: 'youtube' };
                                                        newBtns[1] = { ...newBtns[1], url: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a' }}
                                                />
                                                <select
                                                    value={ev.buttons?.[1]?.type || 'instagram'}
                                                    onChange={(e) => {
                                                        const newBtns = [...(ev.buttons || [])];
                                                        if (!newBtns[0]) newBtns[0] = { label: '', url: '', type: 'youtube' };
                                                        newBtns[1] = { ...newBtns[1], type: e.target.value };
                                                        updateItem('media_events', idx, 'buttons', newBtns);
                                                    }}
                                                    style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a', marginTop: '8px' }}
                                                >
                                                    <option value="youtube">YouTube</option>
                                                    <option value="instagram">Instagram</option>
                                                    <option value="disabled">Disabled/Gallery</option>
                                                </select>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                const newList = cmsData.media_events.filter((_, i) => i !== idx);
                                                setCmsData({ ...cmsData, media_events: newList });
                                            }}
                                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '16px', fontSize: '13px' }}
                                        >
                                            Remove Event
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem('media_events', {
                                        title: 'New Event',
                                        date: '01 JAN',
                                        desc: '',
                                        image: '/assets/img/blog-img7.jpg',
                                        tags: [{ text: 'Tag 1', icon: 'fas fa-map-marker-alt' }],
                                        buttons: [{ label: 'Read More', url: '#', type: 'youtube' }]
                                    })}
                                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    + Add New Event
                                </button>
                            </div>
                            <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Media</button>
                        </div>
                    )}

                    {activeTab === 'blogs' && (
                        <div className="admin-content-card">
                            <h3>Blog Posts</h3>
                            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>Manage blog articles. Changes are saved when you click "Save All Blogs".</p>

                            {(cmsData.blogs || []).map((blog, idx) => (
                                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '20px', background: '#f8fafc' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#10B981', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>#{idx + 1}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{blog.title || 'Untitled'}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={blog.published !== false}
                                                    onChange={(e) => updateItem('blogs', idx, 'published', e.target.checked)}
                                                />
                                                Published
                                            </label>
                                            <button
                                                onClick={() => {
                                                    const newList = cmsData.blogs.filter((_, i) => i !== idx);
                                                    setCmsData({ ...cmsData, blogs: newList });
                                                }}
                                                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Title</label>
                                            <input
                                                type="text"
                                                value={blog.title || ''}
                                                onChange={(e) => updateItem('blogs', idx, 'title', e.target.value)}
                                                style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Category</label>
                                            <select
                                                value={blog.category || 'ERP'}
                                                onChange={(e) => updateItem('blogs', idx, 'category', e.target.value)}
                                                style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#0f172a' }}
                                            >
                                                {['AI & ERP', 'ERP', 'AI & Analytics', 'Compliance', 'Automation', 'Case Study'].map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Slug (URL)</label>
                                            <input
                                                type="text"
                                                value={blog.slug || ''}
                                                onChange={(e) => updateItem('blogs', idx, 'slug', e.target.value)}
                                                style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Date</label>
                                            <input
                                                type="text"
                                                value={blog.date || ''}
                                                onChange={(e) => updateItem('blogs', idx, 'date', e.target.value)}
                                                style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#0f172a' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Excerpt (shown in blog listing)</label>
                                        <textarea
                                            value={blog.excerpt || ''}
                                            onChange={(e) => updateItem('blogs', idx, 'excerpt', e.target.value)}
                                            rows={3}
                                            style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '13px', color: '#0f172a', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Content (HTML)</label>
                                        <textarea
                                            value={blog.content || ''}
                                            onChange={(e) => updateItem('blogs', idx, 'content', e.target.value)}
                                            rows={8}
                                            style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', fontSize: '12px', fontFamily: 'monospace', color: '#0f172a', resize: 'vertical' }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => addItem('blogs', {
                                    id: Date.now(),
                                    slug: 'new-blog-post-' + Date.now(),
                                    title: 'New Blog Post',
                                    category: 'ERP',
                                    tags: [],
                                    read_time: '5 min read',
                                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                                    featured: false,
                                    published: true,
                                    excerpt: '',
                                    cover_image: '/assets/img/Frappeverse-1.jpg',
                                    content: '<p>Start writing your blog post here...</p>'
                                })}
                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%', marginBottom: '16px' }}
                            >
                                + Add New Blog Post
                            </button>

                            <button onClick={handleSave} className="admin-btn-primary">Save All Blogs</button>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div className="admin-content-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div>
                                    <h3>Contact Form Leads</h3>
                                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>View and manage business consultations and inquiries.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to clear all leads?')) {
                                            localStorage.removeItem('enfono_leads');
                                            setLeads([]);
                                        }
                                    }}
                                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                                >
                                    Clear All Leads
                                </button>
                            </div>

                            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Date</th>
                                            <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Name / Company</th>
                                            <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Service</th>
                                            <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Contact Info</th>
                                            <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600 }}>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.length > 0 ? leads.map((lead, i) => (
                                            <tr key={lead.id || i} style={{ borderBottom: i === leads.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '16px', whiteSpace: 'nowrap', color: '#64748b' }}>{lead.date}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{lead.name}</div>
                                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{lead.company}</div>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 10px', background: '#ecfdf5', color: '#10b981', borderRadius: '100px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        {lead.service}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{lead.email}</div>
                                                    <div style={{ color: '#64748b', fontSize: '11px' }}>{lead.phone}</div>
                                                </td>
                                                <td style={{ padding: '16px', maxWidth: '300px' }}>
                                                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{lead.message}</div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                                    <div style={{ fontSize: '24px', marginBottom: '12px' }}><i className="fas fa-inbox" /></div>
                                                    <div>No inquiry leads collected yet.</div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="admin-footer" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', opacity: 0.4 }}>Enfono Website CMS v2.0</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleReset} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', opacity: 0.6 }}>Reset to factory settings</button>
                    <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontSize: '13px', textDecoration: 'none' }}>Visit Website <i className="fas fa-external-link-alt" /></a>
                </div>
            </div>
        </div>
    );
};

export default AdminCMS;
