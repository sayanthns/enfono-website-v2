import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { initialCmsData } from '../../Data/cms_data';

const EnfonoChatbot = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am the Enfono AI Assistant. How can I help you today? Whether you are looking for ERPNext implementation, ZATCA compliance, or AI solutions, I am here to guide you.' }
    ]);
    const [userInput, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:8007' : '/api';
    const [leadStep, setLeadStep] = useState(null); // 'name', 'email', 'company', 'message', 'complete'
    const [leadData, setLeadData] = useState({});

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (isAdminPage) return null;

    const formatMessage = (text) => {
        if (!text) return text;

        return text.split('\n').map((line, i) => {
            let processedLine = line.trim();
            if (!processedLine) return <div key={i} style={{ height: '12px' }} />;

            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = processedLine.split(boldRegex);

            const content = parts.map((part, index) => {
                if (index % 2 === 1) return <strong key={index} style={{ color: '#fff', fontWeight: 700 }}>{part}</strong>;
                return part;
            });

            return (
                <div key={i} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                    {content}
                </div>
            );
        });
    };

    const handleLeadCapture = async (inputVal) => {
        const currentStep = leadStep;
        let nextStep = null;
        let newData = { ...leadData };

        if (!inputVal.trim()) return;

        if (currentStep === 'name') {
            newData.name = inputVal;
            nextStep = 'email';
            setMessages(prev => [...prev, { role: 'user', content: inputVal }, { role: 'assistant', content: 'Got it. What is your business email address?' }]);
        } else if (currentStep === 'email') {
            newData.email = inputVal;
            nextStep = 'company';
            setMessages(prev => [...prev, { role: 'user', content: inputVal }, { role: 'assistant', content: 'And which company are you representing?' }]);
        } else if (currentStep === 'company') {
            newData.company = inputVal;
            nextStep = 'message';
            setMessages(prev => [...prev, { role: 'user', content: inputVal }, { role: 'assistant', content: 'Finally, tell me a bit about your requirements or what you\'d like to discuss in the consultation.' }]);
        } else if (currentStep === 'message') {
            newData.message = inputVal;
            nextStep = 'complete';

            const collectedData = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                name: newData.name,
                email: newData.email,
                company: newData.company,
                service: 'AI Chatbot Consultation',
                phone: 'N/A',
                message: inputVal
            };

            setMessages(prev => [...prev, { role: 'user', content: inputVal }]);
            setIsTyping(true);

            try {
                await fetch(`${API_URL}/api/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'chatbot_lead',
                        ...collectedData,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (err) { console.error("Lead sync error:", err); }

            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you! I have recorded your request for a free consultation. Our team will reach out to you within 24 hours.' }]);
            setInput('');
            setLeadStep(null);
            return;
        }

        setLeadData(newData);
        setLeadStep(nextStep);
        setInput('');
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        const userInputTrimmed = userInput.trim();
        if (!userInputTrimmed || isTyping) return;

        if (leadStep) {
            handleLeadCapture(userInputTrimmed);
            return;
        }

        const bookingKeywords = ['book', 'consultation', 'meeting', 'free consultation', 'talk to sales', 'demo'];
        if (bookingKeywords.some(k => userInputTrimmed.toLowerCase().includes(k)) && !leadStep) {
            setLeadStep('name');
            setMessages(prev => [...prev, { role: 'user', content: userInputTrimmed }, { role: 'assistant', content: 'I can certainly help you book a free consultation! Let\'s start with your full name.' }]);
            setInput('');
            return;
        }

        const userMessage = { role: 'user', content: userInputTrimmed };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const systemPrompt = `You are the Enfono AI Assistant. You are an expert in ERP (specifically ERPNext), AI for business optimization, and Enfono's history/services.
            Use the following context to answer questions about Enfono:
            - Who We Are: ${initialCmsData.about.who_we_are.subtext}
            - Our Team: ${initialCmsData.about.team.map(m => `${m.name} (${m.role})`).join(', ')}
            - Services: ${initialCmsData.services_hero.subtext}
            - Products/Brands: ${initialCmsData.brands.map(b => b.name + ": " + b.desc).join(', ')}
            - Offices: ${initialCmsData.about.offices.map(o => o.country + " (" + o.city + ")").join(', ')}
            - Our Journey: ${initialCmsData.about.journey.map(j => j.year + ": " + j.title).join(', ')}
            - Notable Projects: ${initialCmsData.our_work.slice(0, 5).map(w => w.title).join(', ')}
            ${initialCmsData.chatbot?.training_data ? `\n\nAdditional Knowledge (use this as a priority source):\n${initialCmsData.chatbot?.training_data}` : ''}
            
            Guidelines:
            - Be professional, helpful, and concise.
            - Focus on ERPNext and AI in Business.
            - Use numbered lists or bullet points (e.g., "1. Item", "2. Item") for long explanations.
            - If the user wants to book a consultation, demo, or meeting, tell them you can help them right here.
            - If you don't know the answer, suggest contacting Enfono.`;

            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        userMessage
                    ],
                    provider: 'openai'
                })
            });

            if (!res.ok) throw new Error("Server error");
            const data = await res.json();
            const aiMessage = data.choices[0].message;
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'I am sorry, I am having trouble connecting to the AI service right now. Please try again later or contact us directly.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "Tell me about ERPNext",
        "Book a Free Consultation",
        "What services do you offer?",
        "Tell me about Enfono"
    ];

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, fontFamily: 'Inter, sans-serif' }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="enfono-chat-mockup"
                        style={{
                            width: '400px',
                            height: '580px',
                            marginBottom: '20px',
                            maxWidth: 'calc(100vw - 60px)',
                            maxHeight: 'calc(100vh - 120px)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Header */}
                        <div className="ecm-header" style={{ padding: '14px 20px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="ecm-header-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="ecm-avatar" style={{ width: '36px', height: '36px', fontSize: '16px' }}>
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div>
                                    <div className="ecm-title" style={{ fontSize: '14px' }}>Enfono AI Assistant</div>
                                    <div className="ecm-status" style={{ fontSize: '11px' }}>
                                        <span className="dot"></span>
                                        Connected to ERPNext
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Body / Messages */}
                        <div className="ecm-body" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                            {messages.map((m, i) => (
                                <div key={i} className={`ecm-message ${m.role === 'user' ? 'user' : 'ai'}`}>
                                    {m.role === 'assistant' && (
                                        <div className="ecm-avatar-small">
                                            <i className="fas fa-robot"></i>
                                        </div>
                                    )}
                                    <div className="ecm-bubble" style={{ whiteSpace: 'pre-wrap' }}>
                                        {m.role === 'assistant' ? formatMessage(m.content) : m.content}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="ecm-message ai thinking">
                                    <div className="ecm-avatar-small">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                    <div className="ecm-bubble">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}

                            {messages.length === 1 && !leadStep && (
                                <div className="ecm-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setInput(s); setTimeout(() => handleSend(), 100) }}
                                            className="ecm-action-btn"
                                            style={{ fontSize: '12px', padding: '8px 12px' }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Footer / Input */}
                        <div className="ecm-footer" style={{ padding: '15px' }}>
                            <form onSubmit={handleSend} className="ecm-input-box" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 15px' }}>
                                <i className={leadStep ? "fas fa-user-edit ecm-input-icon" : "fas fa-chart-line ecm-input-icon"} style={{ color: 'rgba(255,255,255,0.3)' }} />
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder={leadStep ? "Your answer..." : "Ask Enfono AI about your business..."}
                                    style={{
                                        flex: 1,
                                        background: 'none',
                                        border: 'none',
                                        color: '#fff',
                                        outline: 'none',
                                        fontSize: '14px',
                                        padding: '0'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!userInput.trim() || isTyping}
                                    className="ecm-send-btn"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#10B981',
                                        cursor: 'pointer',
                                        opacity: (!userInput.trim() || isTyping) ? 0.5 : 1
                                    }}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    borderRadius: '20px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <i className={isOpen ? "fas fa-times" : "fas fa-robot"}></i>
            </motion.button>
        </div>
    );
};

export default EnfonoChatbot;
