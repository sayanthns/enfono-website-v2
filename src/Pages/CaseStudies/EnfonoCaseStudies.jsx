import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const categories = ['All', 'Manufacturing', 'Retail', 'Construction', 'Healthcare', 'Food & Beverage']

const caseStudies = [
    {
        id: 1,
        category: 'Manufacturing',
        country: 'Saudi Arabia',
        flag: '🇸🇦',
        title: 'Al-Rashid Manufacturing Group',
        subtitle: 'Full ERPNext rollout for 3 manufacturing plants',
        challenge: 'Disparate legacy systems across 3 plants with no real-time visibility into production, inventory, or financials.',
        solution: 'End-to-end ERPNext implementation covering Manufacturing, Inventory, Accounting, HR, and ZATCA e-invoicing.',
        results: [
            { metric: '35%', label: 'Cost Reduction' },
            { metric: '60%', label: 'Faster Reporting' },
            { metric: '99.9%', label: 'Inventory Accuracy' },
        ],
        gradient: 'linear-gradient(135deg, #1B3A5C 0%, #234b78 100%)',
        icon: 'fas fa-industry',
        duration: '6 months',
        users: '120+',
        modules: ['Manufacturing', 'Inventory', 'Accounting', 'HR', 'ZATCA']
    },
    {
        id: 2,
        category: 'Retail',
        country: 'UAE',
        flag: '🇦🇪',
        title: 'Dubai Retail Chain',
        subtitle: 'Unified POS and inventory for 50 stores',
        challenge: 'Managing inventory and sales data across 50 stores with inconsistent data and manual reconciliation.',
        solution: 'ERPNext with custom POS module, real-time inventory sync, and centralized financial reporting across all locations.',
        results: [
            { metric: '50', label: 'Stores Unified' },
            { metric: '45%', label: 'Stock Waste Reduced' },
            { metric: '3x', label: 'Faster Reconciliation' },
        ],
        gradient: 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)',
        icon: 'fas fa-store',
        duration: '4 months',
        users: '200+',
        modules: ['POS', 'Retail', 'Inventory', 'Accounting']
    },
    {
        id: 3,
        category: 'Construction',
        country: 'Oman',
        flag: '🇴🇲',
        title: 'Muscat Construction Group',
        subtitle: 'Project costing and procurement management',
        challenge: 'Project cost overruns due to lack of real-time budgeting, and inefficient subcontractor and procurement management.',
        solution: 'ERPNext customized for construction — project costing, subcontractor billing, procurement workflows, and progress billing.',
        results: [
            { metric: '28%', label: 'Cost Overrun Reduction' },
            { metric: '40%', label: 'Procurement Speed' },
            { metric: '100%', label: 'Project Visibility' },
        ],
        gradient: 'linear-gradient(135deg, #C4933F 0%, #d4a855 100%)',
        icon: 'fas fa-hard-hat',
        duration: '5 months',
        users: '80+',
        modules: ['Projects', 'Procurement', 'Accounting', 'HR']
    },
    {
        id: 4,
        category: 'Healthcare',
        country: 'Saudi Arabia',
        flag: '🇸🇦',
        title: 'Riyadh Medical Center',
        subtitle: 'Healthcare operations digitization',
        challenge: 'Paper-based processes for patient billing, pharmacy inventory, and staff scheduling causing delays and errors.',
        solution: 'Custom healthcare ERP with patient management, pharmacy inventory, staff scheduling, and insurance billing integration.',
        results: [
            { metric: '70%', label: 'Billing Errors Eliminated' },
            { metric: '50%', label: 'Admin Time Saved' },
            { metric: '98%', label: 'Pharmacy Accuracy' },
        ],
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)',
        icon: 'fas fa-hospital',
        duration: '8 months',
        users: '150+',
        modules: ['Healthcare', 'Pharmacy', 'HR', 'Billing']
    },
    {
        id: 5,
        category: 'Food & Beverage',
        country: 'UAE',
        flag: '🇦🇪',
        title: 'Emirates F&B Group',
        subtitle: 'Restaurant chain supply chain optimization',
        challenge: 'Food waste and supply chain inefficiencies across 30 restaurant outlets with no centralized procurement.',
        solution: 'ERPNext with recipe management, ingredient-level inventory, multi-outlet POS, and supplier management.',
        results: [
            { metric: '32%', label: 'Food Waste Reduction' },
            { metric: '25%', label: 'Lower Procurement Costs' },
            { metric: '30', label: 'Outlets Connected' },
        ],
        gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
        icon: 'fas fa-utensils',
        duration: '3 months',
        users: '100+',
        modules: ['Restaurant POS', 'Inventory', 'Procurement', 'Accounting']
    },
    {
        id: 6,
        category: 'Manufacturing',
        country: 'Saudi Arabia',
        flag: '🇸🇦',
        title: 'SABIC-tier Plastics Manufacturer',
        subtitle: 'Custom ERP for batch production tracking',
        challenge: 'No traceability in batch manufacturing with compliance reporting required for government tenders.',
        solution: 'Custom ERPNext module for batch tracking, quality control, compliance reporting, and integration with SABER certification portal.',
        results: [
            { metric: '100%', label: 'Batch Traceability' },
            { metric: '80%', label: 'Compliance Report Time' },
            { metric: '20%', label: 'Quality Rejections Down' },
        ],
        gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        icon: 'fas fa-cogs',
        duration: '7 months',
        users: '60+',
        modules: ['Manufacturing', 'Quality', 'Compliance', 'Accounting']
    }
]

const EnfonoCaseStudies = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const filtered = activeCategory === 'All' ? caseStudies : caseStudies.filter(c => c.category === activeCategory)

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            {/* Hero */}
            <div className="enfono-page-hero">
                <Container>
                    <nav aria-label="breadcrumb"><ol className="breadcrumb mb-4"><li className="breadcrumb-item"><Link to="/">Home</Link></li><li className="breadcrumb-item active">Case Studies</li></ol></nav>
                    <span className="enfono-section-label">Client Success Stories</span>
                    <h1 className="page-hero-title mb-4">Our Case Studies</h1>
                    <p className="page-hero-desc" style={{ maxWidth: '600px' }}>
                        Real implementations. Real results. Discover how Enfono has transformed businesses across the GCC with ERPNext and custom ERP solutions.
                    </p>
                </Container>
            </div>

            {/* Filter + Grid */}
            <section style={{ background: '#F8FAFC', padding: '70px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        {/* Filter Tabs */}
                        <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="d-flex gap-2 mb-12 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        background: activeCategory === cat ? '#1B3A5C' : '#fff',
                                        color: activeCategory === cat ? '#fff' : '#374151',
                                        border: `1px solid ${activeCategory === cat ? '#1B3A5C' : '#E5E7EB'}`,
                                        borderRadius: '8px',
                                        padding: '10px 22px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </m.div>

                        <Row className="g-4">
                            {filtered.map((cs, i) => (
                                <Col key={cs.id} lg={4} md={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', height: '100%', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(27,58,92,0.12)' }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                                        >
                                            {/* Card Header */}
                                            <div style={{ background: cs.gradient, padding: '32px', position: 'relative' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{cs.flag} {cs.country}</span>
                                                    <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '4px', color: 'rgba(255,255,255,0.85)' }}>{cs.category}</span>
                                                </div>
                                                <i className={cs.icon} style={{ fontSize: '36px', color: 'rgba(255,255,255,0.3)', marginBottom: '14px', display: 'block' }}></i>
                                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '6px', lineHeight: '1.3' }}>{cs.title}</h3>
                                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{cs.subtitle}</p>
                                            </div>

                                            {/* Results */}
                                            <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6' }}>
                                                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '16px' }}>Key Results</div>
                                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
                                                    {cs.results.map((r, j) => (
                                                        <div key={j} style={{ textAlign: 'center' }}>
                                                            <div style={{ fontSize: '22px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{r.metric}</div>
                                                            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{r.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Meta */}
                                            <div style={{ padding: '20px 24px', display: 'flex', gap: '20px', marginTop: 'auto' }}>
                                                <div style={{ fontSize: '13px', color: '#6B7280' }}><i className="fas fa-clock" style={{ color: '#C4933F', marginRight: '6px' }}></i>{cs.duration}</div>
                                                <div style={{ fontSize: '13px', color: '#6B7280' }}><i className="fas fa-users" style={{ color: '#C4933F', marginRight: '6px' }}></i>{cs.users} users</div>
                                            </div>
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
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
                            Ready to Write Your Success Story?
                        </h2>
                        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 32px' }}>
                            Join 100+ businesses that trust Enfono for their ERP transformation.
                        </p>
                        <Link to="/contact" style={{ background: '#fff', color: '#C4933F', padding: '14px 36px', borderRadius: '4px', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>
                            Book Free Consultation
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <EnfonoFooter />
        </div>
    )
}

export default EnfonoCaseStudies
