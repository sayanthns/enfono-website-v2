import React, { useState, useEffect } from 'react';
import { initialCmsData } from "../../Data/cms_data";

const AdminCMS = () => {
    const [cmsData, setCmsData] = useState(initialCmsData);
    const [activeTab, setActiveTab] = useState('hero');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('enfono_cms_data');
        if (saved) {
            setCmsData(JSON.parse(saved));
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
        const newList = [...cmsData[section]];
        newList[index] = { ...newList[index], [field]: value };
        setCmsData({ ...cmsData, [section]: newList });
    };

    const addItem = (section, defaultValue) => {
        setCmsData({
            ...cmsData,
            [section]: [...cmsData[section], defaultValue]
        });
    };

    return (
        <div className="admin-cms">
            <div className="admin-header">
                <h1>Home Screen Editor</h1>
                <p>Manage the homepage sections and dynamic content</p>

                <div className="admin-tabs" style={{ display: 'flex', gap: '8px', marginTop: '24px', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
                    {['hero', 'stats', 'clients', 'testimonials', 'work', 'media'].map(tab => (
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

                {activeTab === 'stats' && (
                    <div className="admin-content-card">
                        <h3>Company Stats</h3>
                        <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            {cmsData.stats.map((stat, idx) => (
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
                            {cmsData.client_logos.map((client, idx) => (
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
                            {cmsData.testimonials.map((t, idx) => (
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
                        <h3>Our Work (Success Stories)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {cmsData.success_stories.map((s, idx) => (
                                <div key={idx} style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '13px', opacity: 0.6 }}>Project Title</label>
                                        <input
                                            type="text"
                                            value={s.title}
                                            onChange={(e) => updateItem('success_stories', idx, 'title', e.target.value)}
                                            style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ fontSize: '13px', opacity: 0.6 }}>Brief Description</label>
                                        <textarea
                                            value={s.desc}
                                            onChange={(e) => updateItem('success_stories', idx, 'desc', e.target.value)}
                                            style={{ width: '100%', minHeight: '60px', padding: '12px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Meta / Category</label>
                                            <input
                                                type="text"
                                                value={s.meta}
                                                onChange={(e) => updateItem('success_stories', idx, 'meta', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '13px', opacity: 0.6 }}>Result achieved</label>
                                            <input
                                                type="text"
                                                value={s.result}
                                                onChange={(e) => updateItem('success_stories', idx, 'result', e.target.value)}
                                                style={{ width: '100%', padding: '10px', background: '#0f172afff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSave} className="admin-btn-primary" style={{ marginTop: '24px' }}>Save All Work</button>
                    </div>
                )}

                {activeTab === 'media' && (
                    <div className="admin-content-card">
                        <h3>Media & Events</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {cmsData.media_events.map((ev, idx) => (
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
