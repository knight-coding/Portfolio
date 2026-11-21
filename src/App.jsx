import React, { useState, useEffect } from 'react';
import {
  Terminal, Server, Database, Layers, Code2, GitBranch, ExternalLink, Mail, Phone, Check, Copy,
  Award, ArrowRight, ChevronRight, Menu, X, Send, BookOpen, TrendingUp, Briefcase, Sparkles,
  GraduationCap, MapPin
} from 'lucide-react';

/**
 * Manan Sehgal - Software Engineer Portfolio
 * Soft-UI Bento Aesthetic with Dark Slate, Emerald & Cyan Palette
 */
const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };
const GITHUB = 'https://github.com/knight-coding';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills & DSA', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

const socials = [
  { href: GITHUB, text: 'github.com/knight-coding', Icon: GitBranch, hover: 'hover:text-emerald-300', color: 'text-emerald-400' },
  { href: 'https://linkedin.com/in/manansehgal01', text: 'linkedin.com/in/manansehgal01', Icon: Briefcase, hover: 'hover:text-cyan-300', color: 'text-cyan-400' },
  { href: 'https://leetcode.com/knight_coder_', text: 'leetcode.com/knight_coder_', Icon: Code2, hover: 'hover:text-emerald-300', color: 'text-emerald-400' }
];

const scenarios = {
  hit: [
    ['INFO', 'GET /api/v1/portfolio/summary?userId=usr_94a'],
    ['CACHE', 'Redis GET eod:prices -> HIT'],
    ['DB', 'MongoDB aggregation -> holdings & P&L computed'],
    ['200', 'Response sent (0 external API calls)']
  ],
  queue: [
    ['CRON', 'EOD sync triggered'],
    ['QUEUE', 'BullMQ splits uniqueStocks into chunks of 50'],
    ['WORKER', 'Fetch prices per chunk, retry on rate limits'],
    ['CACHE', 'Redis updated with fresh closing prices']
  ],
  miss: [
    ['INFO', 'GET /api/v1/stocks/quote?ticker=HDFCBANK'],
    ['WARN', 'Redis GET eod:prices:HDFCBANK -> MISS'],
    ['FETCH', 'Single upstream call (shared across users)'],
    ['CACHE', 'Redis SET -> cached for next requests']
  ]
};

const makeLogs = (mode, ts) => scenarios[mode].map(([level, msg]) => ({ time: ts, level, msg }));

const simButtons = [
  { id: 'hit', label: '1. Redis Cache HIT', on: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' },
  { id: 'queue', label: '2. BullMQ 50-Stock Sync', on: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' },
  { id: 'miss', label: '3. Cold Cache Dedup', on: 'bg-amber-500/20 border-amber-500/50 text-amber-300' }
];

const archCards = [
  ['01 • DEDUPLICATION', 'text-cyan-400', 'uniqueStocks Collection', 'Stores each symbol once to avoid repeat API calls.'],
  ['02 • BACKGROUND QUEUE', 'text-emerald-400', 'BullMQ Chunked Sync', 'Syncs 50 stocks per job and retries on failure.'],
  ['03 • IN-MEMORY CACHE', 'text-cyan-400', 'Redis EOD Price Cache', 'Closing prices are fetched once and served fast.'],
  ['04 • AGGREGATION', 'text-emerald-400', 'MongoDB P&L Pipelines', 'Computes holdings and profit/loss across accounts.']
];

const skillCategories = [
  { title: 'Languages', subtitle: 'Core programming', icon: <Code2 className="w-5 h-5 text-emerald-400" />, skills: ['C++', 'JavaScript', 'TypeScript', 'Java'] },
  { title: 'Backend & Systems', subtitle: 'APIs, caching & queues', icon: <Server className="w-5 h-5 text-cyan-400" />, skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Redis', 'BullMQ', 'Rate Limiting', 'Data Deduplication'] },
  { title: 'Databases', subtitle: 'SQL & NoSQL', icon: <Database className="w-5 h-5 text-emerald-400" />, skills: ['MongoDB', 'Mongoose', 'MongoDB Aggregation', 'PostgreSQL', 'MySQL'] },
  { title: 'Frontend & Tools', subtitle: 'UI & deployment', icon: <Layers className="w-5 h-5 text-cyan-400" />, skills: ['React.js', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'GitHub', 'Postman', 'Vercel', 'Render'] }
];

const experiences = [
  {
    role: 'Freelance Full-Stack Developer', company: 'TruLeads Agency', type: 'Remote', period: 'Nov 2024 – Jan 2025', accent: 'emerald',
    bullets: [
      'Built and deployed 2 live MERN lead-generation sites with admin login and dashboards.',
      'Designed REST APIs and MongoDB models for lead management.',
      'Handled requirements to deployment on Hostinger with 1 other developer.'
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT']
  },
  {
    role: 'Full-Stack Intern', company: 'Macenza', type: 'Remote', period: 'Sep 2024 – Oct 2024', accent: 'cyan',
    bullets: [
      'Learned TypeScript in a professional codebase.',
      'Used PostgreSQL with an ORM and compared it to MongoDB.'
    ],
    stack: ['TypeScript', 'PostgreSQL', 'ORM', 'Notion Docs']
  }
];

const achievements = [
  { title: '800+ DSA Problems Solved', detail: 'LeetCode max rating 1588. Strong in arrays, trees, DP and graphs.', badge: 'LeetCode' },
  { title: '5-Star C++ & GFG Score 210', detail: '5★ C++ on HackerRank and active on GeeksforGeeks.', badge: 'Competitive Coding' },
  { title: 'Idea Patent Holder', detail: 'Awarded in first year of B.Tech at IMS Engineering College.', badge: 'Innovation' },
  { title: 'Campus Leadership', detail: 'Brand Ambassador at IMS. Participant at Hackingly CodeX 24.', badge: 'Community' }
];

const cardBase = 'bg-slate-900/65 backdrop-blur-md border border-slate-800/70';
const pill = 'px-3 py-1 rounded-full bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300';
const repoBtn = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors';
const inputCls = 'w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-emerald-500/60 focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 transition-colors';

const SectionHead = ({ Icon, label, color, title, text }) => (
  <div className="space-y-2">
    <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${color}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold text-white" style={jakarta}>{title}</h2>
    {text && <p className="text-sm sm:text-base text-slate-400 max-w-2xl">{text}</p>}
  </div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState('architecture');
  const [cacheSimState, setCacheSimState] = useState('hit');
  const [simLogs, setSimLogs] = useState(makeLogs('hit', '18:01:02.110'));
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!document.getElementById('portfolio-google-fonts')) {
      const link = document.createElement('link');
      link.id = 'portfolio-google-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('manansehgal97@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const triggerArchitectureSim = (mode) => {
    setCacheSimState(mode);
    const d = new Date();
    const p = (n, l = 2) => String(n).padStart(l, '0');
    setSimLogs(makeLogs(mode, `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`));
  };

  const logColor = (level) =>
    level === 'CACHE' || level === '200' ? 'bg-emerald-500/15 text-emerald-300'
    : level === 'WARN' ? 'bg-amber-500/15 text-amber-300'
    : 'bg-cyan-500/15 text-cyan-300';

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:manansehgal97@gmail.com?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div
      className="min-h-screen bg-[#090d16] text-slate-200 selection:bg-emerald-500/25 selection:text-emerald-200 overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Soft Ambient Background Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -left-28 w-[34rem] h-[34rem] rounded-full bg-emerald-500/[0.06] blur-3xl" />
        <div className="absolute top-[28%] -right-32 w-[32rem] h-[32rem] rounded-full bg-cyan-500/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-emerald-500/[0.04] blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/80 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold text-slate-100 text-lg tracking-tight" style={jakarta}>
              Manan<span className="text-emerald-400">.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/70">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all">
              Open to SDE Roles
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d1320]/95 backdrop-blur-xl border-b border-slate-800/70 px-4 pt-3 pb-5 space-y-1.5">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-2xl text-slate-300 hover:bg-slate-800/70 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
        {/* HERO */}
        <section className="pt-12 sm:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/75 border border-emerald-500/25 text-xs font-medium text-emerald-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Final-Year B.Tech CSE • Seeking SDE &amp; Backend Roles
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]" style={jakarta}>
                  Hi, I’m{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">Manan Sehgal</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-medium">Full-Stack &amp; Backend Software Developer</p>
              </div>

              <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
                CS student at <span className="text-slate-200 font-medium">IMS Engineering College, Ghaziabad</span>. I build MERN apps
                with <span className="text-emerald-300 font-medium">Redis</span> caching and{' '}
                <span className="text-cyan-300 font-medium">BullMQ</span> queues.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20">
                  View My Work <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={handleCopyEmail} className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-200 text-sm font-medium transition-all shadow-sm">
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied manansehgal97@gmail.com</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>manansehgal97@gmail.com</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {socials.map(({ href, text, Icon, hover, color }) => (
                  <a key={text} href={href} target="_blank" rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800/80 text-xs font-medium text-slate-300 ${hover} transition-colors`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {text}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bento Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className={`col-span-2 p-6 rounded-3xl ${cardBase} shadow-xl space-y-2.5`}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full">
                    <GraduationCap className="w-3.5 h-3.5" /> Education
                  </span>
                  <span className="text-xs text-slate-400" style={mono}>Oct 2023 – June 2027</span>
                </div>
                <h3 className="text-lg font-bold text-white" style={jakarta}>B.Tech in Computer Science &amp; Engineering</h3>
                <p className="text-sm text-slate-400">
                  IMS Engineering College, Ghaziabad • <span className="text-slate-200 font-semibold">CGPA: 7.98</span>
                </p>
              </div>

              <div className={`p-5 rounded-3xl ${cardBase} shadow-lg flex flex-col justify-between`}>
                <div className="text-xs font-medium text-slate-400">Problem Solving</div>
                <div className="my-2">
                  <div className="text-3xl font-extrabold text-emerald-400" style={jakarta}>800+</div>
                  <div className="text-xs text-slate-300 mt-0.5">DSA Problems Solved</div>
                </div>
                <div className="text-[11px] text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full w-fit" style={mono}>Max Rating: 1588</div>
              </div>

              <div className={`p-5 rounded-3xl ${cardBase} shadow-lg flex flex-col justify-between`}>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Base Location
                </div>
                <div className="my-2">
                  <div className="text-lg font-bold text-white" style={jakarta}>Ghaziabad, UP</div>
                  <div className="text-xs text-slate-400 mt-0.5">Delhi NCR • On-site Ready</div>
                </div>
                <a href="tel:+917701920069" className="text-[11px] text-slate-300 hover:text-emerald-300 transition-colors" style={mono}>
                  +91 7701920069
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <SectionHead Icon={Sparkles} label="Experience" color="text-emerald-400" title="Work & Internship Experience"
            text="Live MERN projects and TypeScript/PostgreSQL work." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experiences.map((exp) => {
              const c = exp.accent === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
              return (
                <div key={exp.company} className={`p-6 sm:p-8 rounded-3xl ${cardBase} hover:border-slate-700/80 transition-all shadow-xl flex flex-col justify-between space-y-6`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-white" style={jakarta}>{exp.role}</h3>
                        <div className={`text-sm font-semibold mt-0.5 ${c}`}>
                          {exp.company} • <span className="text-slate-400 font-normal">{exp.type}</span>
                        </div>
                      </div>
                      <span className={pill} style={mono}>{exp.period}</span>
                    </div>
                    <ul className="space-y-3 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${c}`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                    {exp.stack.map((t) => (
                      <span key={t} className={pill} style={mono}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <SectionHead Icon={Layers} label="Featured Projects" color="text-cyan-400" title="Systems & Full-Stack Applications"
            text="Caching, rate-limit handling and clean data models." />

          <div className={`rounded-3xl ${cardBase} overflow-hidden shadow-xl`}>
            <div className="p-6 sm:p-8 border-b border-slate-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> Featured Backend &amp; MERN Project
                  </span>
                  <span className="text-xs text-slate-400" style={mono}>React • Node.js • Express • MongoDB • Redis • BullMQ • JWT</span>
                </div>
                <h3 className="text-2xl font-bold text-white" style={jakarta}>StockPulse — Portfolio Tracker</h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  Track multiple portfolios and see combined P&amp;L. Redis caching and chunked BullMQ jobs avoid duplicate API calls and rate limits.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a href={`${GITHUB}/stockPulse`} target="_blank" rel="noreferrer" className={repoBtn}>
                  <GitBranch className="w-4 h-4 text-emerald-400" /> View on GitHub
                </a>
              </div>
            </div>

            <div className="px-6 sm:px-8 pt-4 pb-2 bg-slate-950/30 flex flex-wrap gap-2">
              {[
                { id: 'architecture', label: 'Cache & Queue Flow' },
                { id: 'highlights', label: 'Highlights' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveProjectTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeProjectTab === tab.id
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {activeProjectTab === 'architecture' ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/70">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interactive Flow Visualizer</div>
                      <div className="text-sm text-slate-200 mt-0.5">Pick a scenario to see how it runs:</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {simButtons.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => triggerArchitectureSim(b.id)}
                          className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                            cacheSimState === b.id ? b.on : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {archCards.map(([tag, color, title, text]) => (
                      <div key={tag} className="p-5 rounded-2xl bg-slate-950/65 border border-slate-800/70 space-y-1.5">
                        <span className={`text-[11px] font-semibold ${color}`} style={mono}>{tag}</span>
                        <h4 className="font-semibold text-white text-sm">{title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-[#070b12] border border-slate-800/80 p-4 sm:p-5 text-xs space-y-2 overflow-x-auto" style={mono}>
                    <div className="text-slate-500 pb-2 border-b border-slate-800/70 flex items-center justify-between">
                      <span>stockpulse-trace-output</span>
                      <span className="text-emerald-400">● Interactive Preview</span>
                    </div>
                    {simLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-3 leading-relaxed">
                        <span className="text-slate-600 shrink-0">{log.time}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] shrink-0 ${logColor(log.level)}`}>{log.level}</span>
                        <span className="text-slate-300">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-2">
                    <h4 className="font-semibold text-emerald-300">Shared Stock Deduplication</h4>
                    <p className="text-slate-300 leading-relaxed">
                      A shared <code className="text-cyan-300">uniqueStocks</code> collection means each ticker is fetched once, not once per user.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-2">
                    <h4 className="font-semibold text-cyan-300">Rate-Limit Safe Jobs</h4>
                    <p className="text-slate-300 leading-relaxed">
                      BullMQ updates prices in batches of 50 and retries failed chunks.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`rounded-3xl ${cardBase} p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700/80 transition-all shadow-lg`}>
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-medium">
                  <BookOpen className="w-3.5 h-3.5" /> Full-Stack MERN Application
                </span>
                <span className="text-xs text-slate-400" style={mono}>React • Tailwind CSS • Node.js • Express • MongoDB • JWT • Vercel</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={jakarta}>ReadersHub — Book Review Platform</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Book review site with JWT login, full review CRUD and a responsive UI, deployed on Vercel.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a href={GITHUB} target="_blank" rel="noreferrer" className={repoBtn}>
                <GitBranch className="w-4 h-4 text-cyan-400" /> Source Code
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <SectionHead Icon={Code2} label="Technical Toolkit & Milestones" color="text-emerald-400" title="Skills & Achievements" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map((cat) => (
              <div key={cat.title} className={`p-6 sm:p-7 rounded-3xl ${cardBase} hover:border-slate-700/80 transition-all shadow-lg space-y-4`}>
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">{cat.icon}</div>
                  <div>
                    <h3 className="font-bold text-white text-base" style={jakarta}>{cat.title}</h3>
                    <p className="text-xs text-slate-400">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s} className="px-3.5 py-1.5 rounded-full bg-slate-950/75 border border-slate-800/80 text-xs font-medium text-slate-300 hover:border-emerald-500/35 hover:text-emerald-200 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {achievements.map((item) => (
              <div key={item.title} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/70 hover:bg-slate-900/85 transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" style={mono}>
                    {item.badge}
                  </span>
                  <Award className="w-4 h-4 text-cyan-400/80" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1" style={jakarta}>{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-[#0c1626] border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  <Mail className="w-3.5 h-3.5" /> Get In Touch
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug" style={jakarta}>Let’s Connect</h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Looking for backend and SDE roles. Reach me by email, phone or LinkedIn.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-200 truncate">manansehgal97@gmail.com</span>
                    </div>
                    <button onClick={handleCopyEmail} className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-emerald-300 shrink-0 transition-colors">
                      {copiedEmail ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <a href="tel:+917701920069" className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3 hover:border-slate-700 transition-colors">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200">+91 7701920069</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-950/65 border border-slate-800/80 space-y-4">
                  <h3 className="font-bold text-white text-lg" style={jakarta}>Send a Quick Message</h3>

                  {formSubmitted && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
                      <span>Your email app should open. Just press send.</span>
                      <button type="button" onClick={() => setFormSubmitted(false)} className="text-emerald-300 underline ml-3 text-xs font-medium">
                        Reset
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ['name', 'Your Name', 'text', 'Jane Doe'],
                      ['email', 'Email Address', 'email', 'jane@company.com']
                    ].map(([key, label, type, ph]) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                        <input
                          type={type}
                          required
                          value={contactForm[key]}
                          onChange={(e) => setContactForm({ ...contactForm, [key]: e.target.value })}
                          placeholder={ph}
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Hi Manan, I'd like to discuss a role..."
                      className={inputCls}
                    />
                  </div>

                  <button type="submit" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/15">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Manan Sehgal • Built with React &amp; Tailwind CSS</span>
          <div className="flex items-center gap-5">
            {[['GitHub', GITHUB, 'hover:text-emerald-300'], ['LinkedIn', 'https://linkedin.com/in/manansehgal01', 'hover:text-cyan-300'], ['LeetCode', 'https://leetcode.com/knight_coder_', 'hover:text-emerald-300']].map(([n, h, c]) => (
              <a key={n} href={h} target="_blank" rel="noreferrer" className={`${c} transition-colors`}>{n}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}