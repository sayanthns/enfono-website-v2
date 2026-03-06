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
                            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            style={{
                                width: '380px',
                                height: '520px',
                                background: '#fff',
                                borderRadius: '24px',
                                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '20px',
                                border: '1px solid #F1F5F9'
                            }}
                        >
                            {/* Header */}
                            <div style={{ background: 'var(--enfono-gradient)', padding: '24px', color: '#fff', position: 'relative' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-robot" style={{ fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Poppins, sans-serif' }}>Enfono AI</div>
                                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>GCC ERP & AI Expert</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{ position: 'absolute', top: '24px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#F8FAFC' }}>
                                {messages.map((m, i) => (
                                    <div key={i} style={{
                                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                    }}>
                                        <div style={{
                                            background: m.role === 'user' ? '#10B981' : '#fff',
                                            color: m.role === 'user' ? '#fff' : '#334155',
                                            padding: '12px 16px',
                                            borderRadius: m.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            boxShadow: m.role === 'user' ? '0 4px 12px rgba(16, 185, 129, 0.2)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
                                            border: m.role === 'user' ? 'none' : '1px solid #F1F5F9'
                                        }}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '12px 16px', borderRadius: '16px 16px 16px 2px', border: '1px solid #F1F5F9' }}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                                            <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                                            <m.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer / Input */}
                            <div style={{ padding: '20px', background: '#fff', borderTop: '1px solid #F1F5F9' }}>
                                {messages.length === 1 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                        {suggestions.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setInput(s); setTimeout(() => handleSend(), 100) }}
                                                style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', color: '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        style={{ flex: 1, border: '1px solid #F1F5F9', background: '#F8FAFC', borderRadius: '12px', padding: '10px 16px', fontSize: '14px', outline: 'none' }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isTyping}
                                        style={{ width: '42px', height: '42px', background: 'var(--enfono-gradient)', border: 'none', borderRadius: '12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!input.trim() || isTyping) ? 0.5 : 1 }}
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
                        background: 'var(--enfono-gradient)',
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
