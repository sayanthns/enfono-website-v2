import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from "../../Data/cms_data";

const AdminCMS = () => {
    const { cmsData: globalCmsData, setCmsData: setGlobalCmsData } = useContext(GlobalContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'leads';
    const setActiveTab = (tab) => setSearchParams({ tab });

    const [cmsData, setCmsData] = useState(globalCmsData || initialCmsData);
    const [message, setMessage] = useState('');
    const [leads, setLeads] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [chatbotTraining, setChatbotTraining] = useState('');

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:8007' : '/api';

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await fetch(`${API_URL}/api/leads`);
                const data = await res.json();
                setLeads(data);
            } catch (err) { console.error("Error fetching leads:", err); }
        };
        const fetchMedia = async () => {
            try {
                const res = await fetch(`${API_URL}/api/cms/enfono_media_files`);
                if (res.ok) {
                    const data = await res.json();
                    setMediaFiles(Array.isArray(data) ? data : []);
                }
            } catch (err) { console.error("Error fetching media:", err); }
        };
        fetchLeads();
        fetchMedia();
    }, [activeTab]);

    // Active label derived from tab param
    const tabLabels = {
        leads: 'Leads', blogs: 'Blog Posts', media: 'Media & Events', work: 'Our Work', about: 'About Page',
        hero: 'Hero Section', services_hero: 'Services Hero', ai_cta: 'AI Page CTA', stats: 'Stats',
        brands: 'Products', careers: 'Careers', clients: 'Clients', testimonials: 'Testimonials',
        chatbot: 'AI Chatbot', file_manager: 'File Manager', backup: 'Backup & Restore'
    };
    const activeLabel = tabLabels[activeTab] || activeTab;

    useEffect(() => {
        const fetchCmsData = async () => {
            try {
                const res = await fetch(`${API_URL}/api/cms/enfono_cms_data`);
                if (res.ok) {
                    const data = await res.json();
                    setCmsData({ ...initialCmsData, ...data });
                }
            } catch (err) { console.error("Error fetching CMS:", err); }
        };
        fetchCmsData();
    }, []);

    const handleSave = async () => {
        try {
            const res = await fetch(`${API_URL}/api/cms/enfono_cms_data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cmsData)
            });
            if (res.ok) {
                setGlobalCmsData(cmsData);
                setMessage('Changes saved successfully to database!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Error saving to server!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            setMessage('Error saving to server!');
            setTimeout(() => setMessage(''), 3000);
        }
        // Auto Cloud Backup via webhook
        const webhookUrl = localStorage.getItem('enfono_backup_webhook');
        if (webhookUrl) {
            const backup = {};
            for (let key of ['enfono_cms_data', 'enfono_leads', 'enfono_media_files', 'enfono_chatbot_training', 'enfono_chatbot_api_key', 'enfono_chatbot_provider']) {
                const val = localStorage.getItem(key);
                if (val) backup[key] = val;
            }
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp: new Date().toISOString(), backup })
            }).catch(() => { }); // Silent fail – webhook is best-effort
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all home screen content to defaults? All your current changes will be lost.')) {
            localStorage.removeItem('enfono_cms_data');
            setCmsData(initialCmsData);
            setMessage('Content reset to defaults.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleExport = () => {
        const backup = {};
        for (let key of ['enfono_cms_data', 'enfono_leads', 'enfono_media_files', 'enfono_chatbot_training', 'enfono_chatbot_api_key', 'enfono_chatbot_provider']) {
            const val = localStorage.getItem(key);
            if (val) backup[key] = val;
        }
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'enfono_backup_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        setMessage('Backup exported successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const backup = JSON.parse(ev.target.result);
                Object.keys(backup).forEach(key => localStorage.setItem(key, backup[key]));
                if (backup.enfono_cms_data) setCmsData(JSON.parse(backup.enfono_cms_data));
                if (backup.enfono_leads) setLeads(JSON.parse(backup.enfono_leads));
                if (backup.enfono_media_files) setMediaFiles(JSON.parse(backup.enfono_media_files));
                if (backup.enfono_chatbot_training) setChatbotTraining(backup.enfono_chatbot_training);
                setMessage('Backup restored successfully! Please refresh the page.');
                setTimeout(() => setMessage(''), 5000);
            } catch {
                setMessage('Error: Invalid backup file.');
                setTimeout(() => setMessage(''), 3000);
            }
        };
        reader.readAsText(file);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const newFile = { id: Date.now(), name: file.name, type: file.type, url: ev.target.result };
            const updated = [newFile, ...mediaFiles];
            setMediaFiles(updated);
            localStorage.setItem('enfono_media_files', JSON.stringify(updated));
            setMessage('File uploaded! Copy the URL below.');
            setTimeout(() => setMessage(''), 3000);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteMedia = async (id) => {
        const updated = mediaFiles.filter(f => f.id !== id);
        setMediaFiles(updated);
        try {
            await fetch(`${API_URL}/api/cms/enfono_media_files`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            setMessage('File removed from list');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) { console.error("Error deleting media ref:", err); }
    };

    const saveTraining = () => {
        localStorage.setItem('enfono_chatbot_training', chatbotTraining);
        setMessage('Training knowledge saved! The chatbot will use this immediately.');
        setTimeout(() => setMessage(''), 3000);
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
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{activeLabel}</h1>
                {message && <div style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '10px 16px', borderRadius: '8px', marginTop: '12px', fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>{message}</div>}
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

                    {/* === CHATBOT GLOBAL SETTINGS === */}
                    {activeTab === 'chatbot' && (
                        <div className="admin-content-card">
                            <h3>Chatbot Settings</h3>
                            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px' }}>
                                Configure the AI assistant's API key and primary provider.
                                <br />
                                <span style={{ color: '#f59e0b', fontSize: '12px' }}>
                                    <strong>Note:</strong> Settings saved here are local to your browser. To make them universal for all visitors, export the backup and contact the developer to update the global config.
                                </span>
                            </p>

                            {/* Connection Status */}
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ flex: 1, padding: '12px', background: initialCmsData.chatbot?.api_key ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)', borderRadius: '12px', border: '1px solid ' + (initialCmsData.chatbot?.api_key ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)') }}>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>System Global Key</div>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: initialCmsData.chatbot?.api_key ? '#10b981' : '#ef4444' }}>
                                        {initialCmsData.chatbot?.api_key ? '✔️ Configured' : '❌ Missing'}
                                    </div>
                                </div>
                                <div style={{ flex: 1, padding: '12px', background: localStorage.getItem('enfono_chatbot_api_key') ? 'rgba(16,185,129,0.05)' : 'rgba(241,245,249,0.5)', borderRadius: '12px', border: '1px solid ' + (localStorage.getItem('enfono_chatbot_api_key') ? 'rgba(16,185,129,0.1)' : '#e2e8f0') }}>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>Your Local Override</div>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: localStorage.getItem('enfono_chatbot_api_key') ? '#10b981' : '#94a3b8' }}>
                                        {localStorage.getItem('enfono_chatbot_api_key') ? '✔️ Active' : 'None'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>AI Provider</label>
                                    <select
                                        value={localStorage.getItem('enfono_chatbot_provider') || 'openai'}
                                        onChange={(e) => {
                                            localStorage.setItem('enfono_chatbot_provider', e.target.value);
                                            setMessage('Provider updated!');
                                            setTimeout(() => setMessage(''), 2000);
                                        }}
                                        style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    >
                                        <option value="openai">OpenAI (GPT-4o Mini)</option>
                                        <option value="claude">Claude (Claude 3.5 Sonnet)</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>API Key</label>
                                    <input
                                        type="password"
                                        placeholder="sk-..."
                                        defaultValue={localStorage.getItem('enfono_chatbot_api_key') || ''}
                                        onChange={(e) => {
                                            localStorage.setItem('enfono_chatbot_api_key', e.target.value);
                                        }}
                                        style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Your key is never sent to Enfono servers.</p>
                                </div>
                            </div>

                            <h4 style={{ fontWeight: 700, marginBottom: '12px' }}>AI Training Knowledge</h4>
                            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                                Paste any custom information here (FAQs, pricing, team bios, services). The chatbot will use this when answering questions.
                                <br /><strong>Tip:</strong> Write in Q&A format for best results. Example: "Q: What is Enfono's pricing? A: Contact us for a custom quote."
                            </p>
                            <textarea
                                value={chatbotTraining}
                                onChange={(e) => setChatbotTraining(e.target.value)}
                                rows={12}
                                placeholder={"Q: Who is the CEO of Enfono?\nA: ...\n\nQ: What is the pricing for ERPNext?\nA: ..."}
                                style={{ width: '100%', padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', color: '#0f172a', resize: 'vertical', lineHeight: 1.6 }}
                            />
                            <button onClick={saveTraining} className="admin-btn-primary" style={{ marginTop: '12px' }}>
                                Save Training Knowledge
                            </button>
                        </div>
                    )}

                    {/* === FILE MANAGER === */}
                    {activeTab === 'file_manager' && (
                        <div className="admin-content-card">
                            <h3>File Manager</h3>
                            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
                                Upload images or files and get a URL to use anywhere on the site (image fields, blog content, etc.).
                                <br /><strong style={{ color: '#f59e0b' }}>Note:</strong> Files are stored as base64 in browser storage. For large images, use an external service like Cloudinary.
                            </p>
                            <label style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '20px',
                                border: '2px dashed #10B981', borderRadius: '12px', cursor: 'pointer',
                                background: 'rgba(16,185,129,0.04)', marginBottom: '24px', color: '#10B981', fontWeight: 600
                            }}>
                                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '24px' }} />
                                <span>Click to upload image or file</span>
                                <input type="file" accept="image/*,application/pdf" onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    try {
                                        const res = await fetch(`${API_URL}/api/upload`, {
                                            method: 'POST',
                                            body: formData
                                        });
                                        if (res.ok) {
                                            const newFile = await res.json();
                                            const updatedMedia = [...mediaFiles, { ...newFile, id: Date.now() }];
                                            setMediaFiles(updatedMedia);
                                            // Save media list to CMS data
                                            await fetch(`${API_URL}/api/cms/enfono_media_files`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(updatedMedia)
                                            });
                                            setMessage('File uploaded and URL generated!');
                                            setTimeout(() => setMessage(''), 3000);
                                        }
                                    } catch (err) { console.error("Upload error:", err); }
                                }} style={{ display: 'none' }} />
                            </label>
                            {mediaFiles.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    <i className="fas fa-folder-open" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }} />
                                    No files uploaded yet.
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                                    {mediaFiles.map((file) => (
                                        <div key={file.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                                            {file.type?.startsWith('image/') ? (
                                                <img src={file.url} alt={file.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0' }}>
                                                    <i className="fas fa-file" style={{ fontSize: '32px', color: '#94a3b8' }} />
                                                </div>
                                            )}
                                            <div style={{ padding: '10px' }}>
                                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a', marginBottom: '8px', wordBreak: 'break-all' }}>{file.name}</div>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <button
                                                        onClick={() => { navigator.clipboard.writeText(file.url); setMessage('URL copied!'); setTimeout(() => setMessage(''), 2000); }}
                                                        style={{ flex: 1, padding: '6px', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                                                    >
                                                        Copy URL
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteMedia(file.id)}
                                                        style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}
                                                    >
                                                        <i className="fas fa-trash" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* === BACKUP & RESTORE === */}
                    {activeTab === 'backup' && (
                        <div className="admin-content-card">
                            <h3>Backup &amp; Restore</h3>
                            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
                                Export all your website data (content, leads, chatbot settings) as a JSON file. Use it to restore data after a server crash or to migrate to a new environment.
                            </p>
                            <div style={{ padding: '20px', background: 'rgba(16,185,129,0.04)', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '20px' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '6px', color: '#065f46' }}>
                                    <i className="fas fa-cloud-upload-alt" style={{ marginRight: '8px' }} />
                                    Auto Cloud Backup (Webhook)
                                </h4>
                                <p style={{ fontSize: '13px', color: '#065f46', marginBottom: '14px', opacity: 0.8 }}>
                                    Every time you click <strong>Save</strong>, the backup is automatically sent to this webhook URL.
                                    Compatible with <strong>Make.com</strong>, n8n, Zapier, or Google Apps Script.
                                </p>
                                <input
                                    type="url"
                                    placeholder="https://hook.eu1.make.com/xxxxx or your webhook URL..."
                                    defaultValue={localStorage.getItem('enfono_backup_webhook') || ''}
                                    onChange={(e) => localStorage.setItem('enfono_backup_webhook', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', background: '#fff', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', fontSize: '13px', color: '#0f172a' }}
                                />
                                <details style={{ marginTop: '12px' }}>
                                    <summary style={{ fontSize: '12px', color: '#065f46', cursor: 'pointer', fontWeight: 600 }}>
                                        How to set up free Google Drive backup (Make.com)
                                    </summary>
                                    <ol style={{ fontSize: '12px', color: '#065f46', paddingLeft: '20px', marginTop: '8px', lineHeight: 2 }}>
                                        <li>Go to <a href="https://make.com" target="_blank" rel="noreferrer" style={{ color: '#10B981' }}>make.com</a> → Create account (free)</li>
                                        <li>New scenario → Add module: <strong>Webhooks → Custom Webhook</strong></li>
                                        <li>Add second module: <strong>Google Drive → Upload a File</strong></li>
                                        <li>Connect your Google Drive → choose folder → use webhook body as file content</li>
                                        <li>Copy the webhook URL and paste it above</li>
                                    </ol>
                                </details>
                            </div>
                            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Export Backup</h4>
                                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Downloads all current data as <code>enfono_backup_[date].json</code>.</p>
                                <button onClick={handleExport} className="admin-btn-primary">
                                    <i className="fas fa-download" style={{ marginRight: '8px' }} />
                                    Export All Data
                                </button>
                            </div>

                            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Restore from Backup</h4>
                                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Select a previously exported <code>enfono_backup_*.json</code> file to restore.</p>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>
                                    <i className="fas fa-upload" />
                                    Choose Backup File
                                    <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <div style={{ padding: '20px', background: 'rgba(245,158,11,0.05)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.2)' }}>
                                <h4 style={{ fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>Long-term Protection Tips</h4>
                                <ul style={{ fontSize: '13px', color: '#92400e', paddingLeft: '20px', lineHeight: 2 }}>
                                    <li>Take a <strong>Contabo VPS Snapshot</strong> monthly from your Contabo dashboard.</li>
                                    <li>Code is safely stored on GitHub — re-deploying is always possible.</li>
                                    <li>Export this backup weekly and store it in Google Drive or similar.</li>
                                </ul>
                            </div>
                            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Enfono Website CMS v2.1</span>
                                <button onClick={handleReset} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', opacity: 0.7 }}>Reset all content to defaults</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminCMS;
