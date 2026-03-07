import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Row, Col } from 'react-bootstrap'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import GlobalContext from '../../Context/Context'
import { initialCmsData } from "../../Data/cms_data";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }) }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }



export default function EnfonoBrands() {
  const { cmsData } = useContext(GlobalContext);
  const data = cmsData || initialCmsData;

  const brands = data.brands || [];

  return (
    <div className="enfono-brands-page">
      <EnfonoHeader />

      {/* Hero */}
      <section className="e-page-hero">
        <div className="enfono-container">
          <div className="e-page-hero-content">
            <div className="e-breadcrumb">
              <Link to="/">Home</Link>
              <i className="fas fa-chevron-right" />
              <span>Our Brands</span>
            </div>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div className="e-section-label-amber" variants={fadeUp}>Product Portfolio</motion.div>
              <motion.h1 className="e-section-title-light" variants={fadeUp} custom={0.05}>
                Our Product Brands
              </motion.h1>
              <motion.p className="e-section-sub-light" variants={fadeUp} custom={0.1}>
                Beyond consulting — Enfono builds specialized SaaS products that extend ERPNext for GCC businesses. From ZATCA compliance to AI analytics, our products solve real problems.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="enfono-stats-section">
        <div className="enfono-container">
          <div className="enfono-stats-inner">
            {[
              { num: brands.length.toString(), suffix: '', label: 'Product Brands' },
              { num: '120', suffix: '+', label: 'Projects Delivered' },
              { num: '6', suffix: '', label: 'GCC Countries' },
              { num: '2019', suffix: '', label: 'Est. Year' },
            ].map(s => (
              <div key={s.label} className="enfono-stat-cell">
                <div className="estat-num">{s.num}<span>{s.suffix}</span></div>
                <div className="estat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="e-light-section">
        <div className="enfono-container">
          <motion.div
            className="e-section-header-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
          >
            <div className="e-section-label">Our Products</div>
            <h2 className="e-section-title">Built for GCC Businesses</h2>
            <p className="e-section-sub" style={{ margin: '0 auto' }}>Each product is purpose-built to solve a specific challenge for ERPNext users in the GCC market.</p>
          </motion.div>

          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          >
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 991 ? '1fr' : '1fr 1fr',
                  gap: window.innerWidth < 991 ? '24px' : '48px',
                  alignItems: 'center',
                  padding: window.innerWidth < 768 ? '24px' : '40px',
                  background: '#fff',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '24px',
                }}
              >
                <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '52px', height: '52px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: brand.color ? `${brand.color}15` : 'rgba(16,185,129,0.08)',
                      borderRadius: '14px',
                    }}>
                      <i className={brand.icon} style={{ fontSize: '22px', color: brand.color || '#10B981' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '22px', fontWeight: 800, color: '#1A1A1A', lineHeight: 1, whiteSpace: 'normal', lineBreak: 'anywhere' }}>{brand.name}</div>
                    </div>
                    <span style={{
                      marginLeft: 'auto',
                      padding: '4px 12px',
                      background: brand.status === 'Available' ? 'rgba(34,197,94,0.1)' : 'rgba(16,185,129,0.1)',
                      border: `1px solid ${brand.status === 'Available' ? 'rgba(34,197,94,0.3)' : 'rgba(16,185,129,0.3)'}`,
                      borderRadius: '100px',
                      fontSize: '11px', fontWeight: 700,
                      color: brand.status === 'Available' ? '#16a34a' : '#10B981',
                      whiteSpace: 'nowrap'
                    }}>
                      {brand.status}
                    </span>
                  </div>
                  <div style={{
                    display: 'inline-block', padding: '3px 12px',
                    background: brand.color ? `${brand.color}15` : 'rgba(16,185,129,0.08)',
                    borderRadius: '100px', fontSize: '11px', fontWeight: 700,
                    color: brand.color || '#10B981', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px',
                  }}>
                    {brand.tag}
                  </div>
                  <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '24px', fontWeight: 800, color: '#1A1A1A', margin: '0 0 14px', lineHeight: 1.2 }}>{brand.headline}</h3>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.7, color: '#64748B', margin: '0 0 24px' }}>{brand.desc}</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {brand.status !== 'Coming Soon' ? (
                      <a href={brand.link} className="e-btn-primary" style={{ background: brand.color }}>
                        Get Started <i className="fas fa-arrow-right" />
                      </a>
                    ) : (
                      <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#F1F5F9', color: '#94A3B8', fontFamily: 'Inter,sans-serif', fontSize: '14px', fontWeight: 600, borderRadius: '11px', border: '1.5px solid #E5E7EB', cursor: 'not-allowed' }}>
                        <i className="fas fa-clock" /> Coming Soon
                      </button>
                    )}
                    <Link to="/contact" className="e-btn-outline">Learn More</Link>
                  </div>
                </div>
                <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                  <div style={{
                    background: brand.color ? `${brand.color}08` : 'linear-gradient(135deg,#ECFDF5 0%,#F8FAF9 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                  }}>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px' }}>Key Features</div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth < 575 ? '1fr' : '1fr 1fr',
                      gap: '12px'
                    }}>
                      {(brand.features || []).map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter,sans-serif', fontSize: '13px', color: '#475569', whiteSpace: 'normal' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: brand.color || '#10B981', flexShrink: 0 }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <EnfonoFooter mobileMenuOpen={mobileOpen} />
    </div>
  );
}
