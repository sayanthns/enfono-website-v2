import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { initialCmsData } from '../../Data/cms_data'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import GlobalContext from '../../Context/Context'

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const getCategoryStyle = (category) => {
    switch (category) {
        case 'Manufacturing': return { gradient: 'linear-gradient(135deg, #1B3A5C 0%, #234b78 100%)', icon: 'fas fa-industry' };
        case 'Retail': return { gradient: 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)', icon: 'fas fa-store' };
        case 'Construction': return { gradient: 'linear-gradient(135deg, #C4933F 0%, #d4a855 100%)', icon: 'fas fa-hard-hat' };
        case 'Healthcare': return { gradient: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)', icon: 'fas fa-hospital' };
        case 'Food & Beverage': return { gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)', icon: 'fas fa-utensils' };
        case 'Govt': return { gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)', icon: 'fas fa-landmark' };
        case 'Logistics': return { gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)', icon: 'fas fa-truck' };
        case 'Trading': return { gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)', icon: 'fas fa-exchange-alt' };
        case 'Oil & Gas': return { gradient: 'linear-gradient(135deg, #B91C1C 0%, #F87171 100%)', icon: 'fas fa-burn' };
        default: return { gradient: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)', icon: 'fas fa-briefcase' };
    }
}



const EnfonoCaseStudies = () => {
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;
    const [activeCategory, setActiveCategory] = useState('All')
    const [mobileOpen, setMobileOpen] = useState(false)

    const categories = ['All', ...(data.our_work_categories || [])]
    const filtered = activeCategory === 'All' ? (data.our_work || []) : (data.our_work || []).filter(c => c.category === activeCategory)


    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

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
                    <div className="e-cs-content-wrapper">
                        {/* Filter Tabs */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="e-filter-row d-flex gap-2 mb-12 flex-nowrap"
                            style={{
                                paddingBottom: '12px',
                                overflowX: 'auto',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
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
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>

                        <Row className="g-4">
                            {filtered.map((cs, i) => {
                                const style = getCategoryStyle(cs.category);
                                const headerBg = cs.image
                                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('${cs.image}') center/cover`
                                    : style.gradient;

                                return (
                                    <Col key={cs.id || i} lg={4} md={6}>
                                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ height: '100%' }}>
                                            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', height: '100%', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(27,58,92,0.12)' }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                                            >
                                                {/* Card Header */}
                                                <div style={{ background: headerBg, padding: '32px', position: 'relative' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{cs.flag} {cs.country}</span>
                                                        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '4px', color: 'rgba(255,255,255,0.85)' }}>{cs.category}</span>
                                                    </div>
                                                    {cs.logo ? (
                                                        <img src={cs.logo} alt={cs.title} style={{ height: '40px', marginBottom: '14px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                                                    ) : (
                                                        <i className={style.icon} style={{ fontSize: '36px', color: 'rgba(255,255,255,0.3)', marginBottom: '14px', display: 'block' }}></i>
                                                    )}
                                                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '6px', lineHeight: '1.3' }}>
                                                        {cs.url ? <a href={cs.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{cs.title} <i className="fas fa-external-link-alt" style={{ fontSize: '12px', marginLeft: '4px', opacity: 0.6 }}></i></a> : cs.title}
                                                    </h3>
                                                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{cs.subtitle}</p>
                                                </div>

                                                {/* Results / List */}
                                                <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6', flexGrow: 1 }}>
                                                    {cs.results && cs.results.length > 0 ? (
                                                        <>
                                                            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '16px' }}>Key Results</div>
                                                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
                                                                {cs.results.map((r, j) => (
                                                                    <div key={j} style={{ textAlign: 'center' }}>
                                                                        <div style={{ fontSize: '22px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{r.metric}</div>
                                                                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{r.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {cs.outcome && (
                                                                <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>{cs.outcome}</p>
                                                            )}
                                                            {cs.bullets && cs.bullets.length > 0 && (
                                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                    {cs.bullets.map((b, j) => (
                                                                        <li key={j} style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                                            <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '3px', fontSize: '12px', flexShrink: 0 }}></i>
                                                                            <span>{b}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                {/* Meta */}
                                                {(cs.duration || cs.users) && (
                                                    <div style={{ padding: '20px 24px', display: 'flex', gap: '20px' }}>
                                                        {cs.duration && <div style={{ fontSize: '13px', color: '#6B7280' }}><i className="fas fa-clock" style={{ color: '#10B981', marginRight: '6px' }}></i>{cs.duration}</div>}
                                                        {cs.users && <div style={{ fontSize: '13px', color: '#6B7280' }}><i className="fas fa-users" style={{ color: '#10B981', marginRight: '6px' }}></i>{cs.users} users</div>}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
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
