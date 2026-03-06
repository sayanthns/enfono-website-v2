import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { initialCmsData } from '../../Data/cms_data';

const EnfonoChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m the Enfono AI Assistant. How can I help you with ERP, AI in business, or anything about Enfono today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const apiKey = localStorage.getItem('enfono_chatbot_api_key');
        const apiProvider = localStorage.getItem('enfono_chatbot_provider') || 'openai'; // openai or claude

        if (!apiKey) {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Chatbot API key not configured. Please set it in the Admin Panel to enable AI responses.' }]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        try {
            const systemPrompt = `You are the Enfono AI Assistant. You are an expert in ERP (specifically ERPNext), AI for business optimization, and Enfono's history/services.
            Use the following context to answer questions about Enfono:
            - Who We Are: ${initialCmsData.about.who_we_are.subtext}
            - Services: ${initialCmsData.services_hero.subtext}
            - Products/Brands: ${initialCmsData.brands.map(b => b.name + ": " + b.desc).join(', ')}
            - Offices: ${initialCmsData.about.offices.map(o => o.country + " (" + o.city + ")").join(', ')}
            - Our Journey: ${initialCmsData.about.journey.map(j => j.year + ": " + j.title).join(', ')}
            - Notable Projects: ${initialCmsData.our_work.slice(0, 5).map(w => w.title).join(', ')}
            
            Guidelines:
            - Be professional, helpful, and concise.
            - Focus on ERPNext and AI in Business.
            - If you don't know the answer based on the context, politely suggest contacting Enfono via the contact page.
            - Maintain a helpful partner tone.`;

            let response;
            if (apiProvider === 'openai') {
                response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            ...messages.map(m => ({ role: m.role, content: m.content })),
                            userMessage
                        ],
                        temperature: 0.7
                    })
                });
            } else if (apiProvider === 'claude') {
                response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01'
                    },
                    body: JSON.stringify({
                        model: 'claude-3-5-sonnet-20240620',
                        max_tokens: 1024,
                        system: systemPrompt,
                        messages: [
                            ...messages.map(m => ({ role: m.role, content: m.content })),
                            userMessage
                        ]
                    })
                });
            }

            const data = await response.json();
            const aiContent = apiProvider === 'openai'
                ? data.choices[0].message.content
                : data.content[0].text;

            setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
        } catch (error) {
            console.error('Chatbot Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error processing your request. Please check your API configuration or try again later.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "Tell me about ERPNext",
        "How can AI help my business?",
        "Tell me about Enfono",
        "What services do you offer?"
    ];

    return (
        <LazyMotion features={domAnimation}>
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, fontFamily: 'Inter, sans-serif' }}>
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="enfono-chat-mockup"
                            style={{
                                width: '400px',
                                height: '580px',
                                marginBottom: '20px',
                                maxWidth: 'calc(100vw - 60px)',
                                maxHeight: 'calc(100vh - 120px)'
                            }}
                        >
                            {/* Header */}
                            <div className="ecm-header">
                                <div className="ecm-header-left">
                                    <div className="ecm-avatar">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                    <div>
                                        <div className="ecm-title">Enfono AI Assistant</div>
                                        <div className="ecm-status">
                                            <span className="dot"></span>
                                            Connected to ERPNext
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="ecm-menu"
                                    style={{ background: 'none', border: 'none', fontSize: '18px' }}
                                    aria-label="Close Chat"
                                >
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                            </div>

                            {/* Body / Messages */}
                            <div className="ecm-body" style={{ flex: 1 }}>
                                {messages.map((m, i) => (
                                    <div key={i} className={`ecm-message ${m.role === 'user' ? 'user' : 'ai'}`}>
                                        {m.role === 'assistant' && (
                                            <div className="ecm-avatar-small">
                                                <i className="fas fa-robot"></i>
                                            </div>
                                        )}
                                        <div className="ecm-bubble">
                                            {m.content}
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

                                {messages.length === 1 && (
                                    <div className="ecm-actions" style={{ flexWrap: 'wrap' }}>
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
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer / Input */}
                            <div className="ecm-footer">
                                <form onSubmit={handleSend} className="ecm-input-box">
                                    <i className="fas fa-chart-line ecm-input-icon" />
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Ask Enfono AI about your business..."
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
                                        disabled={!input.trim() || isTyping}
                                        className="ecm-send-btn"
                                        style={{ opacity: (!input.trim() || isTyping) ? 0.5 : 1 }}
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <m.button
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
                    <i className={isOpen ? "fas fa-times" : "fas fa-comment-dots"}></i>
                </m.button>
            </div>
        </LazyMotion>
    );
};

export default EnfonoChatbot;
