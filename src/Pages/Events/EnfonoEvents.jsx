import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import { initialCmsData } from '../../Data/cms_data';

export default function EnfonoEvents() {
    const [cmsData, setCmsData] = useState(initialCmsData);

    useEffect(() => {
        const loadData = () => {
            const saved = localStorage.getItem('enfono_cms_data');
            if (saved) {
                setCmsData(JSON.parse(saved));
            }
        };

        loadData();

        const handleStorageChange = (e) => {
            if (e.key === 'enfono_cms_data') {
                loadData();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="enfono-page-events" style={{ background: '#fff' }}>
                <EnfonoHeader />

                <section className="page-hero" style={{ padding: '160px 0 80px', background: '#070707', color: '#fff' }}>
                    <div className="enfono-container">
                        <m.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="e-section-label">Gallery & News</div>
                            <h1 className="e-section-title" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)' }}>Media & Events</h1>
                            <p className="e-section-sub" style={{ opacity: 0.7 }}>Stay updated with Enfono's latest participation in global tech expos, workshops, and industry summits.</p>
                        </m.div>
                    </div>
                </section>

                <section className="events-list" style={{ padding: '80px 0' }}>
                    <div className="enfono-container">
                        <div className="e-events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
                            {cmsData.media_events.map((ev, idx) => (
                                <m.div key={idx} className="e-event-card" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: idx * 0.1 }}>
                                    <div className="eev-image-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/10' }}>
                                        <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="eev-date-badge" style={{ position: 'absolute', top: '20px', left: '20px', background: '#FFC107', padding: '8px 12px', borderRadius: '8px', color: '#000', fontWeight: 700, textAlign: 'center' }}>
                                            <div style={{ fontSize: '18px' }}>{ev.date.split(' ')[0]}</div>
                                            <div style={{ fontSize: '12px', opacity: 0.8 }}>{ev.date.split(' ')[1]}</div>
                                        </div>
                                    </div>
                                    <div className="eev-content" style={{ padding: '24px 0' }}>
                                        <div className="eev-meta" style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                                            {ev.tags && ev.tags.map((tag, tIdx) => (
                                                <span key={tIdx}><i className={tag.icon} /> {tag.text}</span>
                                            ))}
                                        </div>
                                        <h3 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 700 }}>{ev.title}</h3>
                                        <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>{ev.desc}</p>
                                        <div className="eev-actions" style={{ display: 'flex', gap: '12px' }}>
                                            {ev.buttons && ev.buttons.map((btn, bIdx) => (
                                                btn.type === 'disabled' ? (
                                                    <span
                                                        key={bIdx}
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            background: '#f0f0f0',
                                                            color: '#999',
                                                            cursor: 'not-allowed'
                                                        }}
                                                    >
                                                        <i className="far fa-images" />
                                                        {btn.label}
                                                    </span>
                                                ) : (
                                                    <a
                                                        key={bIdx}
                                                        href={btn.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            textDecoration: 'none',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            background: btn.type === 'youtube' ? 'rgba(239, 68, 68, 0.1)' : btn.type === 'instagram' ? 'rgba(219, 39, 119, 0.1)' : '#f0f0f0',
                                                            color: btn.type === 'youtube' ? '#ef4444' : btn.type === 'instagram' ? '#db2777' : '#666'
                                                        }}
                                                    >
                                                        {btn.type === 'youtube' && <i className="fab fa-youtube" />}
                                                        {btn.type === 'instagram' && <i className="fab fa-instagram" />}
                                                        {btn.label}
                                                    </a>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>

                <EnfonoFooter />
            </div>
        </LazyMotion>
    );
}
