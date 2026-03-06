import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import { initialCmsData } from "../../Data/cms_data";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }) }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const departments = ['All', 'Engineering', 'Consulting', 'Sales', 'Operations']

const perks = [
  { icon: 'fas fa-globe', title: 'Work Globally', desc: 'Serve enterprise clients across Saudi Arabia, UAE, and Oman from day one.' },
  { icon: 'fas fa-graduation-cap', title: 'Grow Your Skills', desc: 'ERPNext certification support, conference budgets, and learning time built into your role.' },
  { icon: 'fas fa-laptop-house', title: 'Remote-Friendly', desc: 'Most engineering roles are fully remote. Hybrid options for consulting roles.' },
  { icon: 'fas fa-hand-holding-usd', title: 'Competitive Pay', desc: 'GCC-market salaries, performance bonuses, and equity for senior roles.' },
  { icon: 'fas fa-users', title: 'Small Team, Big Impact', desc: 'No bureaucracy. Your work ships to production and clients notice it.' },
  { icon: 'fas fa-heart', title: 'Health & Wellness', desc: 'Full health insurance coverage for you and dependents in KSA and India offices.' },
]

const values = [
  { icon: 'fas fa-bullseye', title: 'Ownership', desc: 'We take responsibility for outcomes, not just tasks. Everyone owns their work end-to-end.' },
  { icon: 'fas fa-rocket', title: 'Move Fast', desc: 'We ship, iterate, and improve. We don\'t wait for perfect when good enough can learn.' },
  { icon: 'fas fa-hands-helping', title: 'Client Obsession', desc: 'Every decision is filtered through: does this create value for our clients?' },
  { icon: 'fas fa-lightbulb', title: 'Stay Curious', desc: 'The ERP and AI landscape changes fast. We invest in staying ahead.' },
]

export default function EnfonoCareers() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [cmsData, setCmsData] = useState(initialCmsData);

  useEffect(() => {
    const saved = localStorage.getItem('enfono_cms_data');
    if (saved) {
      setCmsData({ ...initialCmsData, ...JSON.parse(saved) });
    }
  }, []);

  const roles = cmsData.careers || [];
  const filtered = roles.filter(r => activeFilter === 'All' || r.dept === activeFilter)

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
                <span>Careers</span>
              </div>
              <m.div initial="hidden" animate="visible" variants={stagger}>
                <m.div className="e-section-label-amber" variants={fadeUp}>Join Our Team</m.div>
                <m.h1 className="e-section-title-light" variants={fadeUp} custom={0.05}>
                  Build the Future of ERP<br />in the GCC
                </m.h1>
                <m.p className="e-section-sub-light" variants={fadeUp} custom={0.1}>
                  We're a fast-growing team working on challenging ERP and AI problems for some of the largest enterprises in Saudi Arabia, UAE, and Oman.
                </m.p>
                <m.div variants={fadeUp} custom={0.15} style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#34D399', marginRight: '6px' }} />
                    Riyadh · Dubai · Remote
                  </span>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    <i className="fas fa-briefcase" style={{ color: '#34D399', marginRight: '6px' }} />
                    {roles.length} Open Positions
                  </span>
                </m.div>
              </m.div>
            </div>
          </div>
        </section>

        {/* Culture / Values */}
        <section className="e-light-section" style={{ paddingBottom: '60px' }}>
          <div className="enfono-container">
            <m.div
              className="e-section-header-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label">Our Culture</div>
              <h2 className="e-section-title">How We Work</h2>
              <p className="e-section-sub" style={{ margin: '0 auto' }}>We hire people who are passionate about ERP technology and want to make a real impact in the GCC's digital transformation.</p>
            </m.div>
            <m.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {values.map(v => (
                <m.div
                  key={v.title}
                  variants={fadeUp}
                  style={{ padding: '28px', background: '#F8FAF9', borderRadius: '18px', border: '1px solid #E5E7EB' }}
                >
                  <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.07)', borderRadius: '14px', marginBottom: '16px' }}>
                    <i className={v.icon} style={{ fontSize: '18px', color: '#10B981' }} />
                  </div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>{v.title}</div>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '13.5px', lineHeight: 1.6, color: '#64748B', margin: 0 }}>{v.desc}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Perks */}
        <section className="e-blue-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label">Benefits</div>
              <h2 className="e-section-title">Why Work at Enfono</h2>
            </m.div>
            <m.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {perks.map(p => (
                <m.div
                  key={p.title}
                  variants={fadeUp}
                  style={{ display: 'flex', gap: '16px', padding: '24px', background: '#fff', borderRadius: '16px', border: '1.5px solid #E5E7EB' }}
                >
                  <div style={{ width: '48px', height: '48px', minWidth: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.07)', borderRadius: '12px' }}>
                    <i className={p.icon} style={{ fontSize: '18px', color: '#10B981' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>{p.title}</div>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '13.5px', lineHeight: 1.6, color: '#64748B', margin: 0 }}>{p.desc}</p>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="e-light-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label">Open Positions</div>
              <h2 className="e-section-title">Join the Team</h2>
            </m.div>

            <div className="e-filter-row">
              {departments.map(d => (
                <button
                  key={d}
                  className={`e-filter-pill${activeFilter === d ? ' active' : ''}`}
                  onClick={() => setActiveFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <m.div
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {filtered.map(role => (
                <m.div
                  key={role.title}
                  variants={fadeUp}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
                    padding: '24px 28px', background: '#fff', border: '1.5px solid #E5E7EB',
                    borderRadius: '16px', transition: 'all 0.25s',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>{role.title}</div>
                      <span style={{ padding: '2px 10px', background: 'rgba(16,185,129,0.07)', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: '#10B981' }}>{role.dept}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '13.5px', lineHeight: 1.6, color: '#64748B', margin: '0 0 12px' }}>{role.desc}</p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#34D399' }} />{role.location}
                      </span>
                      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fas fa-clock" style={{ color: '#34D399' }} />{role.type}
                      </span>
                    </div>
                  </div>
                  <a href={role.apply_url || '/contact'} target="_blank" rel="noopener noreferrer" className="e-btn-primary" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                    Apply Now <i className="fas fa-arrow-right" />
                  </a>
                </m.div>
              ))}
            </m.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8', fontFamily: 'Inter,sans-serif' }}>
                No open positions in this department right now. <Link to="/contact" style={{ color: '#10B981' }}>Send us your CV anyway</Link>.
              </div>
            )}
          </div>
        </section>

        {/* Don't see your role CTA */}
        <section className="e-cta-section">
          <div className="enfono-container">
            <div className="e-cta-inner">
              <div className="e-cta-text">
                <h2>Don't See Your Role?</h2>
                <p>We're always looking for exceptional people. Send us your CV and tell us how you can contribute.</p>
              </div>
              <div className="e-cta-actions">
                <Link to="/contact" className="ecta-btn-white"><i className="fas fa-paper-plane" /> Send Your CV</Link>
                <Link to="/about" className="ecta-btn-outline">Learn About Us</Link>
              </div>
            </div>
          </div>
        </section>

        <EnfonoFooter />
      </div>
    </LazyMotion>
  )
}
