import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { servicesData } from '../../Data/services_data';
import { Container, Row, Col } from 'react-bootstrap';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import ErpnextModulesTabs from './ErpnextModulesTabs';

const EnfonoServiceDetail = () => {
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const service = servicesData.find(s => s.slug === slug);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <div className="enf-page-wrapper">
            <EnfonoHeader />

            <main className="enf-main-content">
                {/* Hero Section */}
                <section className="service-detail-hero" style={{ background: '#0D0D0D', color: '#fff', paddingTop: '160px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
                    <Container style={{ position: 'relative', zIndex: 2 }}>
                        <div className="hero-content text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <span className="enf-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, display: 'inline-block', marginBottom: '16px' }}>Our Services</span>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>{service.hero_tagline}</h1>
                            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '40px' }}>{service.hero_desc}</p>
                            <div className="hero-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="enf-btn primary" style={{ background: '#10B981', color: '#fff', padding: '16px 32px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>Book Free Consultation</a>
                                <Link to="/services" className="enf-btn outline" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '16px 32px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>All Services</Link>
                            </div>
                        </div>
                    </Container>
                    {/* Background Glow */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }} />
                </section>

                {/* Features Section */}
                <section className="service-features-section" style={{ padding: '80px 0', background: '#0a0a0a' }}>
                    <Container>
                        <div className="section-header text-center" style={{ marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '16px' }}>Core Capabilities</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>What you get with our {service.title} service.</p>
                        </div>
                        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="feature-card" style={{ padding: '32px', background: '#111', borderRadius: '16px', border: '1px solid #222', transition: 'all 0.3s ease' }}>
                                    <div className="icon" style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px' }}>
                                        <i className={feature.icon}></i>
                                    </div>
                                    <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Comprehensive Modules (Standard - Rendered only if service has modules and is NOT a deep-dive service) */}
                {service.modules && service.slug !== 'erpnext-implementation' && service.slug !== 'custom-erp-development' && (
                    <section className="service-modules-section" style={{ padding: '100px 0', background: '#0D0D0D' }}>
                        <Container>
                            <div className="section-header text-center" style={{ marginBottom: '60px' }}>
                                <span className="enf-badge" style={{ color: '#10B981', fontWeight: 600, letterSpacing: '1px', marginBottom: '16px', display: 'inline-block' }}>COMPREHENSIVE SUITE</span>
                                <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>Modules & Capabilities</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '16px auto 0' }}>Everything you need to run your entire enterprise, connected seamlessly in one centralized database.</p>
                            </div>
                            <div className="service-modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                                {service.modules.map((mod, idx) => (
                                    <div key={idx} style={{ background: '#111', borderRadius: '16px', overflow: 'hidden', border: '1px solid #222' }}>
                                        {mod.image && (
                                            <div style={{ height: '220px', background: '#1a1a1a', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img
                                                    src={mod.image}
                                                    alt={mod.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div style={{ position: 'absolute', inset: 0, display: 'none', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'rgba(255,255,255,0.2)' }}>
                                                    <i className={mod.icon} style={{ fontSize: '48px' }}></i>
                                                </div>
                                            </div>
                                        )}
                                        <div style={{ padding: '32px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                                <i className={mod.icon} style={{ fontSize: '18px' }}></i>
                                            </div>
                                            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '12px' }}>{mod.title}</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{mod.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </section>
                )}

                {/* Extended "Deep Dive" Modules Tabbed Layout */}
                {service.modules && (service.slug === 'erpnext-implementation' || service.slug === 'custom-erp-development') && (
                    <ErpnextModulesTabs modules={service.modules} />
                )}

                {/* Industries We Serve (Rendered only if service has industries) */}
                {service.industries && (
                    <section className="service-industries-section" style={{ padding: '80px 0', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Container>
                            <div className="text-center" style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '2rem', color: '#fff' }}>Industries We Empower</h2>
                            </div>
                            <div className="service-industries-flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
                                {service.industries.map((ind, idx) => (
                                    <div key={idx} style={{ padding: '24px 32px', background: '#111', borderRadius: '16px', border: '1px solid #222', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '250px', transition: 'all 0.3s ease' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#222';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <i className={ind.icon} style={{ color: '#10B981', fontSize: '1.5rem' }}></i>
                                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>{ind.title}</span>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </section>
                )}

                {/* Key Benefits Grid (Redesigned) */}
                <section className="service-benefits-section" style={{ padding: '80px 0', background: '#050505' }}>
                    <Container>
                        <div className="section-header text-center" style={{ marginBottom: '60px' }}>
                            <span className="enf-badge" style={{ color: '#10B981', fontWeight: 600, letterSpacing: '1px', marginBottom: '16px', display: 'inline-block' }}>WHY CHOOSE THIS</span>
                            <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>Key Business Benefits</h2>
                        </div>
                        <div className="service-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                            {service.benefits.map((benefit, idx) => (
                                <div key={idx} style={{ padding: '32px', background: '#111', borderRadius: '16px', border: '1px solid #10B98133', display: 'flex', alignItems: 'flex-start', gap: '16px', transition: 'transform 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Implementation Process Steps (Redesigned) */}
                <section className="service-process-section" style={{ padding: '100px 0', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Container>
                        <div className="section-header text-center" style={{ marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '16px' }}>{service.title === "ERPNext Implementation" ? "Our Proven Framework" : "Our Implementation Methodology"}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>A structured, sprint-based approach ensuring rapid deployment and zero operational downtime.</p>
                        </div>
                        <Row className="justify-content-center g-5">
                            {service.process.map((p, idx) => (
                                <Col md={6} lg={4} key={idx}>
                                    <div style={{ position: 'relative', height: '100%' }}>
                                        <div style={{
                                            width: '64px', height: '64px',
                                            background: '#111',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginBottom: '24px',
                                            border: '2px solid #10B981',
                                            color: '#10B981',
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                            position: 'relative',
                                            zIndex: 2,
                                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)'
                                        }}>
                                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                        </div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{p.step}</h4>
                                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.desc}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

            </main>
            <EnfonoFooter
                ctaTitle={
                    service.slug.includes('erp') ? `Ready to Transform Your Business with ${service.title.includes('ERPNext') ? 'ERPNext' : 'Custom ERP'}?` :
                        service.slug.includes('security') ? "Ready to Secure Your Business Cloud?" :
                            service.slug.includes('consulting') ? "Ready for a Strategic IT Roadmap?" :
                                service.slug.includes('mobile') ? "Ready to Build Your Mobile Experience?" :
                                    "Ready to Automate Your Operations?"
                }
                ctaSubtitle={
                    service.slug.includes('erp') ? "Join hundreds of GCC businesses scaling with agile ERP solutions." :
                        service.slug.includes('security') ? "Protect your assets with enterprise-grade cyber defense and AWS expertise." :
                            service.slug.includes('consulting') ? "Align your technology with business goals for maximum ROI." :
                                service.slug.includes('mobile') ? "Connect with your customers on the go with high-performance apps." :
                                    "Leverage Industry 4.0 and IoT to gain real-time physical control."
                }
            />
        </div >
    );
};

export default EnfonoServiceDetail;
