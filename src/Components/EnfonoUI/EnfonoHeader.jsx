import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../Context/ThemeContext'

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'ERPNext Implementation', path: '/services/erpnext-implementation', icon: 'fas fa-cubes' },
      { label: 'Custom ERP Development', path: '/services/custom-erp', icon: 'fas fa-code' },
      { label: 'AI-Powered ERP', path: '/ai-erp', icon: 'fas fa-brain' },
      { label: 'ERP Consulting', path: '/services/erp-consulting', icon: 'fas fa-chart-line' },
      { label: 'Support & Maintenance', path: '/services/support', icon: 'fas fa-headset' },
      { label: 'Cloud Migration', path: '/services/cloud', icon: 'fas fa-cloud' },
    ]
  },
  { label: 'AI & Analytics', path: '/ai-erp' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Our Brands', path: '/brands' },
  { label: 'Careers', path: '/careers' },
  { label: 'About', path: '/about' },
]

export default function EnfonoHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const headerRef = useRef(null)
  const dropdownTimer = useRef(null)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileExpanded(null)
  }, [location])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header
      ref={headerRef}
      className={`enfono-header-new ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="enfono-header-inner">
        {/* Logo */}
        <Link to="/" className="enfono-logo-link">
          <img
            src="/assets/img/enfono-logo.png"
            alt="Enfono Technologies"
            className="enfono-logo-img"
          />
          <span className="enfono-logo-text" style={{ display: 'none' }}>
            enfo<span>no</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="enfono-nav-desktop">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className={`enfono-nav-item ${link.children ? 'has-dropdown' : ''}`}
              onMouseEnter={() => link.children && handleMouseEnter(link.label)}
              onMouseLeave={() => link.children && handleMouseLeave()}
            >
              <Link
                to={link.path}
                className={`enfono-nav-link ${isActive(link.path) && link.path !== '/' ? 'active' : ''} ${link.path === '/' && location.pathname === '/' ? 'active' : ''}`}
              >
                {link.label}
                {link.children && <i className="fas fa-chevron-down enfono-nav-caret" />}
              </Link>
              {link.children && activeDropdown === link.label && (
                <div className="enfono-dropdown">
                  {link.children.map((child) => (
                    <Link key={child.path} to={child.path} className="enfono-dropdown-item">
                      <i className={`${child.icon} enfono-dropdown-icon`} />
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="enfono-header-actions">
          <button
            className="enfono-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {isDark ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
          </button>
          <Link to="/contact" className="enfono-header-cta">
            Get Free Consultation
          </Link>
          <button
            className={`enfono-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`enfono-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="enfono-mobile-inner">
          {navLinks.map((link) => (
            <div key={link.label} className="enfono-mobile-item">
              {link.children ? (
                <>
                  <button
                    className="enfono-mobile-link enfono-mobile-toggle"
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  >
                    {link.label}
                    <i className={`fas fa-chevron-down ${mobileExpanded === link.label ? 'rotated' : ''}`} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="enfono-mobile-sub">
                      {link.children.map((child) => (
                        <Link key={child.path} to={child.path} className="enfono-mobile-sub-link">
                          <i className={child.icon} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={link.path} className="enfono-mobile-link">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              className="enfono-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{ flexShrink: 0 }}
            >
              {isDark ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
            </button>
            <Link to="/contact" className="enfono-mobile-cta" style={{ flexGrow: 1, marginTop: 0 }}>
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
