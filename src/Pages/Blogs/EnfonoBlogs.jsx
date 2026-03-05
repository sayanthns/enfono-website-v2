import React from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';

export default function EnfonoBlogs() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="enfono-page-blogs" style={{ background: '#fff' }}>
                <EnfonoHeader />

                <section className="page-hero" style={{ padding: '160px 0 120px', background: '#070707', color: '#fff', textAlign: 'center' }}>
                    <div className="enfono-container">
                        <m.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="e-section-label">Insights</div>
                            <h1 className="e-section-title" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)' }}>Engineering & Logic</h1>
                            <p className="e-section-sub" style={{ opacity: 0.7, margin: '0 auto', maxWidth: '600px' }}>Our technical blog sharing deep-dives into ERPNext, AI implementations, and the future of business automation.</p>
                        </m.div>
                    </div>
                </section>

                <section className="blogs-placeholder" style={{ padding: '120px 0', textAlign: 'center' }}>
                    <div className="enfono-container">
                        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f8f8', padding: '60px', borderRadius: '24px' }}>
                            <i className="fas fa-pen-nib" style={{ fontSize: '48px', color: '#10B981', marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Blogs Coming Soon</h2>
                            <p style={{ color: '#666' }}>We are curating high-quality technical content for you. Subscribe to our newsletter to get notified when we launch our first set of articles.</p>
                        </div>
                    </div>
                </section>

                <EnfonoFooter />
            </div>
        </LazyMotion>
    );
}
