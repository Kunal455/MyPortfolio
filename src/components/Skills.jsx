import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    { name: 'JavaScript', level: 90, color: '#facc15' },
    { name: 'React', level: 85, color: '#38bdf8' },
    { name: 'Node.js', level: 80, color: '#4ade80' },
    { name: 'HTML/CSS', level: 95, color: '#fb923c' },
    { name: 'MongoDB', level: 75, color: '#10b981' },
    { name: 'TypeScript', level: 70, color: '#60a5fa' },
    { name: 'Express', level: 80, color: '#9ca3af' },
    { name: 'Git', level: 85, color: '#f87171' }
];

const Skills = () => {
    return (
        <section id="skills" className="section container">

            <motion.h2
                className="section-title"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                My <span style={{ color: 'var(--text-primary)' }}>Skills.</span>
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="glass-panel"
                        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Background Glow Effect on Hover */}
                        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle, ${skill.color}20 0%, transparent 60%)`, zIndex: 0, pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</h3>
                            <span style={{ fontSize: '0.9rem', color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
                        </div>

                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', zIndex: 1, overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: false }}
                                transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                                style={{ height: '100%', background: skill.color, borderRadius: '4px' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Skills;
