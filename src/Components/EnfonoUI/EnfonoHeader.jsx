import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobalContext from '../../Context/Context';
import { useTheme } from '../../Context/ThemeContext'
import { initialCmsData } from "../../Data/cms_data";

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
  { label: 'Our Work', path: '/our-work' },
  { label: 'Media & Events', path: '/events' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Our Brands', path: '/brands' },
  { label: 'Careers', path: '/careers' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function EnfonoHeader({ mobileOpen, setMobileOpen }) {
  const { cmsData } = useContext(GlobalContext);
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const headerRef = useRef(null)
  const dropdownTimer = useRef(null)
  const lastScrollY = useRef(0)
  const { isDark, toggleTheme } = useTheme()
  const data = cmsData || initialCmsData;

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 30)

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }

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
      className={`enfono-header-new ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''} ${hidden ? 'nav-hidden' : ''}`}
    >
      <div className="enfono-header-inner">
        {/* Logo */}
        <Link to="/" className="enfono-logo-link">
          <img
            src="/assets/img/enfono-logo.png"
            alt="Enfono Technologies"
            className="enfono-logo-img"
            width="150"
            height="40"
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
          <Link to={cmsData.hero.booking_url} className="enfono-header-cta">
            {cmsData.hero.cta_primary}
          </Link>
          <button
            className={`enfono-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`enfono-mobile-menu ${mobileOpen ? 'open' : ''}`} style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'rgba(13, 13, 13, 0.98)',
        width: '100vw',
        left: 0,
        maxHeight: mobileOpen ? '100vh' : '0',
        zIndex: 9999
      }}>
        <div className="enfono-mobile-inner">
          {navLinks.map((link) => (
            <div key={link.label} className="enfono-mobile-item">
              {link.children ? (
                <>
                  <button
                    className="enfono-mobile-link enfono-mobile-toggle"
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    aria-expanded={mobileExpanded === link.label}
                    aria-label={`Toggle ${link.label} submenu`}
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
            <Link to={cmsData.hero.booking_url} className="enfono-mobile-cta" style={{ flexGrow: 1, marginTop: 0 }}>
              {cmsData.hero.cta_primary}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
