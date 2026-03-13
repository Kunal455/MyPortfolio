import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-featured MERN stack e-commerce app with Redux state management and Stripe payments.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: '#',
        live: '#',
        image: '/ecommerce.png'
    },
    {
        title: 'Task Management System',
        description: 'Real-time collaborative task manager using Socket.io and beautifully animated drag-and-drop UI.',
        tech: ['Next.js', 'Socket.io', 'Tailwind', 'PostgreSQL'],
        github: '#',
        live: '#',
        image: '/chats.png'
    },
    {
        title: 'AI Image Generator',
        description: 'Web wrapper for OpenAI DALL-E 3 API, featuring a stunning glassmorphic UI and image history saving.',
        tech: ['React', 'OpenAI API', 'Express', 'Framer Motion'],
        github: '#',
        live: '#',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="section container">

            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
            >
                Featured <span style={{ color: 'var(--text-primary)' }}>Projects.</span>
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ y: -15 }}
                        className="glass-panel"
                        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '1.5rem', transition: 'all 0.3s ease' }}
                    >
                        {/* Image Container */}
                        <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `url(${project.image}) center/cover`, transition: 'transform 0.5s ease' }} className="project-img" />
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--accent-gradient)', opacity: 0.6, mixBlendMode: 'overlay' }} />
                        </div>

                        {/* Content Container */}
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                {project.tech.map(t => (
                                    <span key={t} style={{ fontSize: '0.8rem', padding: '0.2rem 0.8rem', background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', borderRadius: '1rem', fontWeight: 600 }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href={project.live} target="_blank" className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem' }}>
                                    Live Demo <ExternalLink size={18} />
                                </a>
                                <a href={project.github} target="_blank" className="btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.6rem' }}>
                                    <Github size={18} />
                                </a>
                            </div>
                        </div>

                        <style>{`.project-img:hover { transform: scale(1.1); }`}</style>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
