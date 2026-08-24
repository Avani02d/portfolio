'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

function Counter({ from = 0, to, duration = 2, decimals = 0, suffix = "" }: { from?: number, to: number, duration?: number, decimals?: number, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(from.toFixed(decimals) + suffix);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = from + easeProgress * (to - from);
        setDisplayValue(current.toFixed(decimals) + suffix);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration, decimals, suffix]);

  return <span ref={ref}>{displayValue}</span>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0b0c10] text-[#c5c6c7] font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* --- AMBIENT ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.025]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient Animated Orb 1 - Top Left */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#9b8af4]/20 via-[#7e97f6]/15 to-transparent blur-[120px]"
        />

        {/* Ambient Animated Orb 2 - Top Right */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#60b3f7]/20 via-[#9b8af4]/10 to-transparent blur-[130px]"
        />

        {/* Ambient Animated Orb 3 - Center / Projects */}
        <motion.div
          animate={{
            y: [-40, 40, -40],
            scale: [0.95, 1.1, 0.95],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[45%] left-[-15%] w-[650px] h-[650px] rounded-full bg-gradient-to-r from-[#9b8af4]/15 via-[#60b3f7]/10 to-transparent blur-[140px]"
        />

        {/* Ambient Animated Orb 4 - Bottom / Contact */}
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#60b3f7]/15 via-[#9b8af4]/15 to-transparent blur-[140px]"
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0b0c10]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7]">
            Avani.dev
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="scroll-mt-24 pt-44 pb-20 max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16 w-full"
        >
          {/* Left Text */}
          <div className="w-full md:w-[58%] flex flex-col items-start text-left">
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-400 mb-3">
              Hello, I&apos;m Avani D Poojary
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-tight mb-6 text-white text-left"
            >
              ML &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7]">Frontend</span>
              <br />
              Developer.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#cccccc] leading-[1.7] mb-8 max-w-[800px] text-left">
              Specializing in Machine Learning, AI, and Frontend Development. I build intelligent platforms that learn, adapt, and scale to solve real-world challenges.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <a
                href="/assets/Avani_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-semibold text-[#0b0c10] bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] hover:opacity-90 transition-opacity"
              >
                Download Resume
              </a>
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/10 hover:bg-white/5 transition-colors bg-[#111216]"
              >
                View Projects
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Avani02d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[46px] h-[46px] flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all hover:scale-105 bg-[#111216] text-gray-400 hover:text-white"
                  title="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a
                  href="https://linkedin.com/in/avani-poojary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[46px] h-[46px] flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 hover:border-[#60b3f7]/50 transition-all hover:scale-105 bg-[#111216] text-gray-400 hover:text-[#60b3f7]"
                  title="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div variants={fadeUp} className="w-full md:w-[40%] flex justify-center items-center">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full p-[5px] bg-gradient-to-tr from-[#9b8af4] via-[#7e97f6] to-[#60b3f7] shadow-[0_0_40px_rgba(155,138,244,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d0d] relative">
                <Image
                  src="/assets/photo.jpg"
                  alt="Avani D Poojary"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="border-y border-white/5 bg-[#0e0f14] py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="max-w-[1200px] mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center text-center gap-2">
            <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] text-center">
              <Counter to={8.38} decimals={2} />
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wider text-center">CGPA (B.E. CS)</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center text-center gap-2">
            <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] text-center">
              <Counter to={108} suffix="%" />
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wider text-center">Community Growth</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center text-center gap-2">
            <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] text-center">
              <Counter to={80} suffix="%" />
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wider text-center">Wait-time Reduction</span>
          </motion.div>
        </motion.div>
      </section>

      {/* --- ABOUT ME --- */}
      <section id="about" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">About Me</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight text-left"
        >
          ML &amp; Frontend Developer
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="flex-1 flex flex-col gap-6 text-[#cccccc] leading-[1.7] text-base max-w-[800px] text-left"
          >
            <p>
              I am a Results-driven Computer Science undergraduate specializing in Machine Learning, Artificial Intelligence, and Frontend Development. Proven expertise in building adaptive solutions, ranging from RAG-based AI workflows using LangGraph to dynamic web applications with Next.js and TypeScript.
            </p>
            <p>
              Currently an undergraduate at <strong className="text-white font-semibold">Sambhram Institute of Technology</strong>, Bangalore (2023 - 2027), I focus on creating intelligent platforms that solve complex real-world challenges.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="w-full lg:w-[420px] flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="bg-[#15161b] rounded-2xl p-6 border border-white/5 transition-all hover:border-[#9b8af4]/40">
              <h3 className="text-white font-bold text-lg mb-2 text-left">Machine Learning</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-left">Expertise in NLP, Large Language Models (LLMs), and RAG Pipelines.</p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="bg-[#15161b] rounded-2xl p-6 border border-white/5 transition-all hover:border-[#60b3f7]/40">
              <h3 className="text-white font-bold text-lg mb-2 text-left">Frontend Developer</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-left">Building responsive web apps with Next.js, React, and Supabase.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- EXPERTISE --- */}
      <section id="skills" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Expertise</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight text-left"
        >
          Technical Toolbox
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              category: 'Languages',
              icon: '💻',
              accent: '#9b8af4',
              skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'SQL', 'HTML5', 'CSS3'],
            },
            {
              category: 'Frameworks & Libraries',
              icon: '⚡',
              accent: '#60b3f7',
              skills: ['React.js', 'Next.js', 'Node.js', 'TensorFlow', 'Keras', 'LangGraph', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
            },
            {
              category: 'Cloud & Databases',
              icon: '☁️',
              accent: '#9b8af4',
              skills: ['Google Cloud (Vertex AI)', 'MongoDB', 'Supabase', 'PostgreSQL'],
            },
            {
              category: 'Developer Tools',
              icon: '🛠️',
              accent: '#60b3f7',
              skills: ['Git', 'GitHub', 'REST APIs', 'Vercel', 'Postman', 'Spring Boot'],
            },
            {
              category: 'Generative AI',
              icon: '✨',
              accent: '#9b8af4',
              skills: ['Gemini API'],
            },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-[#15161b] rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-white/15 transition-all flex flex-col gap-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/5">{cat.icon}</span>
                <h3 className="text-white font-bold text-lg">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-[#0b0c10] border border-white/10 text-gray-300 hover:text-white hover:border-[#9b8af4]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Projects</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="bg-[#15161b] rounded-2xl p-8 border border-white/5 transition-all hover:border-[#9b8af4]/40 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-xl text-left group-hover:text-[#9b8af4] transition-colors">Bike Sharing Demand Prediction</h3>
                <a
                  href="https://github.com/Avani02d/Bike_Sharing_-Demand-Prediction-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                  title="View on GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 text-left">
                Machine learning model designed to forecast hourly and daily bike rental demand based on weather, environmental parameters, and historical usage patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              <span className="text-xs font-medium text-[#9b8af4] bg-[#111216] border border-[#9b8af4]/30 px-3 py-1 rounded-full">Python</span>
              <span className="text-xs font-medium text-[#60b3f7] bg-[#111216] border border-[#60b3f7]/30 px-3 py-1 rounded-full">Scikit-learn</span>
              <span className="text-xs font-medium text-gray-300 bg-[#111216] border border-white/10 px-3 py-1 rounded-full">Pandas</span>
              <span className="text-xs font-medium text-gray-300 bg-[#111216] border border-white/10 px-3 py-1 rounded-full">Regression</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="bg-[#15161b] rounded-2xl p-8 border border-white/5 transition-all hover:border-[#60b3f7]/40 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-xl text-left group-hover:text-[#60b3f7] transition-colors">Human Action Detection</h3>
                <a
                  href="https://github.com/Avani02d/HumanActionDetection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                  title="View on GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 text-left">
                Intelligent computer vision system capable of identifying and classifying specific human behaviors in real-time video streams with high precision.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              <span className="text-xs font-medium text-[#9b8af4] bg-[#111216] border border-[#9b8af4]/30 px-3 py-1 rounded-full">OpenCV</span>
              <span className="text-xs font-medium text-[#60b3f7] bg-[#111216] border border-[#60b3f7]/30 px-3 py-1 rounded-full">TensorFlow</span>
              <span className="text-xs font-medium text-gray-300 bg-[#111216] border border-white/10 px-3 py-1 rounded-full">Deep Learning</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="bg-[#15161b] rounded-2xl p-8 border border-white/5 transition-all hover:border-[#9b8af4]/40 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-xl text-left group-hover:text-[#9b8af4] transition-colors">WealthWise</h3>
                <a
                  href="https://github.com/Avani02d/WealthWise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                  title="View on GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 text-left">
                Comprehensive financial dashboard utilizing predictive machine learning models to help users analyze spending and forecast wealth generation over time.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              <span className="text-xs font-medium text-[#9b8af4] bg-[#111216] border border-[#9b8af4]/30 px-3 py-1 rounded-full">React</span>
              <span className="text-xs font-medium text-[#60b3f7] bg-[#111216] border border-[#60b3f7]/30 px-3 py-1 rounded-full">Python</span>
              <span className="text-xs font-medium text-gray-300 bg-[#111216] border border-white/10 px-3 py-1 rounded-full">Scikit-learn</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Experience</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight text-left"
        >
          Professional Path
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="flex flex-col gap-8 max-w-4xl"
        >
          <motion.div variants={fadeUp} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-2 text-left">
            <span className="text-xs sm:text-sm text-[#9b8af4] font-medium tracking-wide">Sep 2025 – Present</span>
            <h3 className="text-white font-bold text-xl">Technical Team Member</h3>
            <span className="text-gray-400 text-sm mb-2">OSCode, SAIT Chapter | Bengaluru, IN</span>
            <p className="text-[#cccccc] text-sm sm:text-base leading-relaxed">
              Engineered a QR-based check-in solution, reducing wait times by 80% and streamlining event tracking for 250+ participants.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-2 text-left">
            <span className="text-xs sm:text-sm text-[#60b3f7] font-medium tracking-wide">Jul 2025 – Aug 2025</span>
            <h3 className="text-white font-bold text-xl">Machine Learning Intern</h3>
            <span className="text-gray-400 text-sm mb-2">Coincent.ai | Remote</span>
            <p className="text-[#cccccc] text-sm sm:text-base leading-relaxed">
              Developed a bike sharing demand prediction model using Scikit-learn and implemented a Human Action Detection System.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- VOLUNTEERING --- */}
      <section id="volunteering" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Volunteering</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight text-left"
        >
          Community Impact
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="flex flex-col gap-8 max-w-4xl"
        >
          <motion.div variants={fadeUp} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-2 text-left">
            <span className="text-xs sm:text-sm text-[#60b3f7] font-medium tracking-wide">Aug 2026 – Present</span>
            <h3 className="text-white font-bold text-xl">Team Lead</h3>
            <span className="text-gray-400 text-sm mb-2">All India Council for Technical Education (AICTE) | Science and Technology</span>
            <p className="text-[#cccccc] text-sm sm:text-base leading-relaxed">
              As the AICTE team leader, I am committed to promoting awareness and understanding of science and technology among the community, encouraging the adoption of appropriate technologies, and inspiring people to use scientific innovations effectively for sustainable development and positive social change.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-2 text-left">
            <span className="text-xs sm:text-sm text-[#9b8af4] font-medium tracking-wide">Sep 2024 – Jul 2026</span>
            <h3 className="text-white font-bold text-xl">Team Leader</h3>
            <span className="text-gray-400 text-sm mb-2">National Service Scheme | Social Services</span>
            <p className="text-[#cccccc] text-sm sm:text-base leading-relaxed">
              As the NSS team leader, I am committed to guiding our team in impactful community service, fostering awareness, and driving positive change through dedicated efforts in various social initiatives.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SUCCESSES --- */}
      <section id="achievements" className="scroll-mt-24 py-20 max-w-[1200px] mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Successes</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight text-left"
        >
          Achievements
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="flex flex-col gap-6 max-w-4xl"
        >
          <motion.div variants={fadeUp} whileHover={{ x: 6 }} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 transition-all hover:border-[#9b8af4]/40 text-left">
            <h3 className="text-white font-bold text-lg mb-2 text-left">National Finalist - VOIS Tech Innovation Marathon 2.0</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-left">Selected among the top 75 teams nationwide for an exclusive technical mentorship program.</p>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ x: 6 }} className="bg-[#15161b] rounded-2xl p-6 sm:p-8 border border-white/5 transition-all hover:border-[#60b3f7]/40 text-left">
            <h3 className="text-white font-bold text-lg mb-2 text-left">Top 5000 - EY Techathon 6.0</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-left">Ranked in the top tier among 200,000+ national participants in a competitive software engineering hackathon.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="scroll-mt-24 py-20 pb-32 max-w-[1200px] mx-auto px-6 sm:px-12 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-center gap-4 mb-4 justify-center"
        >
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
          <span className="text-[#9b8af4] text-xs font-semibold tracking-[0.2em] uppercase">Contact</span>
          <div className="w-8 h-[1px] bg-[#9b8af4]/50"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] leading-tight">
            Get In Touch
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed text-center">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:avanidpoojary02@gmail.com"
              className="px-8 py-3.5 rounded-full font-semibold text-[#0b0c10] bg-gradient-to-r from-[#9b8af4] to-[#60b3f7] hover:opacity-90 transition-opacity"
            >
              Say Hello
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Avani02d"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/10 hover:bg-white/5 transition-colors bg-[#111216]"
            >
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}

