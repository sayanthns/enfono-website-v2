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
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            {/* Page Hero */}
            <div className="enfono-page-hero">
                <Container>
                    <nav aria-label="breadcrumb"><ol className="breadcrumb mb-4"><li className="breadcrumb-item"><Link to="/">Home</Link></li><li className="breadcrumb-item active">Services</li></ol></nav>
                    <span className="enfono-section-label">What We Do</span>
                    <h1 className="page-hero-title mb-4">Our ERP Services</h1>
                    <p className="page-hero-desc" style={{ maxWidth: '600px' }}>
                        End-to-end ERP solutions for GCC businesses — from strategy and implementation to ongoing support and optimization.
                    </p>
                </Container>
            </div>

            {/* Services Deep Dive */}
            <section style={{ background: '#F8FAFC', padding: '70px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        {services.map((svc, i) => (
                            <m.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                                style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', border: '1px solid #E5E7EB' }}
                            >
                                <Row className="g-0">
                                    <Col lg={4}>
                                        <div style={{ background: svc.gradient, padding: '50px 40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '360px' }}>
                                            <div>
                                                <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                                    <i className={svc.icon} style={{ fontSize: '26px', color: '#fff' }}></i>
                                                </div>
                                                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>{svc.tagline}</div>
                                                <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '16px', lineHeight: '1.3' }}>{svc.title}</h2>
                                                <p style={{ fontSize: '14px', lineHeight: '1.75', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>{svc.desc}</p>
                                            </div>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 18px', border: '1px solid rgba(255,255,255,0.15)' }}>
                                                <i className="fas fa-chart-bar" style={{ color: 'rgba(255,255,255,0.6)', marginRight: '8px', fontSize: '12px' }}></i>
                                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{svc.highlight}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div style={{ padding: '40px' }}>
                                            <Row>
                                                <Col md={7}>
                                                    <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#C4933F', marginBottom: '20px' }}>What's Included</div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                        {svc.features.map((f, j) => (
                                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#374151' }}>
                                                                <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}></i>
                                                                {f}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Col>
                                                <Col md={5} className="mt-4 mt-md-0">
                                                    <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#C4933F', marginBottom: '16px' }}>Modules Covered</div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                                                        {svc.modules.map((mod, j) => (
                                                            <span key={j} style={{ background: '#F0F4F8', color: '#1B3A5C', fontSize: '12px', fontWeight: '600', padding: '5px 12px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>{mod}</span>
                                                        ))}
                                                    </div>
                                                    <Link to={`/services/${svc.slug}`} className="btn-enfono-primary d-inline-block">
                                                        Learn More <i className="fas fa-arrow-right ms-2"></i>
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
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label">How We Work</m.span>
                            <m.h2 variants={fadeIn} className="enfono-section-title">Our Proven Delivery Process</m.h2>
                        </m.div>
                        <Row className="g-4">
                            {process.map((p, i) => (
                                <Col key={i} lg={2} md={4} sm={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ textAlign: 'center', position: 'relative' }}>
                                            <div style={{ width: '64px', height: '64px', background: i % 2 === 0 ? 'var(--enfono-gradient)' : '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: i % 2 !== 0 ? '2px solid #E5E7EB' : 'none' }}>
                                                <span style={{ fontSize: '16px', fontWeight: '800', color: i % 2 === 0 ? '#C4933F' : '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{p.step}</span>
                                            </div>
                                            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}>{p.title}</h4>
                                            <p style={{ fontSize: '13px', lineHeight: '1.65', color: '#6B7280', margin: 0 }}>{p.desc}</p>
                                        </div>
                                    </m.div>
                                </Col>
                            ))}
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            {/* CTA */}
            <section className="enfono-cta">
                <Container>
                    <div className="text-center">
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>Not Sure Which Service You Need?</h2>
                        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 32px' }}>Book a free consultation and our experts will help you identify the right ERP approach for your business.</p>
                        <Link to="/contact" style={{ background: '#fff', color: '#C4933F', padding: '14px 36px', borderRadius: '4px', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>Book Free Consultation</Link>
                    </div>
                </Container>
            </section>

            <EnfonoFooter />
        </div>
    )
}

export default EnfonoServices
