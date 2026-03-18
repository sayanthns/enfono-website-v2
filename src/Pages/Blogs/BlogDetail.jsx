import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from '../../Data/cms_data';

const categoryColors = {
    'AI & ERP': '#6366f1',
    'ERP': '#10B981',
    'AI & Analytics': '#8b5cf6',
    'Compliance': '#f59e0b',
    'Automation': '#3b82f6',
    'Case Study': '#ef4444',
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function BlogDetail() {
    const { slug } = useParams();
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    const blogs = data.blogs || [];
    const blog = blogs.find(b => b.slug === slug);

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
            <div style={{ background: '#fff', minHeight: '100vh' }}>
                <EnfonoHeader />
                <div style={{ padding: '200px 0', textAlign: 'center' }}>
                    <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>Article not found</h2>
                    <Link to="/blogs" style={{ color: '#10B981', fontWeight: 600 }}>Back to Blog</Link>
                </div>
                <EnfonoFooter />
            </div>
        );
    }

    const catColor = categoryColors[blog.category] || '#10B981';

    return (
        <div className="enfono-blog-detail-page" style={{ background: '#fff', scrollBehavior: 'smooth' }}>
            <EnfonoHeader />

            {/* Progress Bar */}
            <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: catColor, zIndex: 2000, scaleX, transformOrigin: '0%' }} />

            {/* Hero */}
            <section style={{ padding: window.innerWidth <= 767 ? '110px 0 50px' : '140px 0 80px', background: '#070707', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', height: '500px', background: `radial-gradient(circle, ${catColor}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
                            <span>/</span>
                            <Link to="/blogs" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Journal</Link>
                            <span>/</span>
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{blog.category}</span>
                        </div>

                        {/* Meta */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                            <span style={{ background: catColor, color: '#fff', padding: '5px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                {blog.category}
                            </span>
                            <span style={{ fontSize: '13px', opacity: 0.5, fontWeight: 500, color: '#fff' }}>{blog.read_time}</span>
                        </div>

                        {/* Title */}
                        <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, lineHeight: 1.15, margin: '0 auto 32px', color: '#fff', letterSpacing: '-0.03em' }}>
                            {blog.title}
                        </h1>

                        {/* Date & Author */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 500 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <i className="far fa-calendar-alt" style={{ fontSize: '13px' }} />
                                {blog.date}
                            </span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                            <span>Enfono Team</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            {blog.cover_image && (
                <div style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '2/1', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)', background: '#111' }}
                    >
                        <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                </div>
            )}

            {/* Article Content */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                <div className="blog-detail-layout" style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 767 ? '1fr' : '1fr 300px', gap: window.innerWidth <= 767 ? '40px' : '80px', paddingTop: window.innerWidth <= 767 ? '40px' : '80px', alignItems: 'start' }}>

                    {/* Main Article */}
                    <motion.article initial="hidden" animate="visible" variants={fadeUp} className="blog-article-content">
                        <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.content }} />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {blog.tags.map((tag, i) => (
                                        <span key={i} style={{ background: '#f1f5f9', color: '#475569', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600 }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share */}
                        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Share</span>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }}>
                                <i className="fab fa-x-twitter" style={{ fontSize: '14px' }} />
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }}>
                                <i className="fab fa-linkedin-in" style={{ fontSize: '14px' }} />
                            </a>
                            <button onClick={() => navigator.clipboard.writeText(window.location.href)} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                <i className="fas fa-link" style={{ fontSize: '14px' }} />
                            </button>
                        </div>
                    </motion.article>

                    {/* Sidebar */}
                    <motion.aside initial="hidden" animate="visible" variants={fadeUp} className="blog-sidebar" style={{ position: 'sticky', top: '120px' }}>

                        {/* CTA Card */}
                        <div style={{ background: 'linear-gradient(155deg, #070707, #0e1a14)', borderRadius: '24px', padding: '32px', color: '#fff', textAlign: 'center' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <i className="fas fa-paper-plane" style={{ color: '#10B981', fontSize: '20px' }} />
                            </div>
                            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.3 }}>Need ERP Help?</h4>
                            <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '24px', lineHeight: 1.6 }}>Get a free consultation with our ERP experts.</p>
                            <Link to="/contact" style={{ display: 'block', background: '#10B981', color: '#fff', padding: '14px 20px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, fontSize: '14px', boxShadow: '0 8px 20px -5px rgba(16,185,129,0.4)' }}>
                                Get Started <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '6px' }} />
                            </Link>
                        </div>

                        {/* TOC / Back */}
                        <div style={{ marginTop: '32px', padding: '24px', background: '#f8fafc', borderRadius: '20px' }}>
                            <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Navigate</h5>
                            <Link to="/blogs" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', textDecoration: 'none', fontSize: '14px', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                                <i className="fas fa-th-large" style={{ color: '#10B981', fontSize: '12px' }} /> All Insights
                            </Link>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '14px', fontWeight: 600, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                                <i className="fas fa-arrow-up" style={{ color: '#10B981', fontSize: '12px' }} /> Back to Top
                            </button>
                        </div>

                        {/* Category Badge */}
                        <div style={{ marginTop: '24px', padding: '20px 24px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Category</span>
                            <div style={{ marginTop: '12px' }}>
                                <span style={{ background: `${catColor}15`, color: catColor, padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700 }}>
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </section>

            {/* Related Posts */}
            {related.length > 0 && (
                <section style={{ padding: '100px 0', marginTop: '60px', background: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Continue Reading</span>
                                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginTop: '12px', letterSpacing: '-0.02em' }}>Related Insights</h2>
                            </div>
                            <Link to="/blogs" style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                View All <i className="fas fa-chevron-right" style={{ fontSize: '10px' }} />
                            </Link>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                            {related.map(rel => (
                                <Link key={rel.id || rel.slug} to={`/blogs/${rel.slug}`} style={{ display: 'block', textDecoration: 'none', background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' }}>
                                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: '#f1f5f9' }}>
                                        <img src={rel.cover_image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                            <span style={{ color: categoryColors[rel.category] || '#10B981', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rel.category}</span>
                                            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }} />
                                            <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>{rel.read_time}</span>
                                        </div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{rel.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <EnfonoFooter />

            <style dangerouslySetInnerHTML={{ __html: `
                .blog-article-content .article-body h1 { font-size: 36px; font-weight: 900; color: #0f172a; margin: 56px 0 24px; letter-spacing: -0.02em; line-height: 1.2; }
                .blog-article-content .article-body h2 { font-size: 28px; font-weight: 900; color: #0f172a; margin: 56px 0 20px; letter-spacing: -0.02em; line-height: 1.25; }
                .blog-article-content .article-body h3 { font-size: 22px; font-weight: 800; color: #10B981; margin: 44px 0 16px; line-height: 1.35; }
                .blog-article-content .article-body h4 { font-size: 18px; font-weight: 800; color: #334155; margin: 36px 0 14px; line-height: 1.4; }
                .blog-article-content .article-body p { margin-bottom: 24px; color: #374151; font-size: 17px; line-height: 1.8; }
                .blog-article-content .article-body strong { color: #0f172a; font-weight: 700; }
                .blog-article-content .article-body a { color: #10B981; text-decoration: underline; text-underline-offset: 3px; }
                .blog-article-content .article-body ul, .blog-article-content .article-body ol { margin-bottom: 28px; padding-left: 24px; }
                .blog-article-content .article-body li { margin-bottom: 10px; color: #374151; font-size: 17px; line-height: 1.75; }
                .blog-article-content .article-body blockquote {
                    margin: 40px 0; padding: 28px 32px;
                    background: #f0fdf4; border-left: 4px solid #10B981; border-radius: 0 16px 16px 0;
                    font-style: italic; font-size: 18px; color: #1e293b; line-height: 1.7; font-weight: 500;
                }
                .blog-article-content .article-body img { border-radius: 16px; margin: 32px 0; max-width: 100%; height: auto; }
                .blog-article-content .article-body table { width: 100%; border-collapse: collapse; margin: 32px 0; font-size: 15px; }
                .blog-article-content .article-body th { background: #f8fafc; padding: 12px 16px; text-align: left; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
                .blog-article-content .article-body td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; }
                .blog-article-content .article-body hr { border: none; border-top: 1px solid #e2e8f0; margin: 48px 0; }
                .blog-article-content .article-body pre { background: #1e293b; color: #e2e8f0; padding: 24px; border-radius: 16px; overflow-x: auto; margin: 28px 0; font-size: 14px; line-height: 1.6; }
                .blog-article-content .article-body code { background: #f1f5f9; padding: 2px 8px; border-radius: 6px; font-size: 14px; color: #e11d48; }
                .blog-article-content .article-body pre code { background: none; padding: 0; color: inherit; }

                @media (max-width: 900px) {
                    .blog-detail-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .blog-sidebar { position: static !important; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                    .blog-sidebar > div:first-child { grid-column: 1 / -1; }
                }
                @media (max-width: 600px) {
                    .blog-sidebar { grid-template-columns: 1fr !important; }
                    .blog-article-content .article-body h2 { font-size: 24px; }
                    .blog-article-content .article-body p { font-size: 16px; }
                }
            `}} />
        </div>
    );
}
