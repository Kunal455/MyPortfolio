import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const achievements = [
    {
        year: '2023 - Present',
        title: 'Senior Frontend Developer',
        subtitle: 'Tech Innovators Inc.',
        description: 'Lead a team of 4 developers to rebuild the core SaaS platform, resulting in a 40% increase in performance.',
        icon: <Briefcase />
    },
    {
        year: '2022',
        title: 'Awarded Best UI/UX Design',
        subtitle: 'Global Hackathon',
        description: 'Won 1st place among 500+ participants for creating an accessible and beautifully animated medical dashboard.',
        icon: <Award />
    },
    {
        year: '2021',
        title: 'B.S. in Computer Science',
        subtitle: 'State University',
        description: 'Graduated with Honors. Specialized in Web Technologies and Human-Computer Interaction.',
        icon: <GraduationCap />
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="section container">

            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
            >
                My <span style={{ color: 'var(--text-primary)' }}>Journey.</span>
            </motion.h2>

            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>

                {/* Timeline Line */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '2rem', width: '2px', background: 'var(--bg-tertiary)', zIndex: 0 }} className="timeline-line"></div>

                {achievements.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}
                    >
                        {/* Timeline Icon */}
                        <div style={{
                            width: '4rem', height: '4rem', borderRadius: '50%', background: 'var(--accent-gradient)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', flexShrink: 0,
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                        }}>
                            {item.icon}
                        </div>

                        {/* Content Card */}
                        <div className="glass-panel" style={{ flexGrow: 1, padding: '2rem', borderRadius: '1rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '-1rem', right: '1rem', background: 'var(--bg-tertiary)', padding: '0.4rem 1rem', borderRadius: '1rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                {item.year}
                            </span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 500 }}>{item.subtitle}</h4>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.description}</p>
                        </div>
                    </motion.div>
                ))}

                <style>{`
          @media (max-width: 600px) {
            .timeline-line { left: 1.5rem !important; }
          }
        `}</style>
            </div>

        </section>
    );
};

export default Achievements;
