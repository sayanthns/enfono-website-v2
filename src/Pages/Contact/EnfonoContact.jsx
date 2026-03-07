import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import EnfonoHeader from '../../Components/EnfonoUI/EnfonoHeader'
import EnfonoFooter from '../../Components/EnfonoUI/EnfonoFooter'
import GlobalContext from '../../Context/Context'
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
    const { cmsData } = useContext(GlobalContext);
    const data = cmsData || initialCmsData;
    const [submitted, setSubmitted] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:8007' : '';

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

            <section style={{ background: '#F8FAFC', padding: '100px 0' }}>
                <Container>
                    <div className="e-contact-content-wrapper">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            style={{
                                background: '#fff',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                boxShadow: '0 40px 100px -20px rgba(15, 23, 42, 0.08)',
                                border: '1px solid rgba(226, 232, 240, 0.8)'
                            }}
                        >
                            <Row className="g-0">
                                {/* Form Column */}
                                <Col lg={7} className="p-5 p-md-5">
                                    <div style={{ padding: '20px' }}>
                                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', fontFamily: 'Poppins, sans-serif', marginBottom: '12px', letterSpacing: '-0.5px' }}>Book a Free Consultation</h2>
                                        <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '40px', lineHeight: '1.6' }}>Fill out the form and our team of ERP experts will get back to you within 24 hours.</p>

                                        {submitted ? (
                                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px 20px' }}>
                                                <div style={{ width: '80px', height: '80px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                                    <i className="fas fa-check" style={{ fontSize: '32px', color: '#10B981' }}></i>
                                                </div>
                                                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>Message Received!</h3>
                                                <p style={{ fontSize: '16px', color: '#64748B' }}>Thank you for reaching out. Our team will contact you shortly.</p>
                                            </motion.div>
                                        ) : (
                                            <Formik
                                                initialValues={{ name: '', email: '', phone: '', company: '', service: '', country: 'Saudi Arabia', message: '' }}
                                                validationSchema={contactSchema}
                                                onSubmit={async (values, { setSubmitting }) => {
                                                    try {
                                                        await fetch(`${API_URL}/api/leads`, {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({
                                                                ...values,
                                                                type: 'contact_form_lead',
                                                                id: Date.now(),
                                                                date: new Date().toLocaleString(),
                                                                status: 'New'
                                                            })
                                                        });
                                                        setSubmitted(true);
                                                    } catch (err) {
                                                        console.error("Lead submission error:", err);
                                                        alert("Error sending message. Please try again.");
                                                    } finally {
                                                        setSubmitting(false);
                                                    }
                                                }}
                                            >
                                                {({ isSubmitting, errors, touched }) => (
                                                    <Form>
                                                        <Row className="g-4">
                                                            {[
                                                                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Sayanth NS', half: true },
                                                                { name: 'email', label: 'Work Email', type: 'email', placeholder: 'name@company.com', half: true },
                                                                { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+966 XX XXX XXXX', half: true },
                                                                { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Enfono Tech', half: true },
                                                            ].map((field) => (
                                                                <Col key={field.name} md={field.half ? 6 : 12}>
                                                                    <label style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'block' }}>{field.label}</label>
                                                                    <Field name={field.name} type={field.type} placeholder={field.placeholder}
                                                                        className="enfono-input"
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: '14px 18px',
                                                                            border: `2px solid ${errors[field.name] && touched[field.name] ? '#EF4444' : '#F1F5F9'}`,
                                                                            borderRadius: '12px',
                                                                            fontSize: '15px',
                                                                            color: '#0F172A',
                                                                            background: '#F8FAFC',
                                                                            outline: 'none',
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    />
                                                                    <ErrorMessage name={field.name} component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px', fontWeight: '600' }} />
                                                                </Col>
                                                            ))}
                                                            <Col md={6}>
                                                                <label style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'block' }}>Interested In</label>
                                                                <Field as="select" name="service" className="enfono-input" style={{ width: '100%', padding: '14px 18px', border: `2px solid ${errors.service && touched.service ? '#EF4444' : '#F1F5F9'}`, borderRadius: '12px', fontSize: '15px', color: '#0F172A', background: '#F8FAFC', outline: 'none' }}>
                                                                    <option value="">Select a service</option>
                                                                    <option value="ERPNext">ERPNext Implementation</option>
                                                                    <option value="Custom">Custom ERP Development</option>
                                                                    <option value="Consulting">ERP Consulting</option>
                                                                    <option value="Support">Support & Maintenance</option>
                                                                </Field>
                                                                <ErrorMessage name="service" component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px', fontWeight: '600' }} />
                                                            </Col>
                                                            <Col md={6}>
                                                                <label style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'block' }}>Region</label>
                                                                <Field as="select" name="country" className="enfono-input" style={{ width: '100%', padding: '14px 18px', border: '2px solid #F1F5F9', borderRadius: '12px', fontSize: '15px', color: '#0F172A', background: '#F8FAFC', outline: 'none' }}>
                                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                                    <option value="UAE">United Arab Emirates</option>
                                                                    <option value="Oman">Oman</option>
                                                                    <option value="India">India</option>
                                                                </Field>
                                                            </Col>
                                                            <Col md={12}>
                                                                <label style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px', display: 'block' }}>Project Details</label>
                                                                <Field as="textarea" name="message" rows={4} placeholder="Tell us about your current challenges..."
                                                                    className="enfono-input"
                                                                    style={{ width: '100%', padding: '14px 18px', border: `2px solid ${errors.message && touched.message ? '#EF4444' : '#F1F5F9'}`, borderRadius: '12px', fontSize: '15px', color: '#0F172A', background: '#F8FAFC', outline: 'none', resize: 'none' }}
                                                                />
                                                                <ErrorMessage name="message" component="div" style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px', fontWeight: '600' }} />
                                                            </Col>
                                                            <Col md={12} className="pt-2">
                                                                <button type="submit" disabled={isSubmitting} className="w-100"
                                                                    style={{ background: 'var(--enfono-gradient)', color: '#fff', border: 'none', borderRadius: '14px', padding: '18px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)', transition: 'all 0.3s ease' }}
                                                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                                                >
                                                                    {isSubmitting ? 'Processing...' : 'Send Message & Book Consultation'}
                                                                </button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        )}
                                    </div>
                                </Col>

                                {/* Sidebar Column */}
                                <Col lg={5} style={{ background: '#0F172A', padding: '60px 50px' }}>
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div className="mb-5">
                                            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '24px' }}>What to Expect</h3>
                                            {[
                                                { icon: 'fas fa-clock', text: 'Response within 24 hours', color: '#10B981' },
                                                { icon: 'fas fa-video', text: '60-minute free diagnostic call', color: '#34D399' },
                                                { icon: 'fas fa-file-invoice-dollar', text: 'Custom roadmap & proposal', color: '#6EE7B7' },
                                                { icon: 'fas fa-shield-alt', text: 'Zero commitment required', color: '#A7F3D0' },
                                            ].map((item, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '20px' }}>
                                                    <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.1)', border: `1px solid rgba(16, 185, 129, 0.2)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <i className={item.icon} style={{ color: item.color, fontSize: '16px' }}></i>
                                                    </div>
                                                    <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>{item.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: 'auto' }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', fontFamily: 'Poppins, sans-serif', marginBottom: '24px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Global Presence</h3>
                                            {(data.about?.offices || []).map((office, i) => (
                                                <div key={i} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: i === (data.about?.offices || []).length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                        <span style={{ fontSize: '24px' }}>{office.flag}</span>
                                                        <div>
                                                            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{office.country}</div>
                                                            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '800', textTransform: 'uppercase' }}>{office.type} · {office.city}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                                                            <i className="fas fa-map-marker-alt" style={{ color: '#10B981', marginTop: '3px' }}></i>
                                                            {office.address}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                                                            <i className="fas fa-phone" style={{ color: '#10B981' }}></i>
                                                            {office.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </motion.div>

                        {/* FAQ Section */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="mt-20"
                        >
                            <div className="text-center mb-5">
                                <span className="enfono-section-label">Support</span>
                                <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>Frequently Asked Questions</h2>
                            </div>
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                {faqs.map((faq, i) => (
                                    <div key={i} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '16px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            style={{ width: '100%', background: 'none', border: 'none', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                                        >
                                            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{faq.q}</span>
                                            <div style={{ width: '32px', height: '32px', background: openFaq === i ? '#ECFDF5' : '#F8FAFC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                                <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: openFaq === i ? '#10B981' : '#CBD5E1', fontSize: '12px' }}></i>
                                            </div>
                                        </button>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} style={{ overflow: 'hidden' }}>
                                                <div style={{ padding: '0 24px 24px', fontSize: '15px', lineHeight: '1.8', color: '#64748B' }}>{faq.a}</div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            <EnfonoFooter />
        </div>
    )
}

export default EnfonoContact
