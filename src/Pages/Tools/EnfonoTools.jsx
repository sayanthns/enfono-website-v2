import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const toolCategories = ['All', 'Compliance', 'Planning', 'Finance', 'Operations']

const tools = [
    {
        id: 1,
        category: 'Compliance',
        icon: 'fas fa-file-invoice',
        title: 'ZATCA VAT Invoice Generator',
        desc: 'Generate ZATCA Phase 1 & Phase 2 compliant e-invoices for Saudi Arabia. Supports Arabic and English, QR code generation, and XML output.',
        tags: ['Saudi Arabia', 'ZATCA', 'e-Invoicing'],
        badge: 'POPULAR',
        badgeColor: '#10B981',
        features: ['Phase 2 QR Code', 'Arabic & English', 'XML Export', 'PDF Download'],
        color: '#1B3A5C'
    },
    {
        id: 2,
        category: 'Planning',
        icon: 'fas fa-calculator',
        title: 'ERP ROI Calculator',
        desc: 'Estimate the return on investment for your ERPNext implementation. Input your business size, current processes, and get a detailed ROI projection.',
        tags: ['ROI', 'Planning', 'Finance'],
        badge: 'FREE',
        badgeColor: '#0EA5E9',
        features: ['3-Year Projection', 'Industry Benchmarks', 'PDF Report', 'GCC Specific'],
        color: '#0D9488'
    },
    {
        id: 3,
        category: 'Planning',
        icon: 'fas fa-clipboard-check',
        title: 'ERP Readiness Assessment',
        desc: 'Answer 30 questions about your business processes, data quality, and team readiness to get a comprehensive ERP readiness score.',
        tags: ['Assessment', 'Planning', 'Strategy'],
        badge: 'FREE',
        badgeColor: '#0EA5E9',
        features: ['30 Questions', 'Instant Score', 'Gap Analysis', 'Action Plan'],
        color: '#C4933F'
    },
    {
        id: 4,
        category: 'Finance',
        icon: 'fas fa-percentage',
        title: 'GCC VAT Calculator',
        desc: 'Calculate VAT for all GCC countries (Saudi Arabia 15%, UAE 5%, Bahrain 10%, Oman 5%). Bulk calculation supported.',
        tags: ['VAT', 'Finance', 'GCC'],
        badge: 'FREE',
        badgeColor: '#0EA5E9',
        features: ['All GCC Countries', 'Reverse VAT', 'Bulk Mode', 'Excel Export'],
        color: '#7C3AED'
    },
    {
        id: 5,
        category: 'Operations',
        icon: 'fas fa-tasks',
        title: 'Data Migration Checklist',
        desc: 'A comprehensive, downloadable checklist for ERP data migration — covering master data, transactions, and validation steps.',
        tags: ['Migration', 'Data', 'Checklist'],
        badge: 'FREE',
        badgeColor: '#0EA5E9',
        features: ['150+ Checklist Items', 'Excel Format', 'Phase-wise', 'Risk Register'],
        color: '#DC2626'
    },
    {
        id: 6,
        category: 'Planning',
        icon: 'fas fa-sitemap',
        title: 'ERP Project Plan Template',
        desc: 'A ready-to-use MS Project / Excel ERPNext implementation plan template with typical 6-month timeline, milestones, and resource allocation.',
        tags: ['Project Management', 'Template', 'Planning'],
        badge: 'FREE',
        badgeColor: '#0EA5E9',
        features: ['6-Month Timeline', 'Resource Planning', 'Milestones', 'Risk Log'],
        color: '#059669'
    },
    {
        id: 7,
        category: 'Finance',
        icon: 'fas fa-chart-pie',
        title: 'ERP TCO Calculator',
        desc: 'Calculate the Total Cost of Ownership for ERPNext vs SAP vs Oracle vs Microsoft Dynamics — including licensing, implementation, and support costs.',
        tags: ['TCO', 'Comparison', 'Finance'],
        badge: 'NEW',
        badgeColor: '#F97316',
        features: ['4 ERP Platforms', '5-Year TCO', 'Hidden Costs', 'Comparison Chart'],
        color: '#1B3A5C'
    },
    {
        id: 8,
        category: 'Compliance',
        icon: 'fas fa-shield-alt',
        title: 'PDPL Compliance Checklist',
        desc: 'Saudi Arabia Personal Data Protection Law compliance checklist for ERP systems. Ensure your ERPNext setup meets PDPL requirements.',
        tags: ['PDPL', 'Compliance', 'Saudi Arabia'],
        badge: 'NEW',
        badgeColor: '#F97316',
        features: ['50+ Checks', 'PDPL Aligned', 'ERP Specific', 'Report'],
        color: '#C4933F'
    },
]

const EnfonoTools = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const filtered = activeCategory === 'All' ? tools : tools.filter(t => t.category === activeCategory)

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            <div className="enfono-page-hero">
                <Container>
                    <nav aria-label="breadcrumb"><ol className="breadcrumb mb-4"><li className="breadcrumb-item"><Link to="/">Home</Link></li><li className="breadcrumb-item active">Free Tools</li></ol></nav>
                    <span className="enfono-section-label">Free Resources</span>
                    <h1 className="page-hero-title mb-4">Free ERP Tools</h1>
                    <p className="page-hero-desc" style={{ maxWidth: '600px' }}>A growing library of free tools, calculators, and templates designed specifically for GCC businesses on their ERP journey.</p>
                </Container>
            </div>

            <section style={{ background: '#F8FAFC', padding: '70px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="d-flex gap-2 mb-12 flex-wrap">
                            {toolCategories.map((cat) => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                    background: activeCategory === cat ? '#1B3A5C' : '#fff',
                                    color: activeCategory === cat ? '#fff' : '#374151',
                                    border: `1px solid ${activeCategory === cat ? '#1B3A5C' : '#E5E7EB'}`,
                                    borderRadius: '8px', padding: '10px 22px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease'
                                }}>{cat}</button>
                            ))}
                        </m.div>
                        <Row className="g-4">
                            {filtered.map((tool, i) => (
                                <Col key={tool.id} lg={3} md={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E5E7EB', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(27,58,92,0.12)' }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                                        >
                                            <div style={{ background: tool.color, padding: '28px', position: 'relative' }}>
                                                <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', background: tool.badgeColor, color: '#fff', padding: '3px 10px', borderRadius: '4px' }}>{tool.badge}</span>
                                                <i className={tool.icon} style={{ fontSize: '32px', color: 'rgba(255,255,255,0.9)' }}></i>
                                            </div>
                                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif', marginBottom: '10px', lineHeight: '1.4' }}>{tool.title}</h4>
                                                <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B7280', marginBottom: '16px', flex: 1 }}>{tool.desc}</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                                    {tool.features.map((f, j) => (
                                                        <span key={j} style={{ background: '#F0F4F8', color: '#374151', fontSize: '11px', fontWeight: '500', padding: '3px 8px', borderRadius: '4px' }}>{f}</span>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                    {tool.tags.map((tag, j) => (
                                                        <span key={j} style={{ fontSize: '11px', color: '#9CA3AF' }}>#{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ padding: '0 24px 24px' }}>
                                                <button style={{ width: '100%', background: tool.color, color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s' }}
                                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                                >
                                                    <i className="fas fa-download me-2"></i>Use Free Tool
                                                </button>
                                            </div>
                                        </div>
                                    </m.div>
                                </Col>
                            ))}
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            <section className="enfono-cta">
                <Container>
                    <div className="text-center">
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>Need a Custom ERP Tool?</h2>
                        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 32px' }}>Tell us what you need and we'll build it — many of our free tools were built from client requests.</p>
                        <Link to="/contact" style={{ background: '#fff', color: '#C4933F', padding: '14px 36px', borderRadius: '4px', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>Request a Tool</Link>
                    </div>
                </Container>
            </section>

            <EnfonoFooter />
        </div>
    )
}

export default EnfonoTools
