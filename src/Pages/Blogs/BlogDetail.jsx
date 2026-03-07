import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { m, LazyMotion, domAnimation, useScroll, useSpring } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import { initialCmsData } from '../../Data/cms_data';

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

export default function BlogDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;

    // Scroll progress logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const blogs = data.blogs || [];
    const blog = blogs.find(b => b.slug === slug);

    // Improved Related Logic
    let related = [];
    if (blog) {
        related = blogs.filter(b => b.slug !== slug && b.category === blog.category);
        if (related.length < 3) {
            const others = blogs.filter(b => b.slug !== slug && b.category !== blog.category);
            related = [...related, ...others].slice(0, 3);
        } else {
            related = related.slice(0, 3);
        }
    }

    if (!blog) {
        return (
            <LazyMotion features={domAnimation}>
                <div style={{ background: '#fff', minHeight: '100vh' }}>
                    <EnfonoHeader />
                    <div style={{ padding: '200px 0', textAlign: 'center' }}>
                        <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>Article not found</h2>
                        <Link to="/blogs" style={{ color: '#10B981', fontWeight: 600 }}>← Back to Blog</Link>
                    </div>
                    <EnfonoFooter />
                </div>
            </LazyMotion>
        );
    }

    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

    return (
        <LazyMotion features={domAnimation}>
            <div className="enfono-page-blog-detail" style={{ background: '#fff', scrollBehavior: 'smooth' }}>
                <EnfonoHeader />

                {/* Progress Bar */}
                <m.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#10B981',
                        zIndex: 2000,
                        scaleX,
                        transformOrigin: '0%',
                        boxShadow: '0 0 10px rgba(16,185,129,0.3)'
                    }}
                />

                {/* ── Hero Section ── */}
                <section style={{
                    padding: '160px 0 120px',
                    background: '#070707',
                    position: 'relative',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '1200px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div className="enfono-container">
                        <m.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                                <span style={{ background: categoryColors[blog.category] || '#10B981', color: '#fff', padding: '6px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                    {blog.category}
                                </span>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                <span style={{ fontSize: '14px', opacity: 0.7, fontWeight: 500, color: '#fff' }}>{blog.read_time}</span>
                            </div>

                            <h1 style={{
                                fontSize: 'clamp(32px, 5.5vw, 68px)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                maxWidth: '1100px',
                                margin: '0 auto 40px',
                                color: '#fff',
                                letterSpacing: '-0.03em'
                            }}>
                                {blog.title}
                            </h1>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontWeight: 500 }}>
                                <span>Published on {blog.date}</span>
                                <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                                <span>Insights by Enfono Team</span>
                            </div>
                        </m.div>
                    </div>
                </section>

                {/* ── Main Layout ── */}
                <section style={{ position: 'relative', marginTop: '-80px', zIndex: 10 }}>
                    <div className="enfono-container" style={{ maxWidth: '1300px', padding: '0 24px' }}>

                        {/* Featured Image */}
                        <m.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                borderRadius: '32px',
                                overflow: 'hidden',
                                aspectRatio: '21/9',
                                boxShadow: '0 50px 100px -30px rgba(0,0,0,0.4)',
                                background: '#111',
                                marginBottom: '100px'
                            }}>
                            <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </m.div>

                        <div className="blog-detail-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 100px) minmax(auto, 850px) minmax(320px, 350px)',
                            gap: '60px',
                            justifyContent: 'center',
                            alignItems: 'start'
                        }}>
                            {/* Left Sidebar (Share/Floating Decor) */}
                            <div className="blog-share-sidebar" style={{ position: 'sticky', top: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.15em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Read Mode</span>
                                <div style={{ width: '2px', height: '80px', background: 'linear-gradient(to bottom, #10B981, transparent)' }} />
                            </div>

                            {/* Center Reading Column */}
                            <m.article
                                initial="hidden" animate="visible" variants={fadeUp}
                                className="blog-article-content"
                                style={{
                                    fontSize: '20px',
                                    lineHeight: 1.85,
                                    color: '#334155',
                                    paddingBottom: '120px'
                                }}
                            >
                                <div
                                    className="article-body-wrapper"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />

                                {/* Tags */}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div style={{ marginTop: '100px', paddingTop: '40px', borderTop: '2px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {blog.tags.map((tag, i) => (
                                                <span key={i} style={{ background: '#f8fafc', color: '#64748b', padding: '8px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 600 }}>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </m.article>

                            {/* Right Sidebar - Sticky CTA */}
                            <m.aside
                                initial="hidden" animate="visible" variants={fadeUp}
                                style={{ position: 'sticky', top: '140px' }}>

                                <div style={{
                                    background: 'linear-gradient(155deg, #070707, #0e1a14)',
                                    borderRadius: '32px',
                                    padding: '40px',
                                    color: '#fff',
                                    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ width: '56px', height: '56px', background: 'rgba(16,185,129,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                        <i className="fas fa-paper-plane" style={{ color: '#10B981', fontSize: '24px' }} />
                                    </div>
                                    <h4 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.3 }}>Implementation Consulting</h4>
                                    <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '32px', lineHeight: 1.7 }}>Transform your GCC operations with our AI-driven ERP expertise.</p>
                                    <Link to="/contact" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        background: '#10B981',
                                        color: '#fff',
                                        padding: '16px 24px',
                                        borderRadius: '16px',
                                        textDecoration: 'none',
                                        fontWeight: 800,
                                        fontSize: '15px',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        boxShadow: '0 10px 25px -5px rgba(16,185,129,0.5)'
                                    }}>
                                        Get Started <i className="fas fa-arrow-right" style={{ fontSize: '12px' }} />
                                    </Link>
                                </div>

                                <div style={{ marginTop: '48px', paddingLeft: '8px' }}>
                                    <h5 style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>Back to Journal</h5>
                                    <Link to="/blogs" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10B981', textDecoration: 'none', fontSize: '16px', fontWeight: 700 }}>
                                        <i className="fas fa-th-large" /> All Insights
                                    </Link>
                                </div>
                            </m.aside>
                        </div>
                    </div>
                </section>

                {/* ── Related Posts ── */}
                {related.length > 0 && (
                    <section style={{ padding: '120px 0', background: '#fcfcfc', borderTop: '1px solid #f1f5f9' }}>
                        <div className="enfono-container">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
                                <div>
                                    <span style={{ color: '#10B981', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Recommended</span>
                                    <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', marginTop: '16px', letterSpacing: '-0.03em' }}>Related Insights</h2>
                                </div>
                                <Link to="/blogs" style={{ fontSize: '15px', fontWeight: 800, color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    View Full Journal <i className="fas fa-chevron-right" style={{ fontSize: '11px' }} />
                                </Link>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '48px' }}>
                                {related.map(rel => (
                                    <Link key={rel.id} to={`/blogs/${rel.slug}`} style={{ display: 'block', textDecoration: 'none', group: 'true' }}>
                                        <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '28px', aspectRatio: '16/10', background: '#f1f5f9' }}>
                                            <img src={rel.cover_image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <span style={{ color: categoryColors[rel.category] || '#10B981', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rel.category}</span>
                                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
                                            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>{rel.read_time}</span>
                                        </div>
                                        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, letterSpacing: '-0.02em' }}>{rel.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <EnfonoFooter />

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .article-body-wrapper h2 { font-size: 32px; font-weight: 900; color: #070707; margin: 64px 0 24px; letter-spacing: -0.02em; line-height: 1.3; }
                    .article-body-wrapper h3 { font-size: 24px; font-weight: 800; color: #10B981; margin: 48px 0 20px; letter-spacing: -0.01em; line-height: 1.4; }
                    .article-body-wrapper p { margin-bottom: 28px; color: #334155; font-size: 18px; line-height: 1.8; }
                    .article-body-wrapper strong { color: #080808; font-weight: 800; }
                    .article-body-wrapper ul, .article-body-wrapper ol { margin-bottom: 32px; padding-left: 24px; font-size: 18px; }
                    .article-body-wrapper li { margin-bottom: 12px; color: #334155; line-height: 1.7; }
                    .article-body-wrapper blockquote { 
                        margin: 48px 0; 
                        padding: 32px 48px; 
                        background: #f8fafc; 
                        border-left: 4px solid #10B981; 
                        border-radius: 0 20px 20px 0;
                        font-style: italic;
                        font-size: 22px;
                        color: #1e293b;
                        line-height: 1.6;
                        font-weight: 500;
                    }
                    @media (max-width: 1200px) {
                        .blog-detail-grid { 
                            grid-template-columns: 1fr 340px !important;
                        }
                        .blog-share-sidebar { display: none !important; }
                    }
                    @media (max-width: 1024px) {
                        .blog-detail-grid { 
                            grid-template-columns: 1fr !important;
                            gap: 60px !important;
                        }
                        aside { position: static !important; margin-top: 60px; max-width: 480px; margin-left: auto; margin-right: auto; }
                    }
                `}} />
            </div>
        </LazyMotion>
    );
}
