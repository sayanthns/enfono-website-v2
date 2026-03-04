import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const services = [
    {
        slug: 'erpnext-implementation',
        icon: 'fas fa-cubes',
        title: 'ERPNext Implementation',
        tagline: 'The #1 ERP for GCC Businesses',
        desc: 'End-to-end ERPNext deployment tailored for Saudi Arabia, UAE, and Oman. Our certified consultants handle everything from requirements gathering to training and go-live.',
        gradient: 'linear-gradient(135deg, #1B3A5C, #234b78)',
        features: [
            'Full ERPNext setup and configuration',
            'Arabic UI and RTL support',
            'ZATCA e-invoicing Phase 1 & 2',
            'VAT compliance for GCC countries',
            'Multi-company and multi-currency',
            'Data migration from legacy systems',
            'User training and documentation',
            'Post-go-live hypercare support',
        ],
        modules: ['Accounting', 'Inventory', 'Manufacturing', 'HR & Payroll', 'CRM', 'Projects', 'Purchase', 'Sales'],
        highlight: '30% average cost reduction in the first year'
    },
    {
        slug: 'custom-erp',
        icon: 'fas fa-code',
        title: 'Custom ERP Development',
        tagline: 'ERP Built Exactly For You',
        desc: 'When off-the-shelf doesn\'t fit, we engineer bespoke ERP systems from the ground up — leveraging ERPNext as a foundation or building fully custom solutions tailored to your unique workflows.',
        gradient: 'linear-gradient(135deg, #0D9488, #0EA5E9)',
        features: [
            'Requirements analysis and blueprint',
            'Custom module development on ERPNext',
            'Workflow automation and approvals',
            'Custom reporting and dashboards',
            'Third-party API integrations',
            'Mobile app development',
            'Scalable cloud architecture',
            'Performance optimization',
        ],
        modules: ['Custom Modules', 'API Integrations', 'Dashboards', 'Workflow Engine', 'Mobile Apps', 'Reports'],
        highlight: '100% fit to your business processes'
    },
    {
        slug: 'erp-consulting',
        icon: 'fas fa-chart-line',
        title: 'ERP Consulting',
        tagline: 'Strategy Before Technology',
        desc: 'ERP success starts with the right strategy. Our consultants work with your leadership team to assess your current state, define your future state, and create a clear roadmap for digital transformation.',
        gradient: 'linear-gradient(135deg, #C4933F, #d4a855)',
        features: [
            'Business process analysis and mapping',
            'ERP platform selection advisory',
            'ROI and TCO analysis',
            'Change management planning',
            'Gap analysis and fit assessment',
            'Digital transformation roadmap',
            'Vendor evaluation and negotiation',
            'Project governance framework',
        ],
        modules: ['Process Mapping', 'ROI Analysis', 'Platform Selection', 'Roadmap', 'Change Management'],
        highlight: '3x higher ERP success rate with proper consulting'
    },
    {
        slug: 'support-maintenance',
        icon: 'fas fa-headset',
        title: 'Support & Maintenance',
        tagline: 'Your ERP Never Sleeps',
        desc: 'Comprehensive post-implementation support to keep your ERP running smoothly. From bug fixes to version upgrades, performance tuning to user training — we\'ve got you covered.',
        gradient: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
        features: [
            'SLA-backed helpdesk support',
            'ERPNext version upgrades',
            'Performance monitoring and optimization',
            'Customization enhancements',
            'Database maintenance and backups',
            'Security patches and updates',
            'User training programs',
            'Monthly health reports',
        ],
        modules: ['Helpdesk', 'Monitoring', 'Upgrades', 'Training', 'Backup', 'Performance'],
        highlight: '< 4 hour response time for critical issues'
    },
]

const process = [
    { step: '01', title: 'Discovery', desc: 'We start by deeply understanding your business — processes, pain points, goals, and constraints.' },
    { step: '02', title: 'Blueprint', desc: 'We map out the exact solution architecture, modules, customizations, and implementation plan.' },
    { step: '03', title: 'Build & Configure', desc: 'Our technical team configures and customizes ERPNext to match your approved blueprint.' },
    { step: '04', title: 'Test & Train', desc: 'Rigorous UAT testing alongside comprehensive user training ensures a smooth go-live.' },
    { step: '05', title: 'Go Live', desc: 'We manage the go-live carefully with cutover planning and hypercare support.' },
    { step: '06', title: 'Optimize', desc: 'Continuous improvement post-launch — we monitor, optimize, and evolve with your business.' },
]

const EnfonoServices = () => {
    return (
        <div className="enfono-services-premium" style={{ background: '#0D0D0D', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            {/* Page Hero */}
            <div className="enfono-hero-new" style={{ padding: '140px 0 80px' }}>
                <Container>
                    <div className="e-breadcrumb" style={{ marginBottom: '32px' }}>
                        <Link to="/">Home</Link>
                        <i className="fas fa-chevron-right" />
                        <span>Services</span>
                    </div>
                    <m.div initial="hidden" animate="visible" variants={staggerContainer}>
                        <m.div variants={fadeIn} className="enfono-section-label-amber">Propelling Digital Growth</m.div>
                        <m.h1 variants={fadeIn} className="enfono-hero-title" style={{ maxWidth: '800px', marginBottom: '24px' }}>
                            Strategic ERP Solutions for<br />
                            Modern Enterprises
                        </m.h1>
                        <m.p variants={fadeIn} className="enfono-hero-subtitle" style={{ maxWidth: '640px', marginBottom: '0' }}>
                            End-to-end ERP implementations, business process optimization, and AI-driven orchestration tailored for the competitive GCC market.
                        </m.p>
                    </m.div>
                </Container>
            </div>

            {/* Services Deep Dive */}
            <section style={{ background: '#0D0D0D', padding: '100px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        {services.map((svc, i) => (
                            <m.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
                                className="e-service-card-premium"
                                style={{
                                    background: 'rgba(26, 26, 26, 0.4)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '32px',
                                    overflow: 'hidden',
                                    marginBottom: '40px',
                                    border: '1px solid rgba(16, 185, 129, 0.15)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                <Row className="g-0">
                                    <Col lg={4}>
                                        <div style={{ background: svc.gradient, padding: '60px 48px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none' }}></div>
                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                <div style={{ width: '72px', height: '72px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(5px)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                    <i className={svc.icon} style={{ fontSize: '28px', color: '#fff' }}></i>
                                                </div>
                                                <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>{svc.tagline}</div>
                                                <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px', lineHeight: '1.2' }}>{svc.title}</h2>
                                                <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>{svc.desc}</p>
                                            </div>
                                            <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(5px)', borderRadius: '12px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <i className="fas fa-bolt" style={{ color: '#34D399', marginRight: '10px', fontSize: '14px' }}></i>
                                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{svc.highlight}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div style={{ padding: '60px 52px' }}>
                                            <Row>
                                                <Col md={7}>
                                                    <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#10B981', marginBottom: '28px' }}>Scope of Services</div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                                                        {svc.features.map((f, j) => (
                                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#A1A1AA' }}>
                                                                <span style={{ width: '18px', height: '18px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                                                    <i className="fas fa-check" style={{ color: '#10B981', fontSize: '9px' }}></i>
                                                                </span>
                                                                {f}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Col>
                                                <Col md={5} className="mt-5 mt-md-0">
                                                    <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#10B981', marginBottom: '20px' }}>Capabilities</div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                                                        {svc.modules.map((mod, j) => (
                                                            <span key={j} style={{ background: 'rgba(255,255,255,0.03)', color: '#E4E4E7', fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>{mod}</span>
                                                        ))}
                                                    </div>
                                                    <Link to={`/services/${svc.slug}`} className="ehero-btn-primary" style={{ padding: '14px 28px', fontSize: '14px' }}>
                                                        Explore Detail <i className="fas fa-arrow-right ms-2"></i>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </m.div>
                        ))}
                    </LazyMotion>
                </Container>
            </section>

            {/* Our Process */}
            <section style={{ background: '#080808', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center" style={{ marginBottom: '80px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label-amber">The Enfono Methodology</m.span>
                            <m.h2 variants={fadeIn} className="enfono-hero-title" style={{ fontSize: '42px', margin: '16px 0' }}>Our Proven Framework</m.h2>
                            <m.p variants={fadeIn} className="enfono-hero-subtitle" style={{ margin: '0 auto' }}>A systematic approach to ensuring your ERP transformation is seamless, scalable, and successful.</m.p>
                        </m.div>
                        <Row className="g-5">
                            {process.map((p, i) => (
                                <Col key={i} lg={2} md={4} sm={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '76px', height: '76px',
                                                background: i % 2 === 0 ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'rgba(255,255,255,0.03)',
                                                borderRadius: '24px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                margin: '0 auto 24px',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                transform: 'rotate(-5deg)',
                                                boxShadow: i % 2 === 0 ? '0 10px 20px rgba(16, 185, 129, 0.2)' : 'none'
                                            }}>
                                                <span style={{ fontSize: '20px', fontWeight: '900', color: i % 2 === 0 ? '#fff' : '#10B981', fontFamily: 'Poppins, sans-serif', transform: 'rotate(5deg)' }}>{p.step}</span>
                                            </div>
                                            <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>{p.title}</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#71717A', margin: 0 }}>{p.desc}</p>
                                        </div>
                                    </m.div>
                                </Col>
                            ))}
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            {/* CTA */}
            <section className="enfono-footer-cta-band" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0F766E 0%, #34D399 100%)' }}>
                <Container>
                    <div className="text-center">
                        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>Ready to Scale Your GCC Operations?</h2>
                        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 40px' }}>Book a free 60-minute strategy session with our industry experts and find the perfect ERP path for your business.</p>
                        <Link to="/contact" className="ehero-btn-primary" style={{ background: '#fff', color: '#0F766E', border: 'none', padding: '18px 48px' }}>Book Strategy Session <i className="fas fa-arrow-right ms-2"></i></Link>
                    </div>
                </Container>
            </section>

            <EnfonoFooter />
        </div>
    )
}

export default EnfonoServices
