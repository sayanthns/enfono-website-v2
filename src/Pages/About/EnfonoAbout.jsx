import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import { initialCmsData } from '../../Data/cms_data'

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
}
const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
}
const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
}

const values = [
    { icon: 'fas fa-bullseye', title: 'Client-First Mindset', desc: 'Every decision we make is guided by what delivers the best outcome for our clients. We\'re partners in your success, not just vendors.' },
    { icon: 'fas fa-medal', title: 'Excellence in Delivery', desc: 'We hold ourselves to the highest standards of quality in every implementation — on time, within budget, with zero compromise.' },
    { icon: 'fas fa-handshake', title: 'Long-Term Partnership', desc: 'We build relationships that last. Our post-go-live support and continuous optimization ensure your ERP evolves with your business.' },
    { icon: 'fas fa-lightbulb', title: 'Innovation Driven', desc: 'We stay ahead of ERP trends so you don\'t have to. From AI automation to ZATCA compliance — we bring the future to your business.' },
    { icon: 'fas fa-users', title: 'Team of Experts', desc: 'Our consultants bring deep domain knowledge across finance, supply chain, HR, and manufacturing — not just technical expertise.' },
    { icon: 'fas fa-globe-asia', title: 'GCC Cultural Fit', desc: 'Born in the GCC ecosystem, we understand the local business culture, regulatory environment, and the pace of digital transformation in the region.' },
]

const StatCounter = ({ end, suffix, label }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
    return (
        <div ref={ref} className="text-center">
            <div style={{ fontSize: '52px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>
                {inView ? <CountUp end={end} duration={2.5} /> : '0'}{suffix}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontWeight: '500' }}>{label}</div>
        </div>
    )
}

const EnfonoAbout = () => {
    const data = initialCmsData.about;

    // Sorting team by order number
    const sortedTeam = useMemo(() => {
        return [...data.team].sort((a, b) => (a.order || 99) - (b.order || 99));
    }, [data.team]);

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            {/* Page Hero */}
            <div className="enfono-page-hero">
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div initial="hidden" animate="visible" variants={staggerContainer}>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">About Us</li>
                                </ol>
                            </nav>
                            <m.span variants={fadeIn} className="enfono-section-label">Our Story</m.span>
                            <m.h1 variants={fadeIn} className="page-hero-title mb-4">About Enfono</m.h1>
                            <m.p variants={fadeIn} className="page-hero-desc" style={{ maxWidth: '600px' }}>
                                A GCC-focused ERP company born from a passion for digital transformation — helping businesses across Saudi Arabia, UAE, and Oman unlock the power of ERPNext and custom ERP solutions.
                            </m.p>
                        </m.div>
                    </LazyMotion>
                </Container>
            </div>

            {/* Mission & Vision */}
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <LazyMotion features={domAnimation}>
                                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
                                    <span className="enfono-section-label">Who We Are</span>
                                    <h2 className="enfono-section-title mb-5">
                                        {data.who_we_are.heading}
                                    </h2>
                                    <p style={{ fontSize: '16px', lineHeight: '1.85', color: '#4b5563', marginBottom: '36px' }}>
                                        {data.who_we_are.subtext}
                                    </p>
                                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                                        {data.who_we_are.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div style={{ fontSize: '42px', fontWeight: '700', color: '#111827', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>{stat.end}{stat.suffix}</div>
                                                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </m.div>
                            </LazyMotion>
                        </Col>
                        <Col lg={6}>
                            <LazyMotion features={domAnimation}>
                                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight}>
                                    <Row className="g-4">
                                        {[
                                            { icon: 'fas fa-eye', label: 'Our Vision', text: 'To be the most trusted ERP partner for enterprises across the GCC, enabling every business to reach its full potential through technology.' },
                                            { icon: 'fas fa-rocket', label: 'Our Mission', text: 'Delivering ERP solutions that are perfectly tailored to the GCC market — compliant, culturally aligned, and built for long-term growth.' },
                                        ].map((item, i) => (
                                            <Col md={12} key={i}>
                                                <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB' }}>
                                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                                        <div style={{ width: '50px', height: '50px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <i className={item.icon} style={{ color: '#10B981', fontSize: '20px' }}></i>
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#10B981', marginBottom: '8px' }}>{item.label}</div>
                                                            <p style={{ fontSize: '15px', lineHeight: '1.75', color: '#374151', margin: 0 }}>{item.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </m.div>
                            </LazyMotion>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Stats Banner */}
            <section style={{ background: 'var(--enfono-gradient)', padding: '70px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <Row className="g-4 justify-content-center text-center">
                                {[
                                    { end: 5, suffix: '+', label: 'Years of Excellence' },
                                    { end: 120, suffix: '+', label: 'Successful Implementations' },
                                    { end: 30, suffix: '+', label: 'Team Members' },
                                    { end: 6, suffix: '', label: 'Countries Served' },
                                    { end: 98, suffix: '%', label: 'Client Satisfaction' },
                                ].map((s, i) => (
                                    <Col key={i} lg={2} md={4} sm={6}>
                                        <m.div variants={fadeIn}>
                                            <StatCounter {...s} />
                                        </m.div>
                                    </Col>
                                ))}
                            </Row>
                        </m.div>
                    </LazyMotion>
                </Container>
            </section>

            {/* Our Values */}
            <section style={{ background: '#F8FAFC', padding: '80px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label">What Drives Us</m.span>
                            <m.h2 variants={fadeIn} className="enfono-section-title">Our Core Values</m.h2>
                        </m.div>
                        <Row className="g-4">
                            {values.map((v, i) => (
                                <Col key={i} lg={4} md={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ background: '#fff', borderRadius: '12px', padding: '36px', border: '1px solid #E5E7EB', height: '100%', transition: 'all 0.3s ease' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(16,185,129,0.1)' }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                                        >
                                            <div style={{ width: '56px', height: '56px', background: '#ecfdf5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                                <i className={v.icon} style={{ fontSize: '22px', color: '#10B981' }}></i>
                                            </div>
                                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>{v.title}</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#6B7280', margin: 0 }}>{v.desc}</p>
                                        </div>
                                    </m.div>
                                </Col>
                            ))}
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            {/* Our Journey Timeline - Horizontal Experience */}
            <section style={{ background: '#fff', padding: '100px 0', overflow: 'hidden' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label">The Enfono Story</m.span>
                            <m.h2 variants={fadeIn} className="enfono-section-title">Our Journey</m.h2>
                        </m.div>

                        <div className="enfono-journey-container" style={{ position: 'relative', marginTop: '40px' }}>
                            {/* The Timeline Line */}
                            <div style={{
                                position: 'absolute',
                                top: '150px',
                                left: '0',
                                right: '0',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent 0%, #F1F5F9 15%, #F1F5F9 85%, transparent 100%)',
                                zIndex: 0
                            }} className="d-none d-lg-block"></div>

                            {/* Scrollable Area */}
                            <div style={{
                                display: 'flex',
                                overflowX: 'auto',
                                padding: '40px 0 60px',
                                gap: '30px',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }} className="journey-scrollbar-hide">
                                {data.journey.map((item, i) => (
                                    <m.div
                                        key={i}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        style={{ minWidth: '320px', position: 'relative', zIndex: 1 }}
                                    >
                                        {/* Year Marker */}
                                        <div style={{ position: 'relative', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="d-none d-lg-flex">
                                            <div style={{
                                                fontSize: '80px',
                                                fontWeight: '900',
                                                color: '#F8FAFC',
                                                position: 'absolute',
                                                zIndex: -1,
                                                letterSpacing: '-2px'
                                            }}>{item.year}</div>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                background: '#fff',
                                                borderRadius: '50%',
                                                border: '3px solid #10B981',
                                                boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                                                zIndex: 2
                                            }}></div>
                                        </div>

                                        {/* Card */}
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '20px',
                                            padding: '30px',
                                            border: '1px solid #F1F5F9',
                                            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)',
                                            height: '100%',
                                            transition: 'all 0.3s ease',
                                            cursor: 'default'
                                        }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-10px)';
                                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(16,185,129,0.08)';
                                                e.currentTarget.style.borderColor = '#E2E8F0';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.03)';
                                                e.currentTarget.style.borderColor = '#F1F5F9';
                                            }}>
                                            <div className="d-lg-none" style={{
                                                display: 'inline-block',
                                                background: '#ecfdf5',
                                                color: '#10B981',
                                                padding: '4px 12px',
                                                borderRadius: '100px',
                                                fontSize: '12px',
                                                fontWeight: '800',
                                                marginBottom: '15px'
                                            }}>{item.year}</div>
                                            <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>{item.title}</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#64748B', margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </m.div>
                                ))}
                            </div>
                        </div>
                    </LazyMotion>
                </Container>
                <style>{`
                    .journey-scrollbar-hide::-webkit-scrollbar { display: none; }
                    @media (max-width: 991px) {
                        .journey-scrollbar-hide { flex-direction: column; padding: 20px; gap: 20px; }
                        .enfono-journey-container { border-left: 2px solid #F1F5F9; padding-left: 20px; margin-left: 10px; }
                    }
                `}</style>
            </section>

            {/* Team Section */}
            <section style={{ background: '#F8FAFC', padding: '80px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label">The People Behind Enfono</m.span>
                            <m.h2 variants={fadeIn} className="enfono-section-title">Meet Our Leadership</m.h2>
                        </m.div>
                        <Row className="g-4 justify-content-center">
                            {sortedTeam.map((member, i) => (
                                <Col key={i} lg={3} md={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ background: '#fff', borderRadius: '12px', padding: '36px 28px', border: '1px solid #E5E7EB', textAlign: 'center', transition: 'all 0.3s ease' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(16,185,129,0.1)' }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                                        >
                                            <div style={{ width: '80px', height: '80px', background: 'var(--enfono-gradient-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '26px', fontWeight: '700', color: '#10B981', fontFamily: 'Poppins, sans-serif' }}>
                                                {member.initials}
                                            </div>
                                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', fontFamily: 'Poppins, sans-serif', marginBottom: '6px' }}>{member.name}</h4>
                                            <div style={{ fontSize: '13px', color: '#10B981', fontWeight: '600', marginBottom: '14px', letterSpacing: '0.5px' }}>{member.role}</div>
                                            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B7280', margin: 0 }}>{member.desc}</p>
                                        </div>
                                    </m.div>
                                </Col>
                            ))}
                        </Row>
                    </LazyMotion>
                </Container>
            </section>

            {/* Our Offices */}
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <m.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <m.span variants={fadeIn} className="enfono-section-label">Where We Are</m.span>
                            <m.h2 variants={fadeIn} className="enfono-section-title">Our Offices</m.h2>
                        </m.div>
                        <Row className="g-4 justify-content-center">
                            {data.offices.map((office, i) => (
                                <Col key={i} lg={5} md={6}>
                                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                                            <div style={{ background: office.color, padding: '36px', position: 'relative' }}>
                                                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '13px', fontWeight: '600', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', color: 'rgba(255,255,255,0.8)' }}>
                                                    {office.type}
                                                </div>
                                                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{office.flag}</div>
                                                <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>{office.country}</div>
                                                <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>{office.city}</div>
                                            </div>
                                            <div style={{ background: '#fff', padding: '28px 36px' }}>
                                                {[
                                                    { icon: 'fas fa-map-marker-alt', text: office.address },
                                                    { icon: 'fas fa-phone', text: office.phone },
                                                    { icon: 'fas fa-envelope', text: office.email },
                                                ].map((item, j) => (
                                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#111827', fontSize: '14px' }}>
                                                        <i className={item.icon} style={{ color: '#10B981', width: '16px', flexShrink: 0 }}></i>
                                                        {item.text}
                                                    </div>
                                                ))}
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
                        <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '16px' }}>Work With Us</span>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
                            Ready to Start Your ERP Journey?
                        </h2>
                        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 32px' }}>
                            Let's talk about your business goals and how Enfono can help you achieve them.
                        </p>
                        <Link to="/contact" style={{ background: '#fff', color: '#10B981', padding: '14px 36px', borderRadius: '4px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-block' }}>
                            Contact Us Today
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <EnfonoFooter hideCta={true} />
        </div>
    )
}

export default EnfonoAbout
