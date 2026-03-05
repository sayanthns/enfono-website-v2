import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initialCmsData } from "../../Data/cms_data";

export default function EnfonoFooter({ hideCta = false }) {
  const [cmsData, setCmsData] = useState(initialCmsData);

  useEffect(() => {
    const saved = localStorage.getItem('enfono_cms_data');
    if (saved) {
      setCmsData(JSON.parse(saved));
    }
  }, []);
  return (
    <footer className="enfono-footer-new">
      {/* Top CTA Band */}
      {!hideCta && (
        <div className="enfono-footer-cta-band">
          <div className="enfono-container">
            <div className="efcta-inner">
              <div className="efcta-text">
                <h3>Ready to Transform<br />Your Business with ERP?</h3>
                <p>Book a free 60-minute ERP strategy session with our Industry experts. No commitment required.</p>
              </div>
              <div className="efcta-actions">
                <Link to={cmsData.hero.booking_url} className="efcta-btn-primary"><i className="fas fa-calendar-check" style={{ marginRight: '6px' }} /> Get Free Consultation</Link>
                <a href={`tel:${cmsData.contact.phone.replace(/\s/g, '')}`} className="efcta-btn-outline"><i className="fas fa-phone" style={{ marginRight: '6px' }} /> {cmsData.contact.phone}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Contact Widget */}
      <div className="enfono-floating-widget">
        <button
          className="efw-item efw-arrow"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-right" />
        </button>
        <a href={`https://wa.me/${cmsData.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="efw-item efw-wa" aria-label="Chat on WhatsApp">
          <i className="fab fa-whatsapp" />
        </a>
        <a href={`tel:${cmsData.contact.phone.replace(/\s/g, '')}`} className="efw-item efw-phone" aria-label="Call Us">
          <i className="fas fa-phone-alt" />
        </a>
      </div>

      {/* Dedicated Chatbot Trigger */}
      <button
        className="enfono-chatbot-trigger"
        onClick={() => alert('Chatbot coming soon!')}
        aria-label="Open Enfono Assistant"
      >
        <i className="fas fa-comment-dots" />
        <span className="ecb-status-dot"></span>
      </button>


      {/* Main Footer */}
      <div className="enfono-footer-main">
        <div className="enfono-container">
          <div className="ef-grid">
            {/* Brand Column */}
            <div className="ef-col ef-col-brand">
              <Link to="/" className="ef-logo-link">
                <img
                  src="/assets/img/enfono-logo.png"
                  alt="Enfono Technologies"
                  className="ef-logo"
                  width="140"
                  height="36"
                  style={{ filter: 'var(--t-logo-filter)' }}
                />
              </Link>
              <p className="ef-tagline">
                GCC's trusted ERP partner — powering digital transformation across Saudi Arabia, UAE, and Oman with ERPNext and AI-driven solutions.
              </p>
              <div className="ef-social">
                <a href="https://www.linkedin.com/company/enfono-technologies/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="https://twitter.com/enfono" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-x-twitter" />
                </a>
                <a href="https://youtube.com/@enfono" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube" />
                </a>
                <a href="https://www.instagram.com/enfono.official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="ef-col">
              <h4 className="ef-col-title">Services</h4>
              <ul className="ef-links">
                <li><Link to="/services">ERPNext Implementation</Link></li>
                <li><Link to="/services">Custom ERP Development</Link></li>
                <li><Link to="/ai-erp">AI-Powered ERP</Link></li>
                <li><Link to="/services">ERP Consulting</Link></li>
                <li><Link to="/services">Support & Maintenance</Link></li>
                <li><Link to="/services">Cloud Migration</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="ef-col">
              <h4 className="ef-col-title">Company</h4>
              <ul className="ef-links">
                <li><Link to="/about">About Enfono</Link></li>
                <li><Link to="/our-work">Our Work</Link></li>
                <li><Link to="/brands">Our Brands</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Offices */}
            <div className="ef-col">
              <h4 className="ef-col-title">Our Offices</h4>
              <div className="ef-office">
                <div className="ef-office-badge">
                  <i className="fas fa-building" />
                  Saudi Arabia
                </div>
                <p>Sharafiyah, Jeddah, KSA</p>
              </div>
              <div className="ef-office">
                <div className="ef-office-badge">
                  <i className="fas fa-building" />
                  India — Kochi
                </div>
                <p>2nd Floor, Suite 598, Valamkottil Towers, Kakkanad, Kochi - 682021</p>
              </div>
              <div className="ef-office">
                <div className="ef-office-badge">
                  <i className="fas fa-building" />
                  India — Calicut
                </div>
                <p>Safar Arcade, Near Calicut International Airport, Kerala 673638</p>
              </div>
              <div className="ef-contact-links">
                <a href="mailto:contact@enfono.com">
                  <i className="fas fa-envelope" /> contact@enfono.com
                </a>
                <a href="tel:+966573528619">
                  <i className="fas fa-phone" /> +966 57 352 8619
                </a>
                <a href="tel:+917593922039">
                  <i className="fas fa-phone" /> +91 75939 22039
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="enfono-footer-bottom">
        <div className="enfono-container">
          <div className="ef-bottom-inner">
            <div className="ef-bottom-logo">
              <img
                src="/assets/img/enfono-logo.png"
                alt="Enfono"
                className="ef-bottom-logo-img"
                width="100"
                height="28"
                style={{ filter: 'var(--t-logo-filter)' }}
              />
            </div>
            <p>&copy; {new Date().getFullYear()} Enfono Technologies. All rights reserved.</p>
            <div className="ef-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
