import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader';
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter';
import { servicesData } from '../../Data/services_data';
import { initialCmsData } from '../../Data/cms_data';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const EnfonoServices = () => {
    const [cmsData, setCmsData] = React.useState(initialCmsData);

    React.useEffect(() => {
        const saved = localStorage.getItem('enfono_cms_data');
        if (saved) setCmsData(JSON.parse(saved));
    }, []);

    const projectsDelivered = cmsData.stats.find(s => s.label === 'Projects Delivered') || { value: '50', suffix: '+' };

    return (
        <div className="enfono-services-premium" style={{ background: '#0D0D0D', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            {/* Page Hero - Outcome Focused */}
            <div className="enfono-hero-new" style={{ padding: '160px 0 100px', position: 'relative', overflow: 'hidden' }}>
                <Container style={{ position: 'relative', zIndex: 2 }}>
                    <m.div className="text-center" initial="hidden" animate="visible" variants={staggerContainer}>
                        <m.div variants={fadeIn} className="enfono-section-label-amber" style={{ display: 'inline-block', marginBottom: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '6px 16px', borderRadius: '20px', fontWeight: 600 }}>Enterprise Solutions</m.div>
                        <m.h1 variants={fadeIn} className="enfono-hero-title" style={{ maxWidth: '900px', margin: '0 auto 24px', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
                            {cmsData.services_hero.heading}
                        </m.h1>
                        <m.p variants={fadeIn} className="enfono-hero-subtitle" style={{ maxWidth: '700px', margin: '0 auto 40px', fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            {cmsData.services_hero.subtext}
                        </m.p>
                        <m.div variants={fadeIn}>
                            <a href={cmsData.services_hero.cta_url} target="_blank" rel="noopener noreferrer" className="enf-btn primary" style={{ background: '#10B981', color: '#fff', padding: '18px 40px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block', fontSize: '1.1rem' }}>
                                {cmsData.services_hero.cta_primary} <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                            </a>
                            <div style={{ marginTop: '24px', display: 'flex', gap: '24px', justifyContent: 'center', opacity: 0.7, fontSize: '0.9rem', fontWeight: 500 }}>
                                <span><i className="fas fa-check-circle text-emerald-500 mr-2"></i> {`${projectsDelivered.value}${projectsDelivered.suffix}`} Projects Delivered</span>
                                <span><i className="fas fa-check-circle text-emerald-500 mr-2"></i> Certified Experts</span>
                            </div>
                        </m.div>
                    </m.div>
                </Container>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            </div>

            {/* Business Problems Section */}
            <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
                <Container>
                    <div className="text-center" style={{ marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>Why Businesses Choose Us</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>We solve the complex operational bottlenecks that prevent companies from scaling past their current plateau.</p>
                    </div>
                    <Row className="g-4">
                        {[
                            { title: 'Disconnected Systems', desc: 'Accounting, inventory, and sales operating in silos, requiring manual data entry across platforms.', icon: 'fas fa-link' },
                            { title: 'Lack of Real-Time Insights', desc: 'Making critical decisions based on month-old reports rather than real-time dashboards.', icon: 'fas fa-chart-pie' },
                            { title: 'Outdated Legacy Tech', desc: 'Slow, unsecure, and costly legacy software severely bottlenecking workflow efficiency.', icon: 'fas fa-server' }
                        ].map((prob, i) => (
                            <Col md={4} key={i}>
                                <div style={{ background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222', height: '100%' }}>
                                    <div style={{ width: '56px', height: '56px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '24px' }}>
                                        <i className={prob.icon}></i>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>{prob.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{prob.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Core Services Grid */}
            <section style={{ padding: '120px 0', background: '#0D0D0D' }}>
                <Container>
                    <div className="text-center" style={{ marginBottom: '80px' }}>
                        <span className="enfono-section-label-amber" style={{ display: 'inline-block', marginBottom: '16px', color: '#10B981', fontWeight: 600, letterSpacing: '1px' }}>OUR CAPABILITIES</span>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '24px' }}>Comprehensive IT Services</h2>
                    </div>

                    <LazyMotion features={domAnimation}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                            {servicesData.map((svc, i) => (
                                <m.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn}
                                    style={{
                                        background: '#111',
                                        borderRadius: '24px',
                                        padding: '40px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                                        <i className={svc.features[0].icon} style={{ fontSize: '28px', color: '#fff' }}></i>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>{svc.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>{svc.short_desc}</p>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {svc.tech_stack.slice(0, 3).map((tech, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                                                <i className="fas fa-check" style={{ color: '#10B981', fontSize: '10px' }}></i> {tech.name}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to={`/services/${svc.slug}`} style={{ color: '#10B981', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}>
                                        Explore Scope & Details <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </m.div>
                            ))}
                        </div>
                    </LazyMotion>
                </Container>
            </section>

            {/* Our Process - Timelined */}
            <section style={{ background: '#050505', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center" style={{ marginBottom: '80px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label-amber" style={{ color: '#10B981' }}>The Methodology</m.span>
                            <m.h2 variants={fadeIn} className="enfono-hero-title" style={{ fontSize: '3rem', margin: '16px 0' }}>How We Deliver Excellence</m.h2>
                        </m.div>
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
                                    {[
                                        { step: '01', title: 'Discovery & Audit', desc: 'Analyzing current systems and defining technical roadmaps.' },
                                        { step: '02', title: 'Architecture Mapping', desc: 'Designing the database schemas and UI/UX prototypes.' },
                                        { step: '03', title: 'Agile Development', desc: 'Iterative sprints for module and API development.' },
                                        { step: '04', title: 'UAT & Training', desc: 'Rigorous testing followed by comprehensive team training.' }
                                    ].map((p, i) => (
                                        <m.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ position: 'relative' }}>
                                            <div style={{
                                                width: '64px', height: '64px',
                                                background: '#111',
                                                borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '24px',
                                                border: '2px solid #10B981',
                                                color: '#10B981',
                                                fontWeight: 700,
                                                fontSize: '1.25rem'
                                            }}>
                                                {p.step}
                                            </div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{p.title}</h4>
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.desc}</p>
                                        </m.div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            {/* Enterprise Tech Stack */}
            <section style={{ padding: '100px 0', background: '#0a0a0a' }}>
                <Container className="text-center">
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '60px' }}>Technologies We Master</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', opacity: 0.7 }}>
                        {[
                            { icon: 'fab fa-python', name: 'Python' },
                            { icon: 'fas fa-cube', name: 'ERPNext' },
                            { icon: 'fab fa-react', name: 'React' },
                            { icon: 'fab fa-node-js', name: 'Node.js' },
                            { icon: 'fab fa-aws', name: 'AWS' },
                            { icon: 'fas fa-mobile-alt', name: 'Flutter' },
                            { icon: 'fab fa-docker', name: 'Docker' }
                        ].map((tech, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <i className={tech.icon} style={{ fontSize: '48px', color: '#fff' }}></i>
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="enfono-footer-cta-band" style={{ padding: '100px 0', background: '#10B981' }}>
                <Container>
                    <div className="text-center">
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>Ready to Scale Your Operations?</h2>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 40px' }}>Book a free strategy session with our technical architects and find the perfect path for your digital transformation.</p>
                        <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="enf-btn dark-outline" style={{ background: '#0D0D0D', color: '#fff', padding: '18px 48px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                            Book Strategy Session <i className="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </Container>
            </section>

            <EnfonoFooter hideCta={true} />
        </div>
    )
}

export default EnfonoServices
