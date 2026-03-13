import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';

const Home = () => {
    return (
        <section id="home" className="section" style={{ position: 'relative', overflow: 'hidden', paddingTop: '8rem' }}>

            {/* Background Animated Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px',
                    background: 'var(--accent-primary)', filter: 'blur(150px)', borderRadius: '50%', zIndex: -1
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{
                    position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px',
                    background: 'var(--accent-secondary)', filter: 'blur(150px)', borderRadius: '50%', zIndex: -1
                }}
            />

            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem', borderRadius: '2rem',
                        background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)',
                        fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        👋 Welcome to my portfolio
                    </span>
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                        Hi, I'm <br />
                        <span style={{
                            background: 'var(--accent-gradient)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Kunal</span>
                    </h1>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        Full Stack Developer
                    </h2>
                </motion.div>

                <motion.p
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}
                >
                    I build exceptional and accessible digital experiences for the web.
                    Focused on crafting clean, user-friendly, and performant applications.
                </motion.p>

                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <a href="#projects" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        View My Work <ArrowRight size={18} />
                    </a>
                    <a href="/resume.pdf" target="_blank" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Download CV <Download size={18} />
                    </a>
                </motion.div>

                <motion.div
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{ display: 'flex', gap: '1.5rem', marginTop: '4rem' }}
                >
                    {[Github, Linkedin, Twitter].map((Icon, idx) => (
                        <motion.a
                            key={idx}
                            href="#" target="_blank"
                            whileHover={{ y: -5, color: 'var(--accent-primary)' }}
                            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}
                        >
                            <Icon size={24} />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
