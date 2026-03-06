import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import { initialCmsData } from "../../Data/cms_data";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }) }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function EnfonoBrands() {
  const [cmsData, setCmsData] = useState(initialCmsData);

  useEffect(() => {
    const saved = localStorage.getItem('enfono_cms_data');
    if (saved) {
      setCmsData({ ...initialCmsData, ...JSON.parse(saved) });
    }
  }, []);

  const brands = cmsData.brands || [];

  return (
    <LazyMotion features={domAnimation}>
      <div>
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
              <m.div initial="hidden" animate="visible" variants={stagger}>
                <m.div className="e-section-label-amber" variants={fadeUp}>Product Portfolio</m.div>
                <m.h1 className="e-section-title-light" variants={fadeUp} custom={0.05}>
                  Our Product Brands
                </m.h1>
                <m.p className="e-section-sub-light" variants={fadeUp} custom={0.1}>
                  Beyond consulting — Enfono builds specialized SaaS products that extend ERPNext for GCC businesses. From ZATCA compliance to AI analytics, our products solve real problems.
                </m.p>
              </m.div>
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
                { num: '3', suffix: '', label: 'GCC Countries' },
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
            <m.div
              className="e-section-header-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label">Our Products</div>
              <h2 className="e-section-title">Built for GCC Businesses</h2>
              <p className="e-section-sub" style={{ margin: '0 auto' }}>Each product is purpose-built to solve a specific challenge for ERPNext users in the GCC market.</p>
            </m.div>

            <m.div
              style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {brands.map((brand, i) => (
                <m.div
                  key={brand.name}
                  variants={fadeUp}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: '48px',
                    alignItems: 'center',
                    padding: '40px',
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
                        <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '22px', fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>{brand.name}</div>
                      </div>
                      <span style={{
                        marginLeft: 'auto',
                        padding: '4px 12px',
                        background: brand.status === 'Available' ? 'rgba(34,197,94,0.1)' : 'rgba(52,211,153,0.1)',
                        border: `1px solid ${brand.status === 'Available' ? 'rgba(34,197,94,0.3)' : 'rgba(52,211,153,0.3)'}`,
                        borderRadius: '100px',
                        fontSize: '11px', fontWeight: 700,
                        color: brand.status === 'Available' ? '#16a34a' : '#D97706',
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
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '10px' }}>
                        {(brand.features || []).map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter,sans-serif', fontSize: '13px', color: '#475569' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: brand.color || '#10B981', flexShrink: 0 }} />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* CTA */}
        <section className="e-cta-section">
          <div className="enfono-container">
            <div className="e-cta-inner">
              <div className="e-cta-text">
                <h2>Interested in Our Products?</h2>
                <p>Contact us for a demo or to learn how our products can integrate with your ERP.</p>
              </div>
              <div className="e-cta-actions" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                <Link to="/contact" className="ecta-btn-white"><i className="fas fa-calendar-check" /> Request a Demo</Link>
                <Link to="/tools" className="ecta-btn-outline">Try Free Tools</Link>
              </div>
            </div>
          </div>
        </section>

        <EnfonoFooter />
      </div>
    </LazyMotion>
  )
}
