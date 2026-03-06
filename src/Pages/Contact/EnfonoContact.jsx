import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'

import { initialCmsData } from '../../Data/cms_data'

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const fadeInLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }

const faqs = [
    { q: 'How long does an ERPNext implementation take?', a: 'Typical implementations range from 3-8 months depending on scope, number of modules, and organizational complexity. We provide a detailed timeline after the discovery phase.' },
    { q: 'Do you support Arabic and RTL in ERPNext?', a: 'Yes. All our ERPNext implementations include full Arabic language support, RTL layout, and Arabic number formatting out of the box.' },
    { q: 'Is your solution ZATCA Phase 2 compliant?', a: 'Absolutely. We are one of the first ERPNext partners to deliver ZATCA Phase 2 (CSID/OTP integration) compliance for our Saudi clients.' },
    { q: 'Do you offer post-go-live support?', a: 'Yes. We offer structured AMC (Annual Maintenance Contracts) with SLA-backed response times, starting from 4-hour response for critical issues.' },
    { q: 'Can you migrate data from our existing system?', a: 'We handle data migration from any source — SAP, Oracle, Tally, QuickBooks, Excel, or custom legacy systems — with zero data loss guaranteed.' },
]

const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    company: Yup.string().required('Company name is required'),
    service: Yup.string().required('Please select a service'),
    message: Yup.string().min(10, 'Please provide more detail').required('Message is required'),
})

const EnfonoContact = () => {
    const [submitted, setSubmitted] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)
    const data = initialCmsData;

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <EnfonoHeader />

            <div className="enfono-page-hero">
                <Container>
                    <nav aria-label="breadcrumb"><ol className="breadcrumb mb-4"><li className="breadcrumb-item"><Link to="/">Home</Link></li><li className="breadcrumb-item active">Contact</li></ol></nav>
                    <span className="enfono-section-label">Reach Out</span>
                    <h1 className="page-hero-title mb-4">Get In Touch</h1>
                    <p className="page-hero-desc" style={{ maxWidth: '600px' }}>Ready to transform your ERP? Book a free 60-minute consultation with our GCC ERP experts. No commitment required.</p>
                </Container>
            </div>

            <section style={{ background: '#F8FAFC', padding: '70px 0' }}>
                <Container>
                    <LazyMotion features={domAnimation}>
                        <Row className="g-5">
                            {/* Contact Form */}
                            <Col lg={7}>
                                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                    <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #E5E7EB' }}>
                                        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}>Book a Free Consultation</h2>
                                        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '36px' }}>Fill out the form and our team will get back to you within 24 hours.</p>

                                        {submitted ? (
                                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                                <div style={{ width: '70px', height: '70px', background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                                    <i className="fas fa-check" style={{ fontSize: '28px', color: '#059669' }}></i>
                                                </div>
                                                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>Message Received!</h3>
                                                <p style={{ fontSize: '15px', color: '#6B7280' }}>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                                            </div>
                                        ) : (
                                            <Formik
                                                initialValues={{ name: '', email: '', phone: '', company: '', service: '', country: 'Saudi Arabia', message: '' }}
                                                validationSchema={contactSchema}
                                                onSubmit={(values, { setSubmitting }) => {
                                                    // Save to leads in localStorage
                                                    const existingLeads = JSON.parse(localStorage.getItem('enfono_leads') || '[]');
                                                    const newLead = {
                                                        ...values,
                                                        id: Date.now(),
                                                        date: new Date().toLocaleString(),
                                                        status: 'New'
                                                    };
                                                    localStorage.setItem('enfono_leads', JSON.stringify([newLead, ...existingLeads]));

                                                    setTimeout(() => {
                                                        setSubmitting(false);
                                                        setSubmitted(true)
                                                    }, 1000)
                                                }}
                                            >
                                                {({ isSubmitting, errors, touched }) => (
                                                    <Form>
                                                        <Row className="g-3">
                                                            {[
                                                                { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name', half: true },
                                                                { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'you@company.com', half: true },
                                                                { name: 'phone', label: 'Phone / WhatsApp *', type: 'tel', placeholder: '+966 XX XXX XXXX', half: true },
                                                                { name: 'company', label: 'Company Name *', type: 'text', placeholder: 'Your company name', half: true },
                                                            ].map((field) => (
                                                                <Col key={field.name} md={field.half ? 6 : 12}>
                                                                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>{field.label}</label>
                                                                    <Field name={field.name} type={field.type} placeholder={field.placeholder}
                                                                        style={{ width: '100%', padding: '11px 14px', border: `1px solid ${errors[field.name] && touched[field.name] ? '#EF4444' : '#E5E7EB'}`, borderRadius: '8px', fontSize: '14px', color: '#374151', outline: 'none', transition: 'border-color 0.2s' }}
                                                                    />
                                                                    <ErrorMessage name={field.name} component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }} />
                                                                </Col>
                                                            ))}
                                                            <Col md={6}>
                                                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Service Interested In *</label>
                                                                <Field as="select" name="service" style={{ width: '100%', padding: '11px 14px', border: `1px solid ${errors.service && touched.service ? '#EF4444' : '#E5E7EB'}`, borderRadius: '8px', fontSize: '14px', color: '#374151', outline: 'none', background: '#fff' }}>
                                                                    <option value="">Select a service</option>
                                                                    <option value="erpnext">ERPNext Implementation</option>
                                                                    <option value="custom">Custom ERP Development</option>
                                                                    <option value="consulting">ERP Consulting</option>
                                                                    <option value="support">Support & Maintenance</option>
                                                                    <option value="other">Other</option>
                                                                </Field>
                                                                <ErrorMessage name="service" component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }} />
                                                            </Col>
                                                            <Col md={6}>
                                                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Country</label>
                                                                <Field as="select" name="country" style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', color: '#374151', outline: 'none', background: '#fff' }}>
                                                                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                                                                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                                                                    <option value="Oman">🇴🇲 Oman</option>
                                                                    <option value="Bahrain">🇧🇭 Bahrain</option>
                                                                    <option value="Kuwait">🇰🇼 Kuwait</option>
                                                                    <option value="Qatar">🇶🇦 Qatar</option>
                                                                    <option value="India">🇮🇳 India</option>
                                                                    <option value="Other">Other</option>
                                                                </Field>
                                                            </Col>
                                                            <Col md={12}>
                                                                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Tell Us About Your Project *</label>
                                                                <Field as="textarea" name="message" rows={4} placeholder="Describe your current ERP challenges, business size, timeline, and any specific requirements..."
                                                                    style={{ width: '100%', padding: '11px 14px', border: `1px solid ${errors.message && touched.message ? '#EF4444' : '#E5E7EB'}`, borderRadius: '8px', fontSize: '14px', color: '#374151', outline: 'none', resize: 'vertical' }}
                                                                />
                                                                <ErrorMessage name="message" component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }} />
                                                            </Col>
                                                            <Col md={12}>
                                                                <button type="submit" disabled={isSubmitting}
                                                                    style={{ background: 'var(--enfono-gradient)', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 36px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', opacity: isSubmitting ? 0.7 : 1, transition: 'opacity 0.2s' }}
                                                                >
                                                                    {isSubmitting ? 'Sending...' : 'Send Message & Book Consultation'}
                                                                </button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        )}
                                    </div>
                                </m.div>
                            </Col>

                            {/* Sidebar Info */}
                            <Col lg={5}>
                                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
                                    {/* Why Contact */}
                                    <div style={{ background: 'var(--enfono-gradient)', borderRadius: '16px', padding: '36px', marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>What to Expect</h3>
                                        {[
                                            { icon: 'fas fa-clock', text: 'Response within 24 hours' },
                                            { icon: 'fas fa-video', text: '60-minute free consultation call' },
                                            { icon: 'fas fa-file-alt', text: 'Custom proposal within 5 days' },
                                            { icon: 'fas fa-check-circle', text: 'No commitment required' },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                                                <div style={{ width: '36px', height: '36px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <i className={item.icon} style={{ color: '#fff', fontSize: '14px' }}></i>
                                                </div>
                                                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Offices */}
                                    {(data.about?.offices || []).map((office, i) => (
                                        <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                <span style={{ fontSize: '28px' }}>{office.flag}</span>
                                                <div>
                                                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{office.country}</div>
                                                    <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>{office.type} · {office.city}</div>
                                                </div>
                                            </div>
                                            {[
                                                { icon: 'fas fa-map-marker-alt', text: office.address },
                                                { icon: 'fas fa-phone', text: office.phone },
                                                { icon: 'fas fa-envelope', text: office.email },
                                            ].map((item, j) => (
                                                <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
                                                    <i className={item.icon} style={{ color: '#10B981', width: '14px' }}></i>
                                                    {item.text}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </m.div>
                            </Col>
                        </Row>

                        {/* FAQs */}
                        <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-16">
                            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1B3A5C', fontFamily: 'Poppins, sans-serif', marginBottom: '32px', textAlign: 'center' }}>Frequently Asked Questions</h2>
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                {faqs.map((faq, i) => (
                                    <div key={i} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '12px', overflow: 'hidden' }}>
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                                        >
                                            <span style={{ fontSize: '15px', fontWeight: '600', color: '#1B3A5C' }}>{faq.q}</span>
                                            <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: '#10B981', fontSize: '12px', flexShrink: 0, marginLeft: '16px' }}></i>
                                        </button>
                                        {openFaq === i && (
                                            <div style={{ padding: '0 24px 20px', fontSize: '14px', lineHeight: '1.75', color: '#6B7280' }}>{faq.a}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </m.div>
                    </LazyMotion>
                </Container>
            </section>

            <EnfonoFooter />
        </div>
    )
}

export default EnfonoContact
