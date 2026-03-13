import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <span style={{ color: 'var(--text-primary)' }}>About </span>
                Me.
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                {/* Abstract shape image placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-panel"
                    style={{
                        position: 'relative', width: '100%', height: '400px',
                        borderRadius: '2rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        background: 'linear-gradient(45deg, var(--bg-tertiary), var(--bg-secondary))'
                    }}
                >
                    {/* Decorative Elements inside the square */}
                    <motion.div
                        animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                        style={{ position: 'absolute', width: '300px', height: '300px', background: 'var(--accent-gradient)', borderRadius: '40%', opacity: 0.2, filter: 'blur(40px)' }}
                    />
                    <span style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--text-secondary)', zIndex: 10 }}>{'< / >'}</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        Who am I?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        My passion is creating digital experiences that are both visually staggering and powerfully functional.
                        I bridge the gap between design and development.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        I enjoy transforming complex problems into elegant, intuitive, and highly performant interfaces
                        that deliver an exceptional user experience on every platform.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', fontWeight: 800 }}>3+</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Years Exp.</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)', fontWeight: 800 }}>20+</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Projects</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
