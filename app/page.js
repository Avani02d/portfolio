'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">Avani.dev</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <p className="greeting reveal">Hello, I'm Avani D Poojary</p>
            <h1 className="reveal">
              ML & <span className="gradient">Frontend</span> Developer.
            </h1>
            <p className="reveal">
              Specializing in Machine Learning, AI, and Full-Stack Development. 
              I build intelligent platforms that learn, adapt, and scale to solve real-world challenges.
            </p>
            <div className="hero-buttons reveal">
              <a href="/assets/resume.pdf" target="_blank" className="btn btn-primary">Download Resume</a>
              <a href="#projects" className="btn btn-outline">View Projects</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="avatar-ring">
              <img src="/assets/photo.jpg" alt="Avani D Poojary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-bar">
        <div className="container">
          <div className="stat reveal">
            <div className="stat-number">8.28</div>
            <div className="stat-label">CGPA (B.E. CS)</div>
          </div>
          <div className="stat reveal">
            <div className="stat-number">108%</div>
            <div className="stat-label">Community Growth</div>
          </div>
          <div className="stat reveal">
            <div className="stat-number">80%</div>
            <div className="stat-label">Wait-time Reduction</div>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-label reveal">About Me</div>
          <h2 className="section-title reveal">ML & Frontend Developer</h2>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                I am a Results-driven Computer Science undergraduate specializing in Machine Learning, Artificial Intelligence, and Full-Stack Development. 
                Proven expertise in building adaptive solutions, ranging from RAG-based AI workflows using LangGraph to dynamic web applications with Next.js and TypeScript.
              </p>
              <p>
                Currently an undergraduate at <strong>Sambhram Institute of Technology</strong>, Bangalore (2023 - 2027), I focus on creating intelligent platforms that solve complex real-world challenges.
              </p>
            </div>
            <div className="about-cards">
              <div className="about-card reveal">
                <h4>Machine Learning</h4>
                <p>Expertise in NLP, Large Language Models (LLMs), and RAG Pipelines.</p>
              </div>
              <div className="about-card reveal">
                <h4>Full-Stack</h4>
                <p>Building responsive web apps with Next.js, React, and Supabase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-label reveal">Expertise</div>
          <h2 className="section-title reveal">Technical Toolbox</h2>
          <div className="skills-grid">
            <div className="skill-card reveal">
              <div className="skill-icon">🐍</div>
              <h4>Python</h4>
              <p>Advanced</p>
            </div>
            <div className="skill-card reveal">
              <div className="skill-icon">⚛️</div>
              <h4>Next.js</h4>
              <p>Frontend</p>
            </div>
            <div className="skill-card reveal">
              <div className="skill-icon">🤖</div>
              <h4>TensorFlow</h4>
              <p>Deep Learning</p>
            </div>
            <div className="skill-card reveal">
              <div className="skill-icon">☁️</div>
              <h4>Google Cloud</h4>
              <p>Vertex AI</p>
            </div>
            <div className="skill-card reveal">
              <div className="skill-icon">⛓️</div>
              <h4>LangGraph</h4>
              <p>AI Workflows</p>
            </div>
            <div className="skill-card reveal">
              <div className="skill-icon">💾</div>
              <h4>PostgreSQL</h4>
              <p>Database</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="section">
        <div className="container">
          <div className="section-label reveal">Experience</div>
          <h2 className="section-title reveal">Professional Path</h2>
          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="date">Sep 2025 – Present</div>
              <h3>Technical Team Member</h3>
              <p className="company">OSCode, SAIT Chapter | Bengaluru, IN</p>
              <p>Engineered a QR-based check-in solution, reducing wait times by 80% and streamlining event tracking for 250+ participants.</p>
            </div>
            <div className="timeline-item reveal">
              <div className="date">Jul 2025 – Aug 2025</div>
              <h3>Machine Learning Intern</h3>
              <p className="company">Coincent.ai | Remote</p>
              <p>Developed a bike sharing demand prediction model using Scikit-learn and implemented a Human Action Detection System.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-label reveal">Portfolio</div>
          <h2 className="section-title reveal">Featured Projects</h2>
          <div className="projects-grid">
            {/* Project 1: WealthWise */}
            <div className="project-card reveal">
              <div className="project-thumb">
                <img src="/assets/project-dashboard.png" alt="WealthWise" />
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>Gemini AI</span>
                  <span>Supabase</span>
                </div>
                <h3>WealthWise - AI Finance Manager</h3>
                <p>
                  Full-stack financial platform utilizing Google Gemini AI for automated receipt parsing and intelligent expense tracking.
                </p>
                <div className="project-links">
                  <a href="#">Live Demo</a>
                </div>
              </div>
            </div>

            {/* Project 2: Bike Sharing */}
            <div className="project-card reveal">
              <div className="project-thumb">
                <img src="/assets/project-crg.png" alt="Bike Sharing Prediction" />
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span>Python</span>
                  <span>Scikit-learn</span>
                  <span>ML</span>
                </div>
                <h3>Bike Sharing Demand Prediction</h3>
                <p>
                  Scalable machine learning algorithm to forecast bike rental demand by analyzing complex weather and seasonal features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section className="section">
        <div className="container">
          <div className="section-label reveal">Successes</div>
          <h2 className="section-title reveal">Achievements</h2>
          <div className="about-cards">
            <div className="about-card reveal">
              <h4>National Finalist - VOIS Tech Innovation Marathon 2.0</h4>
              <p>Selected among the top 75 teams nationwide for an exclusive technical mentorship program.</p>
            </div>
            <div className="about-card reveal">
              <h4>Top 5000 - EY Techathon 6.0</h4>
              <p>Ranked in the top tier among 200,000+ national participants in a competitive software engineering hackathon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-label reveal">Contact</div>
          <h2 className="section-title reveal">Get In Touch</h2>
          <div className="contact-wrapper">
            <div className="contact-info reveal">
              <p>I'm always open to discussing new opportunities, intelligent platform designs, or creative frontend challenges.</p>
              <div className="contact-links">
                <div className="contact-link">
                  <span className="link-icon">📧</span>
                  <span>avanidpoojary02@gmail.com</span>
                </div>
                <div className="contact-link">
                  <span className="link-icon">📱</span>
                  <span>+91 8310665113</span>
                </div>
                <div className="contact-link">
                  <span className="link-icon">🔗</span>
                  <span>linkedin.com/in/avani-d-poojary</span>
                </div>
              </div>
            </div>
            <form className="contact-form reveal">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Avani D Poojary. Built with Next.js.</p>
        </div>
      </footer>
    </main>
  );
}
