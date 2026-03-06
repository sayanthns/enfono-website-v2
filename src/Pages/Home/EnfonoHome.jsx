import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import { initialCmsData } from "../../Data/cms_data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }
  })
}
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const StatCell = ({ end, suffix = '', label, icon }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className="enfono-stat-cell">
      <div className="estat-icon"><i className={icon} /></div>
      <div className="estat-num">
        {inView ? <CountUp end={end} duration={2.5} /> : 0}
        <span>{suffix}</span>
      </div>
      <div className="estat-label">{label}</div>
    </div>
  )
}

const services = [
  {
    icon: 'fas fa-brain', title: 'AI Agentic & Automation', isAI: true,
    desc: 'Intelligent ERP with predictive analytics, automated workflows, and AI-driven dashboards that grow smarter with your business.',
    link: '/ai-erp',
    features: ['Predictive analytics', 'Smart dashboards', 'Natural language reports']
  },
  {
    icon: 'fas fa-cubes', title: 'ERPNext Implementation',
    desc: 'Full deployment from setup to go-live — multi-company, Arabic localization, and ZATCA Phase II compliance built in.',
    link: '/services',
    features: ['Multi-company setup', 'Arabic localization', 'ZATCA Phase II']
  },
  {
    icon: 'fas fa-code', title: 'Custom Software Development',
    desc: 'Tailored web, mobile (iOS/Android), and desktop applications aligned to your workflows, regulations, and growth plans.',
    link: '/services',
    features: ['Web & mobile apps', 'API integrations', 'Scalable architecture']
  },
  {
    icon: 'fas fa-truck', title: 'Logistics Management Systems',
    desc: 'Specialized systems for transportation, warehousing, freight forwarding — BL, AWB, container tracking, and port management.',
    link: '/services',
    features: ['Fleet operations', 'Container tracking', 'Freight forwarding']
  },
  {
    icon: 'fas fa-headset', title: 'IT Consulting & Support',
    desc: 'Continuous updates, troubleshooting, strategic technology advice, and dedicated post-go-live support for peak performance.',
    link: '/services',
    features: ['24/7 monitoring', 'SLA-backed support', 'Training programs']
  },
  {
    icon: 'fas fa-cloud', title: 'Cloud & Cyber Security',
    desc: 'Migrate your legacy ERP to cloud infrastructure with zero downtime, enterprise-grade security, and full data integrity.',
    link: '/services',
    features: ['AWS/Azure/GCP', 'Zero-downtime migration', 'NCA compliance']
  },
]

const industries = [
  { icon: 'fas fa-industry', label: 'Manufacturing' },
  { icon: 'fas fa-truck-loading', label: 'Logistics & Transport' },
  { icon: 'fas fa-exchange-alt', label: 'Trading & Distribution' },
  { icon: 'fas fa-shopping-cart', label: 'Retail & POS' },
  { icon: 'fas fa-hard-hat', label: 'Construction' },
  { icon: 'fas fa-heartbeat', label: 'Healthcare' },
  { icon: 'fas fa-oil-can', label: 'Oil & Energy' },
  { icon: 'fas fa-graduation-cap', label: 'Education' },
]

const caseStudies = [
  { meta: 'Govt. & World Bank · Kerala', title: 'KERA Grant Portal', desc: 'Climate resilient grant portal for Govt of Kerala and World Bank. Includes the KERA Product Alliance portal and NAWODHA portal for the agriculture department.', result: 'Multi-portal architecture', icon: 'fas fa-leaf' },
  { meta: 'Agro Business · Kerala', title: 'KABCO ERP & Website', desc: 'Kerala Agro Business Company — comprehensive ERP implementation and corporate website development to streamline agro businesses.', result: 'Unified digital operations', icon: 'fas fa-tractor' },
  { meta: 'Steel & Manufacturing · KSA', title: 'Steel Force — 25 Branches Unified', desc: 'Deployed ERP across 25 branches and 500+ employees to manage steel production and retail trading operations seamlessly.', result: '25 branches connected', icon: 'fas fa-industry' },
]

const clientLogos = [
  { name: 'Steel Force', industry: 'Manufacturing' },
  { name: 'NMCE Logistics', industry: 'Logistics' },
  { name: 'HSM Shipping', industry: 'Marine/Freight' },
  { name: 'Power Creation', industry: 'Manufacturing' },
  { name: 'Badriya Sweets', industry: 'F&B Retail' },
  { name: 'Logistica.sa', industry: 'Logistics' },
  { name: 'SRT Trading', industry: 'Trading' },
  { name: 'Sahara Oil & Gas', industry: 'Energy' },
  { name: 'Zayat Logistics', industry: 'Logistics' },
  { name: 'SIA Electricals', industry: 'Contracting' },
  { name: 'Plascom Arabco', industry: 'Polymer Mfg' },
  { name: 'NG Group', industry: 'Retail/POS' },
  { name: 'Satcon Logistics', industry: 'Logistics' },
  { name: 'Avicen Pharma', industry: 'Healthcare' },
]

const brands = [
  { logo: 'https://www.enfono.com/_next/static/image/public/images/our-brands/rentpe.f4d52afe93d6cd1051e5eaec9d364224.png', name: 'Rentpe', desc: 'Property management platform for maintenance, finances & rental performance' },
  { logo: 'https://www.enfono.com/_next/static/image/public/images/our-brands/Arca.676ced51f42b4cdae6865d289e2993ac.png', name: 'Arca', desc: 'Architecture management for project planning & document control' },
  { logo: 'https://www.enfono.com/_next/static/image/public/images/our-brands/chms.bba80108da4df146400de9c956100225.png', name: 'CHMS', desc: 'Hospital management system for streamlined clinical workflows', featured: true },
  { logo: 'https://www.enfono.com/_next/static/image/public/images/our-brands/Drivezy.b1e29703989e2f1afa65cdf8b505eb17.png', name: 'Drivezy', desc: 'Driving school management — scheduling, progress & certifications' },
]

const testimonials = [
  { quote: 'Before partnering with Enfono, our ERP implementation was stuck in endless delays. Their team turned it around completely — we went live ahead of schedule with full ZATCA compliance.', name: 'CFO', role: 'Saudi Logistics Company · Riyadh', initials: 'CF' },
  { quote: 'We previously operated on Odoo but struggled with customization limitations. Enfono migrated us to ERPNext with zero data loss and full Arabic support. Outstanding expertise.', name: 'Operations Head', role: 'Manufacturing Company · Dubai', initials: 'OH' },
  { quote: 'The AI analytics module gives us insights we never had before. We can now predict inventory needs 4 weeks out with over 90% accuracy. Exceptional team and project management.', name: 'IT Director', role: 'Retail Chain · Oman', initials: 'IT' },
]

const partners = [
  { icon: 'fab fa-aws', label: 'AWS Partner' },
  { icon: 'fab fa-microsoft', label: 'Microsoft' },
  { icon: 'fas fa-database', label: 'Oracle' },
  { icon: 'fas fa-cubes', label: 'Frappe Partner' },
]

export default function EnfonoHome() {
  const [cmsData, setCmsData] = useState(initialCmsData);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('enfono_cms_data');
      if (saved) {
        let parsed = JSON.parse(saved);
        let merged = { ...initialCmsData, ...parsed };
        let migrated = false;

        if ((!merged.our_work || merged.our_work.length === 0) && merged.success_stories) {
          merged.our_work = merged.success_stories.map(s => ({
            id: s.id || Math.random(),
            category: s.meta || 'Manufacturing',
            country: 'Saudi Arabia',
            title: s.title,
            subtitle: s.desc,
            outcome: s.result,
            bullets: [],
            results: []
          }));
          migrated = true;
        }

        if (migrated) {
          localStorage.setItem('enfono_cms_data', JSON.stringify(merged));
        }
        setCmsData(merged);
      }
    };

    loadData();

    // Listen for changes from other tabs (Admin)
    const handleStorageChange = (e) => {
      if (e.key === 'enfono_cms_data') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div style={{ background: '#fff' }}>
        <EnfonoHeader />

        {/* ── HERO ── */}
        <section className="enfono-hero-new">
          <div className="enfono-hero-content">
            <div className="enfono-container">
              <div className="enfono-hero-grid">
                {/* Left */}
                <m.div
                  className="enfono-hero-left"
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >


                  <m.div className="enfono-hero-eyebrow" variants={fadeUp} custom={0.05}>
                    <i className="fas fa-bolt" /> End-to-End ERP Solutions for GCC Enterprises
                  </m.div>

                  <m.h1 className="enfono-hero-title" variants={fadeUp} custom={0.1}>
                    {cmsData.hero.heading}
                  </m.h1>

                  <m.p className="enfono-hero-subtitle" variants={fadeUp} custom={0.15}>
                    {cmsData.hero.subtext}
                  </m.p>

                  <m.div className="enfono-hero-actions" variants={fadeUp} custom={0.2}>
                    <Link to={cmsData.hero.booking_url} className="ehero-btn-primary">
                      <i className="fas fa-calendar-check" />
                      {cmsData.hero.cta_primary}
                    </Link>
                    <Link to="/case-studies" className="ehero-btn-ghost">
                      <i className="fas fa-play-circle" />
                      {cmsData.hero.cta_secondary}
                    </Link>
                  </m.div>


                </m.div>

                {/* Right — Chat Mockup */}
                <m.div
                  className="enfono-hero-right"
                  initial="hidden"
                  animate="visible"
                  variants={fadeRight}
                >
                  <div className="enfono-chat-mockup">
                    <div className="ecm-header">
                      <div className="ecm-header-left">
                        <div className="ecm-avatar"><i className="fas fa-robot" /></div>
                        <div>
                          <div className="ecm-title">Enfono AI Assistant</div>
                          <div className="ecm-status"><span className="dot" /> Connected to ERPNext</div>
                        </div>
                      </div>
                      <i className="fas fa-ellipsis-h ecm-menu" />
                    </div>

                    <div className="ecm-body">
                      {/* User Message */}
                      <div className="ecm-message user">
                        <div className="ecm-bubble">
                          <p>Compare our operating costs vs revenue for Q1 so far.</p>
                        </div>
                      </div>

                      {/* AI Thinking */}
                      <div className="ecm-message ai thinking">
                        <div className="ecm-avatar-small"><i className="fas fa-robot" /></div>
                        <div className="ecm-bubble">
                          <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="ecm-message ai">
                        <div className="ecm-avatar-small"><i className="fas fa-robot" /></div>
                        <div className="ecm-bubble">
                          <p>Here is your Q1 insight. Your cost-to-revenue efficiency has improved by <strong>14.2%</strong> compared to last year.</p>

                          <div className="ecm-widget-chart">
                            <div className="ecm-chart-header">
                              <div>Q1 Snapshot</div>
                              <div className="ecm-badge-green"><i className="fas fa-arrow-up" /> Efficient</div>
                            </div>
                            <div className="ecm-bars">
                              <div className="ecm-bar-group">
                                <span className="label">Revenue</span>
                                <div className="bar-bg"><div className="bar-fill blue" style={{ width: '85%' }}></div></div>
                                <span className="val">SAR 4.2M</span>
                              </div>
                              <div className="ecm-bar-group">
                                <span className="label">Costs</span>
                                <div className="bar-bg"><div className="bar-fill red" style={{ width: '45%' }}></div></div>
                                <span className="val">SAR 1.8M</span>
                              </div>
                            </div>
                          </div>

                          <div className="ecm-actions">
                            <button className="ecm-action-btn"><i className="fas fa-file-export" /> Export PDF</button>
                            <button className="ecm-action-btn"><i className="fas fa-share-alt" /> Share</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ecm-footer">
                      <div className="ecm-input-box">
                        <i className="fas fa-chart-line ecm-input-icon" />
                        <span className="ecm-placeholder">Ask Enfono AI about your business...</span>
                        <button className="ecm-send-btn"><i className="fas fa-paper-plane" /></button>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="ecm-float-1">
                      <div className="ecf-icon"><i className="fas fa-bolt" /></div>
                      <div>
                        <div className="ecf-val">Instant Context</div>
                        <div className="ecf-label">No setup needed</div>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="enfono-stats-section">
          <div className="enfono-container">
            <div className="enfono-stats-inner">
              {(cmsData.stats || []).map((stat, idx) => (
                <StatCell
                  key={idx}
                  end={parseInt(stat.value)}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={idx === 0 ? "fas fa-project-diagram" : idx === 1 ? "fas fa-handshake" : idx === 2 ? "fas fa-globe-americas" : "fas fa-user-check"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CLIENT LOGOS ── */}
        <section className="e-logos-section">
          <div className="enfono-container">
            <m.div
              className="e-logos-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <p className="e-logos-label">Trusted by Leading Enterprises Across the GCC</p>
            </m.div>
            <div className="e-logos-track">
              <div className="e-logos-scroll">
                {[...(cmsData.client_logos || []), ...(cmsData.client_logos || [])].map((c, i) => (
                  <div key={i} className="e-logo-item">
                    <span className="e-logo-name">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="e-services-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-section-label">What We Do</div>
              <h2 className="e-section-title">End-to-End ERP Solutions<br />Built for GCC Businesses</h2>
              <p className="e-section-sub">100% open-source ERPNext with complete ownership — from strategy to implementation to AI-powered optimization.</p>
            </m.div>
            <m.div
              className="e-services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {services.map((s) => (
                <m.div key={s.title} className={`e-service-card${s.isAI ? ' ai-card' : ''}`} variants={fadeUp}>
                  <div className="esc-icon"><i className={s.icon} /></div>
                  {s.isAI && <div className="esc-ai-badge"><i className="fas fa-sparkles" /> AI-Powered</div>}
                  <div className="esc-title">{s.title}</div>
                  <div className="esc-desc">{s.desc}</div>
                  <ul className="esc-features">
                    {s.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <Link to={s.link} className="esc-link">Learn More <i className="fas fa-arrow-right" /></Link>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="e-industries-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-section-label">Industries We Serve</div>
              <h2 className="e-section-title">Specialized ERP for Every Sector</h2>
            </m.div>
            <m.div
              className="e-industries-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {industries.map(ind => (
                <m.div key={ind.label} className="e-industry-card" variants={fadeUp}>
                  <i className={ind.icon} />
                  <span>{ind.label}</span>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* ── AI ANALYTICS & BI SECTION ── */}
        <section className="e-ai-section">
          <div className="enfono-container">
            <div className="e-ai-grid">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeLeft}
              >
                <div className="e-section-label-amber">AI Analytics &amp; Business Intelligence</div>
                <h2 className="e-section-title-light">The Future of ERP<br />is <span style={{ color: '#10B981' }}>Intelligent</span></h2>
                <p className="e-section-sub-light" style={{ marginBottom: '16px' }}>
                  Our AI-powered ERP goes beyond traditional automation. Predictive analytics, smart dashboards, and natural language reporting help your business grow faster with data-driven decisions.
                </p>
                <Link to="/ai-erp" className="ehero-btn-primary" style={{ marginTop: '12px' }}>
                  Explore AI Analytics <i className="fas fa-arrow-right" style={{ fontSize: '12px', marginLeft: '4px' }} />
                </Link>
                <div className="e-ai-features">
                  {[
                    { icon: 'fas fa-chart-bar', title: 'Real-time Dashboards', desc: 'Live KPIs, revenue trends, and operational metrics at a glance.', amber: false },
                    { icon: 'fas fa-chart-area', title: 'Predictive Analytics', desc: 'Forecast demand, cash flow, and resource needs before issues arise.', amber: false },
                    { icon: 'fas fa-comments', title: 'Natural Language Reports', desc: 'Ask questions in plain English or Arabic. Get instant business insights.', amber: true },
                    { icon: 'fas fa-shield-alt', title: 'Anomaly Detection', desc: 'AI flags unusual patterns in finance, inventory, and procurement instantly.', amber: true },
                  ].map((f) => (
                    <m.div
                      key={f.title}
                      className={`e-ai-feat${f.amber ? ' amber-feat' : ''}`}
                      whileInView="visible"
                      initial="hidden"
                      viewport={{ once: true }}
                      variants={fadeUp}
                    >
                      <div className="eaf-icon"><i className={f.icon} /></div>
                      <div className="eaf-title">{f.title}</div>
                      <p className="eaf-desc">{f.desc}</p>
                    </m.div>
                  ))}
                </div>
              </m.div>

              <m.div
                className="e-ai-visual"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeRight}
              >
                <div className="eai-card">
                  <div className="eai-card-header">
                    <div className="eai-orb"><i className="fas fa-brain" /></div>
                    <div>
                      <div className="eai-card-title">AI Analytics Engine</div>
                      <div className="eai-card-sub">Real-time business intelligence</div>
                    </div>
                  </div>
                  {/* Mini Dashboard */}
                  <div className="eai-mini-dashboard">
                    <div className="eai-dash-row">
                      <div className="eai-dash-card">
                        <div className="eai-dash-label">Revenue</div>
                        <div className="eai-dash-val">SAR 4.2M</div>
                        <div className="eai-dash-trend up"><i className="fas fa-arrow-up" /> 12.4%</div>
                      </div>
                      <div className="eai-dash-card">
                        <div className="eai-dash-label">Orders</div>
                        <div className="eai-dash-val">1,247</div>
                        <div className="eai-dash-trend up"><i className="fas fa-arrow-up" /> 8.2%</div>
                      </div>
                    </div>
                    <div className="eai-dash-chart">
                      <div className="eai-dash-chart-label">Monthly Trend</div>
                      <div className="eai-dash-bars">
                        {[35, 45, 42, 55, 48, 62, 58, 70, 65, 78, 72, 85].map((h, i) => (
                          <div key={i} className="eai-dash-bar" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="eai-insights">
                    {[
                      { dot: 'amber', text: 'Inventory reorder alert — Stock running low', value: '⚠ Alert' },
                      { dot: 'green', text: 'Revenue forecast Q1 — on track vs target', value: '+12.4%' },
                      { dot: 'blue', text: 'AR overdue accounts — 7 need follow-up', value: '7 items' },
                      { dot: 'amber', text: 'AI vendor suggestion — savings opportunity', value: '18% save' },
                      { dot: 'green', text: 'Payroll processed — zero anomalies found', value: '✓ Done' },
                    ].map((item, idx) => (
                      <div key={idx} className="eai-insight">
                        <span className={`eai-dot ${item.dot}`} />
                        <span className="eai-text">{item.text}</span>
                        <span className="eai-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ── WHY ERPNEXT / WHY ENFONO ── */}
        <section className="e-why-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-section-label">Why ERPNext with Enfono</div>
              <h2 className="e-section-title">Open-Source ERP Expertise<br />You Can Trust</h2>
            </m.div>
            <div className="e-why-grid">
              <m.div
                className="e-why-features"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
              >
                {[
                  { icon: 'fas fa-unlock-alt', title: 'Lifetime-Free & Open Source', desc: 'Fully open-source ERP with no user limits. Complete ownership of system and codebase with self-hosting or managed options.' },
                  { icon: 'fas fa-puzzle-piece', title: 'Quick Modular Setup', desc: 'Deploy only the modules you need — accounting, HR, manufacturing, inventory — for faster implementation and lower cost.' },
                  { icon: 'fas fa-file-invoice', title: 'GCC & ZATCA Phase II Ready', desc: 'Built-in compliance for ZATCA e-invoicing Phase 1 & 2, VAT reporting, Arabic QR codes, and multi-currency support.' },
                  { icon: 'fas fa-cogs', title: 'Fully Customizable', desc: 'Built on Frappe Framework enabling complete customization. No vendor lock-in — unlike Odoo or Zoho.' },
                ].map(f => (
                  <m.div key={f.title} className="e-why-feat" variants={fadeUp}>
                    <div className="ewf-icon"><i className={f.icon} /></div>
                    <div>
                      <div className="ewf-title">{f.title}</div>
                      <p className="ewf-desc">{f.desc}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>

              <m.div
                className="e-why-right"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeRight}
              >
                <div className="e-cert-title">Strategic Partners</div>
                <div className="e-cert-grid">
                  {partners.map(c => (
                    <div key={c.label} className="e-cert-item">
                      <i className={c.icon} />
                      <p className="eci-label">{c.label}</p>
                      <p className="eci-sub">Certified</p>
                    </div>
                  ))}
                </div>
                <div className="e-cert-title" style={{ marginTop: '20px' }}>Compliance</div>
                <div className="e-cert-grid">
                  {[
                    { icon: 'fas fa-file-invoice-dollar', label: 'ZATCA Phase II', sub: 'e-Invoicing' },
                    { icon: 'fas fa-eye', label: 'Vision 2030', sub: 'Saudi Arabia' },
                    { icon: 'fas fa-shield-alt', label: 'NCA', sub: 'Cybersecurity' },
                    { icon: 'fas fa-language', label: 'Arabic RTL', sub: 'Full Support' },
                  ].map(c => (
                    <div key={c.label} className="e-cert-item">
                      <i className={c.icon} />
                      <p className="eci-label">{c.label}</p>
                      <p className="eci-sub">{c.sub}</p>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section className="e-cs-section" style={{ padding: '120px 0', background: '#fff' }}>
          <div className="enfono-container">
            <m.div
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '64px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div>
                <div style={{ color: '#10B981', fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Client Success Stories</div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Real Results for<br />Real Businesses</h2>
              </div>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#10B981', textDecoration: 'none' }}>
                View All Case Studies <i className="fas fa-arrow-right" style={{ fontSize: '12px' }} />
              </Link>
            </m.div>

            <m.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {(cmsData.our_work || []).slice(0, 3).map((cs, i) => (
                <m.div
                  key={cs.id || i}
                  variants={fadeUp}
                  style={{
                    background: '#070707',
                    borderRadius: '32px',
                    padding: '48px 40px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '440px'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at 100% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
                      <i className={cs.icon || 'fas fa-tag'} style={{ fontSize: '14px' }} />
                      <span>{cs.category} · {cs.country}</span>
                    </div>
                    <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '20px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{cs.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, marginBottom: '40px' }}>{cs.subtitle}</p>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(16,185,129,0.08)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    padding: '10px 20px',
                    borderRadius: '100px',
                    color: '#10B981',
                    fontSize: '14px',
                    fontWeight: 700,
                    width: 'fit-content'
                  }}>
                    <i className="fas fa-chart-line" />
                    {cs.outcome}
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>


        {/* ── TESTIMONIALS ── */}
        <section className="e-testimonials-section">
          <div className="enfono-container">
            <m.div
              className="e-section-header-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-section-label-amber">Client Testimonials</div>
              <h2 className="e-section-title-light">Trusted by GCC Leaders</h2>
            </m.div>
            <m.div
              className="e-testimonials-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {(cmsData.testimonials || []).map(t => (
                <m.div key={t.name} className="e-testimonial-card" variants={fadeUp}>
                  <div className="etc-stars">{[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" />)}</div>
                  <p className="etc-quote">"{t.quote}"</p>
                  <div className="etc-author">
                    <div className="etc-avatar">{t.initials}</div>
                    <div>
                      <div className="etc-name">{t.name}</div>
                      <div className="etc-role">{t.role}</div>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>

            {/* Trust Badges */}
            <m.div
              className="e-trust-badges"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-trust-badge">
                <i className="fas fa-star" />
                <div>
                  <div className="etb-val">5/5</div>
                  <div className="etb-label">Clutch · 31 Reviews</div>
                </div>
              </div>

              <div className="e-trust-badge">
                <i className="fab fa-google" />
                <div>
                  <div className="etb-val">4.9/5</div>
                  <div className="etb-label">Google Reviews</div>
                </div>
              </div>
              <div className="e-trust-badge">
                <i className="fas fa-certificate" />
                <div>
                  <div className="etb-val">100%</div>
                  <div className="etb-label">Frappe Certified</div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ── OUR PRODUCTS ── */}
        <section className="e-brands-section">
          <div className="enfono-container">
            <m.div
              style={{ textAlign: 'center' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="e-section-label-amber">Our Products</div>
              <h2 className="e-section-title">Beyond Consulting —<br />We Build Products</h2>
              <p className="e-section-sub" style={{ margin: '0 auto', maxWidth: '540px' }}>
                Proprietary SaaS products built for GCC businesses — extending ERPNext capabilities.
              </p>
            </m.div>
            <m.div
              className="e-brands-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {(cmsData.brands || []).map(b => (
                <m.div key={b.name} variants={fadeUp}>
                  <Link to="/brands" className={`e-brand-card ${b.featured ? 'featured' : ''}`}>
                    <div className="ebc-icon">
                      {b.logo ? (
                        <img src={b.logo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <i className={b.icon} />
                      )}
                    </div>
                    <div className="ebc-content">
                      <div className="ebc-name">{b.name}</div>
                      <div className="ebc-desc">{b.desc}</div>
                      <div className="ebc-learn-more">
                        <span>Learn More</span>
                        <i className="fas fa-arrow-right" />
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>


        {/* ── EVENTS & INSIGHTS ── */}
        <section className="e-events-section">
          <div className="enfono-container">
            <m.div
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div>
                <div className="e-section-label">Media & Events</div>
                <h2 className="e-section-title" style={{ margin: 0 }}>Enfono in Action</h2>
              </div>
            </m.div>

            <m.div
              className="e-events-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {(cmsData.media_events || []).map((ev, idx) => (
                <m.div key={idx} className="e-event-card" variants={fadeUp}>
                  <div className="eev-image-wrapper">
                    <img src={ev.image} alt={ev.title} className="eev-image fadeIn" width="600" height="400" loading="lazy" />
                    <div className="eev-date-badge">
                      <span className="day">{ev.date.split(' ')[0]}</span>
                      <span className="month">{ev.date.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="eev-content">
                    <div className="eev-meta">
                      {ev.tags && ev.tags.map((tag, tIdx) => (
                        <span key={tIdx}><i className={tag.icon} /> {tag.text}</span>
                      ))}
                    </div>
                    <h3 className="eev-title">{ev.title}</h3>
                    <p className="eev-desc">{ev.desc}</p>
                    <div className="eev-actions">
                      {ev.buttons && ev.buttons.map((btn, bIdx) =>
                        btn.type === 'disabled' ? (
                          <span key={bIdx} className="eev-link disabled">
                            <i className="far fa-images" />
                            {btn.label}
                          </span>
                        ) : (
                          <a
                            key={bIdx}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`eev-link ${btn.type || ''}`}
                          >
                            {btn.type === 'youtube' && <i className="fab fa-youtube" />}
                            {btn.type === 'instagram' && <i className="fab fa-instagram" />}
                            {btn.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>



        <EnfonoFooter />
      </div >
    </LazyMotion >
  )
}
