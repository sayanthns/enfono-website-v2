import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import { initialCmsData } from '../../Data/cms_data';

const CATEGORIES = ['All', 'AI & ERP', 'ERP', 'AI & Analytics', 'Compliance', 'Automation', 'Case Study'];

const categoryColors = {
    'AI & ERP': '#6366f1',
    'ERP': '#10B981',
    'AI & Analytics': '#8b5cf6',
    'Compliance': '#f59e0b',
    'Automation': '#3b82f6',
    'Case Study': '#ef4444',
};

import { useContext } from 'react';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from '../../Data/cms_data';

export default function EnfonoBlogs() {
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;
    const [activeCategory, setActiveCategory] = useState('All');
    const [scrolled, setScrolled] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 30);
            if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
                setNavHidden(true);
            } else {
                setNavHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const blogs = data.blogs || [];
    const filtered = activeCategory === 'All' ? blogs : blogs.filter(b => b.category === activeCategory);
    const featured = filtered.find(b => b.featured) || filtered[0];
    const rest = filtered.filter(b => b !== featured);

    const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
    const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

    // Header height is 74px on desktop, 64px on mobile (<991px)
    // We adjust the sticky top based on navHidden state
    const stickyTop = navHidden ? '0px' : '74px';

    return (
        <LazyMotion features={domAnimation}>
            <div className="enfono-page-blogs" style={{ background: '#fff' }}>
                <EnfonoHeader />

                {/* ── Hero ── */}
                <section style={{
                    padding: '160px 0 80px',
                    background: 'linear-gradient(135deg, #070707 0%, #0d1117 60%, #0f1f12 100%)',
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(16,185,129,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div className="enfono-container">
                        <m.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="e-section-label">Insights & Stories</div>
                            <h1 className="e-section-title" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 60px)', maxWidth: '700px' }}>
                                Ideas That<br />
                                <span style={{ color: '#10B981' }}>Drive Business Forward</span>
                            </h1>
                            <p className="e-section-sub" style={{ opacity: 0.7, maxWidth: '540px', marginTop: '20px' }}>
                                Deep dives into ERP, AI, compliance, and the real stories of GCC businesses that transformed their operations.
                            </p>
                        </m.div>
                    </div>
                </section>

                {/* ── Category Filter ── */}
                <div style={{
                    background: 'rgba(248, 250, 252, 0.95)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: '1px solid #e2e8f0',
                    position: 'sticky',
                    top: stickyTop,
                    zIndex: 100,
                    transition: 'top 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
                }}>
                    <div className="enfono-container">
                        <div style={{ display: 'flex', gap: '8px', padding: '16px 0', overflowX: 'auto', scrollbarWidth: 'none' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '8px 24px',
                                        borderRadius: '100px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        background: activeCategory === cat ? '#10B981' : 'transparent',
                                        color: activeCategory === cat ? '#fff' : '#64748b',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Blog Content ── */}
                <section style={{ padding: '60px 0 100px' }}>
                    <div className="enfono-container">

                        {/* Featured Post */}
                        {featured && (
                            <m.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                style={{ marginBottom: '64px' }}
                            >
                                <Link to={`/blogs/${featured.slug}`} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', background: '#070707', borderRadius: '24px', overflow: 'hidden', color: '#fff' }} className="blog-featured-card">
                                    <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                                        <img src={featured.cover_image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                    </div>
                                    <div style={{ padding: '48px 48px 48px 0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                            <span style={{ background: categoryColors[featured.category] || '#10B981', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700 }}>
                                                {featured.category}
                                            </span>
                                            <span style={{ fontSize: '12px', opacity: 0.5 }}>{featured.read_time}</span>
                                        </div>
                                        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, lineHeight: 1.3, marginBottom: '16px', color: '#fff' }}>
                                            {featured.title}
                                        </h2>
                                        <p style={{ opacity: 0.65, fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
                                            {featured.excerpt}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <span style={{ color: '#10B981', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                Read Article <i className="fas fa-arrow-right" style={{ fontSize: '12px' }} />
                                            </span>
                                            <span style={{ fontSize: '12px', opacity: 0.4 }}>{featured.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            </m.div>
                        )}

                        {/* Blog Grid */}
                        {rest.length > 0 && (
                            <>
                                <m.div style={{ marginBottom: '32px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                    <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                                        {activeCategory === 'All' ? 'More Articles' : activeCategory}
                                    </h2>
                                </m.div>
                                <m.div
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                                >
                                    {rest.map((blog) => (
                                        <m.div key={blog.id} variants={fadeUp}>
                                            <Link to={`/blogs/${blog.slug}`} style={{ display: 'block', textDecoration: 'none', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                                            >
                                                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                                                    <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                    />
                                                </div>
                                                <div style={{ padding: '24px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                                        <span style={{ background: `${categoryColors[blog.category]}18`, color: categoryColors[blog.category] || '#10B981', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 700 }}>
                                                            {blog.category}
                                                        </span>
                                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{blog.read_time}</span>
                                                    </div>
                                                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '10px' }}>
                                                        {blog.title}
                                                    </h3>
                                                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {blog.excerpt}
                                                    </p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ color: '#10B981', fontWeight: 600, fontSize: '13px' }}>Read more →</span>
                                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{blog.date}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </m.div>
                                    ))}
                                </m.div>
                            </>
                        )}

                        {filtered.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                                <i className="fas fa-search" style={{ fontSize: '40px', marginBottom: '16px', display: 'block' }} />
                                <p>No posts in this category yet.</p>
                            </div>
                        )}
                    </div>
                </section>

                <EnfonoFooter />
            </div>
        </LazyMotion >
    );
}
