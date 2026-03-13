import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally handle form submission here
        alert("Message sent successfully (Demo)");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section container">

            <motion.h2
                className="section-title"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
            >
                Get in <span style={{ color: 'var(--text-primary)' }}>Touch.</span>
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Let's talk about your project</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Have a project in mind or just want to say hi? Feel free to reach out. I'm currently available for freelance projects and full-time opportunities.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent-primary)' }}>
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</h4>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>hello@kunal.dev</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent-primary)' }}>
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Phone</h4>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--accent-primary)' }}>
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Location</h4>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>San Francisco, CA</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '1.5rem' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="name" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Your Name</label>
                            <input
                                type="text" id="name" name="name" required
                                value={formData.name} onChange={handleChange}
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="email" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Your Email</label>
                            <input
                                type="email" id="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="message" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Your Message</label>
                            <textarea
                                id="message" name="message" rows="5" required
                                value={formData.message} onChange={handleChange}
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>

                        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', width: '100%' }}>
                            Send Message <Send size={18} />
                        </button>

                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
