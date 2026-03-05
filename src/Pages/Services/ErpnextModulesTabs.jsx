import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { m, AnimatePresence } from 'framer-motion';

const ErpnextModulesTabs = ({ modules }) => {
    const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id || '');
    const activeModule = modules.find(m => m.id === activeModuleId);

    const fadeVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
    };

    return (
        <section className="erp-deepdive-section" style={{ padding: '100px 0', background: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Container className="enf-container">
                <div className="section-header text-center" style={{ marginBottom: '60px' }}>
                    <span className="enf-badge" style={{ color: '#10B981', fontWeight: 600, letterSpacing: '1px', marginBottom: '16px', display: 'inline-block' }}>COMPREHENSIVE SUITE</span>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 800 }}>Explore Functional Modules</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '16px auto 0' }}>Discover the depth of features included out-of-the-box, tailored exactly for your enterprise.</p>
                </div>

                <Row className="erp-deepdive-row">
                    {/* Sticky Sidebar Navigation */}
                    <Col lg={4} className="mb-5 mb-lg-0">
                        <div className="erp-sidebar-nav" style={{ position: 'sticky', top: '100px' }}>
                            {modules.map(mod => (
                                <button
                                    key={mod.id}
                                    className={`erp-nav-btn ${mod.id === activeModuleId ? 'active' : ''}`}
                                    onClick={() => setActiveModuleId(mod.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px 24px',
                                        background: mod.id === activeModuleId ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                        border: '1px solid',
                                        borderColor: mod.id === activeModuleId ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                                        borderRadius: '12px',
                                        color: mod.id === activeModuleId ? '#fff' : 'rgba(255,255,255,0.5)',
                                        textAlign: 'left',
                                        transition: 'all 0.3s ease',
                                        marginBottom: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{
                                        width: '32px', height: '32px',
                                        borderRadius: '8px',
                                        background: mod.id === activeModuleId ? '#10B981' : 'rgba(255,255,255,0.05)',
                                        color: mod.id === activeModuleId ? '#fff' : 'rgba(255,255,255,0.4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <i className={mod.icon} style={{ fontSize: '14px' }}></i>
                                    </span>
                                    <span style={{ fontSize: '1.05rem', fontWeight: mod.id === activeModuleId ? 700 : 500 }}>{mod.title}</span>
                                    {mod.id === activeModuleId && (
                                        <i className="fas fa-chevron-right ms-auto" style={{ color: '#10B981', fontSize: '12px' }}></i>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Col>

                    {/* Content Detail Area */}
                    <Col lg={8}>
                        <div className="erp-module-content" style={{ padding: '0 0 0 32px' }}>
                            <AnimatePresence mode="wait">
                                {activeModule && (
                                    <m.div
                                        key={activeModule.id}
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <div style={{ marginBottom: '40px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                                <div style={{ width: '56px', height: '56px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}>
                                                    <i className={activeModule.icon}></i>
                                                </div>
                                                <h3 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>{activeModule.title}</h3>
                                            </div>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7 }}>{activeModule.desc}</p>
                                        </div>

                                        <div className="erp-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                                            {activeModule.featuresList && activeModule.featuresList.map((feat, idx) => (
                                                <div key={idx} style={{
                                                    padding: '20px',
                                                    background: '#111',
                                                    borderRadius: '12px',
                                                    border: '1px solid #222',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px'
                                                }}>
                                                    <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '4px', fontSize: '14px' }}></i>
                                                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {activeModule.image && (
                                            <div className="erp-module-image" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a', height: '350px', position: 'relative' }}>
                                                <img
                                                    src={activeModule.image}
                                                    alt={activeModule.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div style={{ position: 'absolute', inset: 0, display: 'none', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'rgba(255,255,255,0.1)' }}>
                                                    <i className={activeModule.icon} style={{ fontSize: '64px' }}></i>
                                                </div>
                                            </div>
                                        )}
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ErpnextModulesTabs;
