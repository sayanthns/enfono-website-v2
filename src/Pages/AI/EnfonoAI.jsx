import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { initialCmsData } from '../../Data/cms_data'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }) }
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: 'fas fa-robot', title: 'Smart Workflow Automation', desc: 'AI identifies repetitive tasks in your ERP — approvals, reconciliations, purchase order generation — and automates them with intelligent rules that learn from patterns.', tag: 'Automation' },
  { icon: 'fas fa-chart-line', title: 'Predictive Analytics', desc: 'Forecast demand, cash flow, inventory needs, and revenue with ML models trained on your historical ERP data. See problems before they happen.', tag: 'Analytics' },
  { icon: 'fas fa-comments', title: 'Natural Language Querying', desc: 'Ask your ERP questions in plain English or Arabic: "What were our top 10 clients last quarter by revenue?" Get instant, accurate answers.', tag: 'NLP' },
  { icon: 'fas fa-exclamation-triangle', title: 'Anomaly Detection', desc: 'AI continuously monitors your financial transactions, inventory movements, and procurement for unusual patterns — catching fraud, errors, and waste early.', tag: 'Risk AI' },
  { icon: 'fas fa-sync-alt', title: 'Intelligent Reconciliation', desc: 'Automated bank reconciliation, accounts payable matching, and inter-company reconciliation — reducing manual effort by up to 90%.', tag: 'Finance AI' },
  { icon: 'fas fa-boxes', title: 'Demand Forecasting', desc: 'Predict customer demand 4-12 weeks ahead, optimize stock levels, and reduce overstock/stockout situations with AI-driven replenishment suggestions.', tag: 'Supply Chain' },
]

const useCases = [
  { industry: 'Manufacturing', icon: 'fas fa-industry', headline: 'Predictive maintenance alerts saved Al-Rashid 18% in equipment downtime', result: '18% downtime reduction', color: '#10B981' },
  { industry: 'Retail', icon: 'fas fa-store', headline: 'AI demand forecasting reduced overstock by 32% across 50 stores in UAE', result: '32% overstock reduction', color: '#34D399' },
  { industry: 'Construction', icon: 'fas fa-hard-hat', headline: 'Automated procurement approvals cut processing time from 5 days to 4 hours', result: '95% faster approvals', color: '#10B981' },
]

import { useContext } from 'react';
import GlobalContext from '../../Context/Context';
import { initialCmsData } from '../../Data/cms_data'

export default function EnfonoAI() {
  const { cmsData } = useContext(GlobalContext);
  const data = cmsData || initialCmsData;

  return (
    <LazyMotion features={domAnimation}>
      <div>
        <EnfonoHeader />

        {/* Hero */}
        <section className="enfono-hero-new" style={{ minHeight: '85vh' }}>
          <div className="enfono-hero-content">
            <div className="enfono-container">
              <div className="enfono-hero-grid">
                <m.div initial="hidden" animate="visible" variants={stagger}>
                  <m.div className="e-breadcrumb" variants={fadeUp} style={{ marginBottom: '24px' }}>
                    <Link to="/">Home</Link>
                    <i className="fas fa-chevron-right" />
                    <span>AI-Powered ERP</span>
                  </m.div>
                  <m.div className="enfono-hero-eyebrow" variants={fadeUp}>
                    <i className="fas fa-brain" /> AI & Analytics
                  </m.div>
                  <m.h1 className="enfono-hero-title" variants={fadeUp} custom={0.05}>
                    ERP That Gets<br />
                    <span className="highlight">Smarter Every Day</span>
                  </m.h1>
                  <m.p className="enfono-hero-subtitle" variants={fadeUp} custom={0.1}>
                    Enfono's AI-powered ERP layer sits on top of ERPNext — learning from your data, automating decisions, predicting problems, and giving your team superpowers that traditional ERP simply can't deliver.
                  </m.p>
                  <m.div className="enfono-hero-actions" variants={fadeUp} custom={0.15}>
                    <Link to="/contact" className="ehero-btn-primary">
                      <i className="fas fa-calendar-check" /> Request AI Demo
                    </Link>
                    <Link to="/case-studies" className="ehero-btn-ghost">
                      See Case Studies
                    </Link>
                  </m.div>
                </m.div>

                <m.div
                  className="enfono-hero-right"
                  initial="hidden" animate="visible" variants={fadeRight}
                >
                  <div className="eai-card" style={{ width: '100%', maxWidth: '480px' }}>
                    <div className="eai-card-header">
                      <div className="eai-orb"><i className="fas fa-brain" /></div>
                      <div>
                        <div className="eai-card-title">Enfono AI Engine — Live</div>
                        <div className="eai-card-sub">Processing 1,240 ERP events/min</div>
                      </div>
                    </div>
                    <div className="eai-insights">
                      {[
                        { dot: 'amber', text: '⚡ Anomaly: Duplicate invoice detected — PO-2847', value: 'Blocked' },
                        { dot: 'green', text: '📈 Q1 revenue forecast — ↑12.4% vs target', value: 'On track' },
                        { dot: 'blue', text: '🤖 Auto-approved 14 purchase orders under SAR 50K', value: 'Saved 6h' },
                        { dot: 'amber', text: '📦 Cement inventory — reorder in 8 days', value: 'Alert' },
                        { dot: 'green', text: '✅ Bank reconciliation completed — 847 transactions', value: 'Done' },
                        { dot: 'blue', text: '💡 AI suggestion: Switch supplier XYZ saves 18%', value: 'New' },
                      ].map((i, idx) => (
                        <div key={idx} className="eai-insight">
                          <span className={`eai-dot ${i.dot}`} />
                          <span className="eai-text">{i.text}</span>
                          <span className="eai-value">{i.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="enfono-stats-section">
          <div className="enfono-container">
            <div className="enfono-stats-inner">
              {[
                { num: '90', suffix: '%', label: 'Reduction in Manual Work' },
                { num: '4x', suffix: '', label: 'Faster Financial Close' },
                { num: '32', suffix: '%', label: 'Average Cost Savings' },
                { num: '24/7', suffix: '', label: 'AI Monitoring Active' },
              ].map(s => (
                <div key={s.label} className="enfono-stat-cell">
                  <div className="estat-num">{s.num}<span>{s.suffix}</span></div>
                  <div className="estat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="e-light-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label">AI Capabilities</div>
              <h2 className="e-section-title">What Our AI Layer Does</h2>
              <p className="e-section-sub" style={{ margin: '0 auto' }}>Six core AI capabilities that transform how your ERPNext system works — from data entry to decision-making.</p>
            </m.div>
            <m.div
              className="e-services-grid"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {features.map(f => (
                <m.div key={f.title} className="e-service-card" variants={fadeUp}>
                  <div className="esc-icon"><i className={f.icon} /></div>
                  <div className="esc-ai-badge"><i className="fas fa-sparkles" /> {f.tag}</div>
                  <div className="esc-title">{f.title}</div>
                  <div className="esc-desc">{f.desc}</div>
                  <Link to="/contact" className="esc-link">Request Demo <i className="fas fa-arrow-right" /></Link>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* AI Use Cases */}
        <section className="e-dark-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            >
              <div className="e-section-label-amber">Real Results</div>
              <h2 className="e-section-title-light">AI ERP in Action</h2>
            </m.div>
            <m.div
              className="e-cs-grid"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            >
              {useCases.map(uc => (
                <m.div key={uc.industry} className="e-cs-card" variants={fadeUp}>
                  <div className="ecc-meta"><i className={uc.icon} style={{ marginRight: '6px' }} />{uc.industry}</div>
                  <div className="ecc-title">{uc.headline}</div>
                  <div className="ecc-result" style={{ background: uc.color === '#34D399' ? 'rgba(52,211,153,0.15)' : undefined, borderColor: uc.color === '#34D399' ? 'rgba(52,211,153,0.4)' : undefined, color: uc.color === '#34D399' ? '#34D399' : undefined }}>
                    <i className="fas fa-chart-line" />{uc.result}
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
                <h2>{data.ai_cta?.heading || 'See AI ERP in Action'}</h2>
                <p>{data.ai_cta?.subtext || "Book a live demo and see how Enfono's AI layer transforms your ERPNext system."}</p>
              </div>
              <div className="e-cta-actions">
                <Link to={data.ai_cta?.btn_primary_url || '/contact'} className="ecta-btn-white"><i className="fas fa-calendar-check" /> {data.ai_cta?.btn_primary_txt || 'Book AI Demo'}</Link>
                <Link to={data.ai_cta?.btn_secondary_url || '/services'} className="ecta-btn-outline">{data.ai_cta?.btn_secondary_txt || 'All Services'}</Link>
              </div>
            </div>
          </div>
        </section>

        <EnfonoFooter hideCta={true} />
      </div>
    </LazyMotion>
  )
}
