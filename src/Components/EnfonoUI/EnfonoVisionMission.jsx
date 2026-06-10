import React from 'react'
import { motion } from 'framer-motion'

/*
 * Enfono Vision & Mission section.
 *
 * Props:
 *   variant   "mountain" | "split" | "stepper"  (default "split")
 *   compact   boolean — condensed teaser for the homepage
 *
 * Theme: site green  #10B981 / #34D399  on dark #0D0D0D.
 * Self-contained styles (scoped <style>) so it renders without an SCSS rebuild.
 */

const G = '#10B981'
const G_LIGHT = '#34D399'
const G_DARK = '#065F46'
const INK = '#0F172A'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
}

const MISSION = {
  label: 'Our Mission',
  tag: 'The WHY',
  lead: ['Enfono is built to drive the ', 'transformation', ' of business through ', 'honest', ' technology, ', 'ethical', ' growth and operational excellence.'],
  pillars: [
    { icon: 'fas fa-handshake', title: 'Honest', sub: 'Technology' },
    { icon: 'fas fa-chart-line', title: 'Ethical', sub: 'Growth' },
    { icon: 'fas fa-award', title: 'Operational', sub: 'Excellence' },
  ],
}

const VISION = {
  label: 'Our Vision',
  tag: 'The Path',
  lead: ['Be a ', 'trustable', ' partner of ', '2000 small & medium', ' business for their digital transformation journey and ', 'top 10 ERP partner', ' in GCC and Africa by 2030.'],
  milestones: [
    { icon: 'fas fa-users', big: '2000', text: 'Small & Medium Business Partners' },
    { icon: 'fas fa-trophy', big: 'TOP 10', text: 'ERP Partner in GCC & Africa by 2030' },
  ],
}

const STRIP = [
  { icon: 'fas fa-handshake', title: 'Trust', desc: 'Building lasting partnerships' },
  { icon: 'fas fa-chart-line', title: 'Growth', desc: 'Empowering businesses to grow smarter' },
  { icon: 'fas fa-bullseye', title: 'Transformation', desc: 'Driving digital transformation with technology' },
]

// bold the highlighted fragments (odd indexes of the lead array)
const renderLead = (parts) =>
  parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))

const Strip = () => (
  <div className="evm-strip">
    <div className="evm-strip-brand">
      <i className="fas fa-cubes" />
      <span>ENFONO<br />TECHNOLOGIES</span>
    </div>
    <div className="evm-strip-items">
      {STRIP.map((s, i) => (
        <div className="evm-strip-item" key={i}>
          <span className="evm-strip-ic"><i className={s.icon} /></span>
          <div>
            <div className="evm-strip-t">{s.title}</div>
            <div className="evm-strip-d">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* ── Variant A: Mountain path (CSS/SVG) ─────────────────── */
const MountainVariant = () => (
  <div className="evm evm-mountain">
    <div className="evm-container">
      {/* Mission */}
      <motion.div className="evm-mission-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <span className="evm-eyebrow"><i className="fas fa-bullseye" /> {MISSION.label} <em>({MISSION.tag})</em></span>
        <p className="evm-lead">{renderLead(MISSION.lead)}</p>
        <div className="evm-pillars">
          {MISSION.pillars.map((p, i) => (
            <div className="evm-pillar" key={i}>
              <span className="evm-pillar-ic"><i className={p.icon} /></span>
              <span><strong>{p.title}</strong> {p.sub}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vision with mountain */}
      <motion.div className="evm-vision-mountain" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="evm-vision-text">
          <span className="evm-eyebrow"><i className="fas fa-flag" /> {VISION.label} <em>({VISION.tag})</em></span>
          <p className="evm-lead">{renderLead(VISION.lead)}</p>
        </div>
        <div className="evm-mtn">
          <svg viewBox="0 0 420 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="evmSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ECFDF5" />
                <stop offset="100%" stopColor="#D1FAE5" />
              </linearGradient>
              <linearGradient id="evmMtn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
            </defs>
            <rect width="420" height="300" fill="url(#evmSky)" />
            {/* back ridge */}
            <path d="M0 230 L120 120 L210 200 L300 110 L420 230 Z" fill="#A7F3D0" opacity="0.7" />
            {/* main mountain */}
            <path d="M40 300 L230 70 L420 300 Z" fill="url(#evmMtn)" />
            {/* winding path */}
            <path d="M150 300 C 180 250, 130 220, 190 190 C 240 165, 200 140, 230 95"
              fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
            <path d="M150 300 C 180 250, 130 220, 190 190 C 240 165, 200 140, 230 95"
              fill="none" stroke={G_LIGHT} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
            {/* summit flag */}
            <line x1="230" y1="95" x2="230" y2="55" stroke={G_DARK} strokeWidth="3" />
            <path d="M230 56 L256 64 L230 74 Z" fill={G} />
          </svg>
          {VISION.milestones.map((m, i) => (
            <div className={`evm-mark evm-mark-${i}`} key={i}>
              <span className="evm-mark-ic"><i className={m.icon} /></span>
              <div className="evm-mark-big">{m.big}</div>
              <div className="evm-mark-text">{m.text}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <Strip />
    </div>
  </div>
)

/* ── Variant B: Split cards ─────────────────────────────── */
const SplitVariant = () => (
  <div className="evm evm-split">
    <div className="evm-container">
      <div className="evm-split-grid">
        {/* Mission card */}
        <motion.div className="evm-card evm-card-light" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <span className="evm-eyebrow"><i className="fas fa-bullseye" /> {MISSION.label} <em>({MISSION.tag})</em></span>
          <p className="evm-lead">{renderLead(MISSION.lead)}</p>
          <div className="evm-pillars evm-pillars-col">
            {MISSION.pillars.map((p, i) => (
              <div className="evm-pillar" key={i}>
                <span className="evm-pillar-ic"><i className={p.icon} /></span>
                <span><strong>{p.title}</strong> {p.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vision card */}
        <motion.div className="evm-card evm-card-dark" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
          <span className="evm-eyebrow evm-on-dark"><i className="fas fa-flag" /> {VISION.label} <em>({VISION.tag})</em></span>
          <p className="evm-lead evm-on-dark">{renderLead(VISION.lead)}</p>
          <div className="evm-miles">
            {VISION.milestones.map((m, i) => (
              <div className="evm-mile" key={i}>
                <span className="evm-mile-ic"><i className={m.icon} /></span>
                <div>
                  <div className="evm-mile-big">{m.big}</div>
                  <div className="evm-mile-text">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Strip />
    </div>
  </div>
)

/* ── Variant C: Stepper ─────────────────────────────────── */
const StepperVariant = () => (
  <div className="evm evm-stepper">
    <div className="evm-container">
      <motion.div className="evm-mission-block evm-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <span className="evm-eyebrow"><i className="fas fa-bullseye" /> {MISSION.label} <em>({MISSION.tag})</em></span>
        <p className="evm-lead">{renderLead(MISSION.lead)}</p>
        <div className="evm-pillars evm-pillars-center">
          {MISSION.pillars.map((p, i) => (
            <div className="evm-pillar" key={i}>
              <span className="evm-pillar-ic"><i className={p.icon} /></span>
              <span><strong>{p.title}</strong> {p.sub}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="evm-vision-stepper" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <span className="evm-eyebrow evm-center-eyebrow"><i className="fas fa-flag" /> {VISION.label} <em>({VISION.tag})</em></span>
        <p className="evm-lead evm-center">{renderLead(VISION.lead)}</p>
        <div className="evm-track">
          <div className="evm-track-line" />
          {VISION.milestones.map((m, i) => (
            <div className="evm-node" key={i}>
              <span className="evm-node-dot"><i className={m.icon} /></span>
              <div className="evm-node-big">{m.big}</div>
              <div className="evm-node-text">{m.text}</div>
            </div>
          ))}
          <div className="evm-node evm-node-goal">
            <span className="evm-node-dot evm-node-dot-flag"><i className="fas fa-flag-checkered" /></span>
            <div className="evm-node-big">2030</div>
            <div className="evm-node-text">Goal reached</div>
          </div>
        </div>
      </motion.div>
      <Strip />
    </div>
  </div>
)

const VARIANTS = { mountain: MountainVariant, split: SplitVariant, stepper: StepperVariant }

const EnfonoVisionMission = ({ variant = 'split' }) => {
  const Cmp = VARIANTS[variant] || SplitVariant
  return (
    <>
      <Cmp />
      <style>{styles}</style>
    </>
  )
}

export default EnfonoVisionMission

const styles = `
.evm{font-family:'Inter',sans-serif;color:${INK};padding:84px 0;background:#fff;overflow:hidden}
.evm-container{max-width:1180px;margin:0 auto;padding:0 24px}
.evm-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'Poppins',sans-serif;font-weight:800;font-size:clamp(20px,3vw,30px);color:${G_DARK};letter-spacing:-.5px;margin-bottom:18px;text-transform:uppercase}
.evm-eyebrow i{color:${G};font-size:.8em}
.evm-eyebrow em{font-style:normal;font-size:.55em;color:${G};font-weight:700;letter-spacing:.5px}
.evm-lead{font-size:clamp(18px,2.2vw,26px);line-height:1.55;color:#1f2937;max-width:620px;margin:0 0 28px}
.evm-lead strong{color:${G_DARK};font-weight:800}
.evm-on-dark{color:#fff!important}
.evm-on-dark.evm-lead strong{color:${G_LIGHT}}
.evm-on-dark i{color:${G_LIGHT}}

/* pillars */
.evm-pillars{display:flex;flex-wrap:wrap;gap:14px}
.evm-pillars-col{flex-direction:column}
.evm-pillars-center{justify-content:center}
.evm-pillar{display:inline-flex;align-items:center;gap:12px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:100px;padding:10px 20px 10px 12px;font-size:15px}
.evm-pillar strong{color:${G_DARK};font-weight:800}
.evm-pillar-ic{width:34px;height:34px;border-radius:50%;background:${G};color:#fff;display:grid;place-items:center;font-size:14px;flex-shrink:0}

/* strip */
.evm-strip{margin-top:56px;padding-top:30px;border-top:1px solid #E5E7EB;display:flex;align-items:center;gap:32px;flex-wrap:wrap}
.evm-strip-brand{display:flex;align-items:center;gap:12px;font-family:'Poppins',sans-serif;font-weight:800;font-size:14px;line-height:1.1;color:${INK};padding-right:28px;border-right:1px solid #E5E7EB}
.evm-strip-brand i{font-size:30px;color:${G_DARK}}
.evm-strip-items{display:flex;gap:36px;flex-wrap:wrap;flex:1}
.evm-strip-item{display:flex;align-items:center;gap:12px}
.evm-strip-ic{width:42px;height:42px;border-radius:50%;border:2px solid ${G};color:${G_DARK};display:grid;place-items:center;font-size:16px;flex-shrink:0}
.evm-strip-t{font-family:'Poppins',sans-serif;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${G_DARK}}
.evm-strip-d{font-size:12.5px;color:#6B7280}

/* ── mountain variant ── */
.evm-mission-block{margin-bottom:54px;text-align:center}
.evm-mission-block .evm-lead{margin-left:auto;margin-right:auto}
.evm-mission-block .evm-pillars{justify-content:center}
.evm-vision-mountain{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.evm-mtn{position:relative;border-radius:20px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(6,95,70,.35)}
.evm-mtn svg{display:block;width:100%;height:auto}
.evm-mark{position:absolute;background:#fff;border-radius:14px;padding:10px 14px;box-shadow:0 10px 30px -8px rgba(0,0,0,.25);text-align:center;min-width:108px}
.evm-mark-ic{position:absolute;top:-16px;left:50%;transform:translateX(-50%);width:32px;height:32px;border-radius:50%;background:${G_DARK};color:#fff;display:grid;place-items:center;font-size:13px}
.evm-mark-big{font-family:'Poppins',sans-serif;font-weight:800;font-size:18px;color:${G_DARK};margin-top:6px}
.evm-mark-text{font-size:10.5px;line-height:1.3;color:#374151}
.evm-mark-0{left:32%;bottom:16%}
.evm-mark-1{right:6%;top:30%}

/* ── split variant ── */
.evm-split-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.evm-card{border-radius:22px;padding:44px}
.evm-card-light{background:linear-gradient(160deg,#F0FDF4,#fff);border:1px solid #D1FAE5}
.evm-card-dark{background:linear-gradient(155deg,#065F46,#0D0D0D);position:relative;overflow:hidden}
.evm-card-dark:before{content:"";position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(52,211,153,.4),transparent 70%)}
.evm-miles{display:flex;flex-direction:column;gap:18px;position:relative;z-index:1}
.evm-mile{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 18px}
.evm-mile-ic{width:46px;height:46px;border-radius:12px;background:${G};color:#fff;display:grid;place-items:center;font-size:18px;flex-shrink:0}
.evm-mile-big{font-family:'Poppins',sans-serif;font-weight:800;font-size:22px;color:#fff;line-height:1}
.evm-mile-text{font-size:13px;color:rgba(255,255,255,.7);margin-top:3px}

/* ── stepper variant ── */
.evm-center{text-align:center;margin-left:auto;margin-right:auto}
.evm-center-eyebrow{display:flex;justify-content:center}
.evm-vision-stepper{margin-top:30px;background:linear-gradient(155deg,#065F46,#0D0D0D);border-radius:24px;padding:52px 40px;text-align:center;position:relative;overflow:hidden}
.evm-vision-stepper .evm-eyebrow{color:#fff}
.evm-vision-stepper .evm-eyebrow i{color:${G_LIGHT}}
.evm-vision-stepper .evm-lead{color:#fff;margin:0 auto 44px}
.evm-vision-stepper .evm-lead strong{color:${G_LIGHT}}
.evm-track{display:flex;justify-content:center;align-items:flex-start;gap:60px;position:relative;flex-wrap:wrap}
.evm-track-line{position:absolute;top:30px;left:12%;right:12%;height:3px;background:linear-gradient(90deg,transparent,${G},${G_LIGHT},transparent)}
.evm-node{position:relative;z-index:1;width:170px}
.evm-node-dot{width:62px;height:62px;border-radius:50%;background:${G};color:#fff;display:grid;place-items:center;font-size:22px;margin:0 auto 16px;box-shadow:0 0 0 8px rgba(16,185,129,.18)}
.evm-node-dot-flag{background:#fff;color:${G_DARK}}
.evm-node-big{font-family:'Poppins',sans-serif;font-weight:800;font-size:26px;color:#fff;line-height:1}
.evm-node-text{font-size:13px;color:rgba(255,255,255,.72);margin-top:6px}

@media(max-width:860px){
  .evm{padding:60px 0}
  .evm-vision-mountain,.evm-split-grid{grid-template-columns:1fr}
  .evm-card{padding:32px}
  .evm-strip{gap:20px}
  .evm-strip-brand{border-right:none;padding-right:0}
  .evm-strip-items{gap:20px}
  .evm-track{gap:32px}
  .evm-track-line{display:none}
}
`
