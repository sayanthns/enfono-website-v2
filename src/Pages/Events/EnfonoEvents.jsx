import { useContext } from 'react';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from '../../Data/cms_data';

export default function EnfonoEvents() {
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;
    const [activeFilter, setActiveFilter] = useState('All');

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

    // Collect all unique tag texts for filter
    const allTags = ['All', ...new Set(
        (data.media_events || []).flatMap(ev => (ev.tags || []).map(t => t.text))
    )];

    const filtered = activeFilter === 'All'
        ? data.media_events
        : (data.media_events || []).filter(ev => ev.tags?.some(t => t.text === activeFilter));

    return (
        <LazyMotion features={domAnimation}>
            <div className="enfono-page-events">
                <EnfonoHeader />

                {/* ── Hero ── */}
                <section style={{
                    padding: '160px 0 80px',
                    background: 'linear-gradient(135deg, #070707 0%, #0d1117 70%, #0c1a10 100%)',
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 40%, rgba(16,185,129,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div className="enfono-container">
                        <m.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="e-section-label">Gallery & News</div>
                            <h1 className="e-section-title" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 60px)', maxWidth: '680px' }}>
                                Enfono<br />
                                <span style={{ color: '#10B981' }}>in Action</span>
                            </h1>
                            <p className="e-section-sub" style={{ opacity: 0.65, maxWidth: '500px', marginTop: '20px' }}>
                                Our presence at global tech expos, industry summits, and government initiatives — captured live.
                            </p>
                        </m.div>

                        {/* Stats row */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                            style={{ display: 'flex', gap: '40px', marginTop: '48px', flexWrap: 'wrap' }}
                        >
                            {[
                                { label: 'Events Participated', value: (data.media_events || []).length + '+' },
                                { label: 'Countries Reached', value: '6+' },
                                { label: 'Global Summits', value: '3' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>{s.value}</span>
                                    <span style={{ fontSize: '13px', opacity: 0.5 }}>{s.label}</span>
                                </div>
                            ))}
                        </m.div>
                    </div>
                </section>

                {/* ── Filter Bar ── */}
                <div style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '80px', zIndex: 10 }}>
                    <div className="enfono-container">
                        <div style={{ display: 'flex', gap: '8px', padding: '16px 0', overflowX: 'auto', scrollbarWidth: 'none' }}>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    style={{
                                        padding: '8px 20px',
                                        borderRadius: '100px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        background: activeFilter === tag ? '#10B981' : 'rgba(255,255,255,0.06)',
                                        color: activeFilter === tag ? '#fff' : 'rgba(255,255,255,0.55)',
                                    }}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Events Grid ── */}
                <section className="e-events-section" style={{ background: '#070707', paddingTop: '64px', paddingBottom: '80px', minHeight: '60vh' }}>
                    <div className="enfono-container">
                        <m.div
                            className="e-events-grid"
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            key={activeFilter}
                        >
                            {(filtered || []).map((ev, idx) => (
                                <m.div key={idx} className="e-event-card" variants={fadeUp}>
                                    <div className="eev-image-wrapper">
                                        <img src={ev.image} alt={ev.title} className="eev-image fadeIn" width="600" height="400" loading="lazy" />
                                        <div className="eev-date-badge">
                                            <span className="day">{ev.date.split(' ')[0]}</span>
                                            <span className="month">{ev.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="eev-content">
                                        <div className="eev-meta">
                                            {ev.tags && ev.tags.map((tag, tIdx) => (
                                                <span key={tIdx}><i className={tag.icon} /> {tag.text}</span>
                                            ))}
                                        </div>
                                        <h3 className="eev-title">{ev.title}</h3>
                                        <p className="eev-desc">{ev.desc}</p>
                                        <div className="eev-actions">
                                            {ev.buttons && ev.buttons.map((btn, bIdx) =>
                                                btn.type === 'disabled' ? (
                                                    <span key={bIdx} className="eev-link disabled">
                                                        <i className="far fa-images" />
                                                        {btn.label}
                                                    </span>
                                                ) : (
                                                    <a
                                                        key={bIdx}
                                                        href={btn.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`eev-link ${btn.type || ''}`}
                                                    >
                                                        {btn.type === 'youtube' && <i className="fab fa-youtube" />}
                                                        {btn.type === 'instagram' && <i className="fab fa-instagram" />}
                                                        {btn.label}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </m.div>
                            ))}
                        </m.div>

                        {(!filtered || filtered.length === 0) && (
                            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
                                <i className="fas fa-camera" style={{ fontSize: '40px', marginBottom: '16px', display: 'block' }} />
                                <p>No events in this category yet.</p>
                            </div>
                        )}
                    </div>
                </section>

                <EnfonoFooter />
            </div>
        </LazyMotion>
    );
}
