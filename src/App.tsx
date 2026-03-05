import { useState, useEffect, useRef } from 'react'
import {
  Check, Sparkles, Zap, Shield, Target, TrendingUp, ArrowRight,
  Brain, Users, Briefcase, Lightbulb, Crown, Rocket, Eye, Volume2,
  FlaskConical, Globe, Bot, Shirt, Calendar, BookOpen,
  Award, Lock, FileText, Mic, ChevronRight, Star, Dna, GraduationCap,
  Monitor
} from 'lucide-react'
import logoIcon from './assets/logo-icon-swirl.svg'

/* ────────────────────────────────────────────────────────────────────────── */
/*  HERO ANIMATION — OMNIFORM INITIALISING                                  */
/* ────────────────────────────────────────────────────────────────────────── */

const STAGES = [
  { num: 1, label: 'IDENTITY UPLOAD' },
  { num: 2, label: 'GOAL MAPPING' },
  { num: 3, label: 'VALUES FORMATION' },
  { num: 4, label: 'PERSONALITY DEV' },
  { num: 5, label: 'INTEGRATION' },
  { num: 6, label: 'EMERGENCE' },
]

function HeroInitialiser() {
  const [stageIdx, setStageIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIdx(prev => (prev + 1) % STAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stage = STAGES[stageIdx]

  return (
    <div className="flex flex-col items-center gap-4 mt-10 mb-8">
      {/* Pulsing OMNIFORM INITIALISING text */}
      <div className="relative">
        <p
          className="font-mono text-sm md:text-base tracking-[0.3em] uppercase animate-omniform-pulse text-cyan-400 font-semibold"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          OMNIFORM INITIALISING
        </p>
      </div>

      {/* Stage indicator with animation */}
      <div className="flex items-center gap-3">
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i <= stageIdx
                  ? 'bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,0.6)]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Stage text */}
        <div
          key={stageIdx}
          className="font-mono text-xs md:text-sm tracking-widest text-cyan-300/80 uppercase"
          style={{
            animation: 'stage-slide 3s ease-in-out',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          STAGE {stage.num} OF 6 · {stage.label}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${((stageIdx + 1) / STAGES.length) * 100}%` }}
        />
      </div>
    </div>
  )
}


/* ────────────────────────────────────────────────────────────────────────── */
/*  SCROLL ANIMATION HOOK                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}


/* ────────────────────────────────────────────────────────────────────────── */
/*  MAIN APP                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', area: '', plan: '' })
  const [submitted, setSubmitted] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.name) setSubmitted(true)
  }

  /* Scroll-in refs for sections */
  const useCasesRef = useInView()
  const problemRef = useInView()
  const solutionRef = useInView()
  const labRef = useInView()
  const contentRef = useInView()
  const pricingRef = useInView()
  const enhanceRef = useInView()
  const trustRef = useInView()

  return (
    <div className="min-h-screen bg-[#050508] text-white scroll-smooth overflow-x-hidden">

      {/* ═══════════════════ 1. TOP BAR ═══════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <img src={logoIcon} alt="OmniYou" className="w-9 h-9" />
            <span className="text-lg font-bold font-display tracking-tight">
              Omni<span className="text-cyan-400">You</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 text-sm">
            <a href="#use-cases" className="text-white/50 hover:text-white transition-colors">Who It's For</a>
            <a href="#problem" className="text-white/50 hover:text-white transition-colors">The Problem</a>
            <a href="#solution" className="text-white/50 hover:text-white transition-colors">Solution</a>
            <a href="#lab" className="text-white/50 hover:text-white transition-colors">OmniYou Lab</a>
            <a href="#pricing" className="text-white/50 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium hover:opacity-90 transition glow-sm text-sm"
            >
              Book Your Session
            </a>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="lg:hidden px-6 pb-6 pt-2 space-y-3 border-t border-white/5 bg-[#050508]/95 backdrop-blur-xl">
            {[
              ['#use-cases', 'Who It\'s For'],
              ['#problem', 'The Problem'],
              ['#solution', 'Solution'],
              ['#lab', 'OmniYou Lab'],
              ['#pricing', 'Pricing'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="block py-2 text-white/60 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>


      {/* ═══════════════════ 2. HERO SECTION ═══════════════════ */}
      <section className="relative pt-28 md:pt-36 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-grid opacity-40" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none" />
        {/* Scanline effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div className="w-full h-px bg-cyan-400" style={{ animation: 'scanline 8s linear infinite' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Now Accepting Clients</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] font-display mb-6">
            Your Best Self.<br />
            <span className="text-gradient animate-gradient-x">
              Everywhere.
            </span>
            <br />
            <span className="text-white/90">All The Time.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Introducing <span className="text-cyan-400 font-medium">OmniYou™</span> — a hyper-realistic digital version of you
            that guides your growth, builds better habits, and helps you become the person you want to be.
            Daily personal development, in your exact style.
          </p>

          {/* OMNIFORM INITIALISING Animation */}
          <HeroInitialiser />

          {/* Badges row */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {[
              { text: 'Now Accepting Clients', highlight: true },
              { text: 'AI Rights Protected' },
              { text: 'Personal Data Secure' },
              { text: 'Limited Intake' },
              { text: '24/7 Always Growing' },
              { text: '6 Creation Stages' },
            ].map((badge, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  badge.highlight
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                    : 'bg-white/[0.03] border-white/[0.08] text-white/40 hover:text-white/60 hover:border-white/15'
                }`}
              >
                {badge.highlight && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse" />}
                {badge.text}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg hover:opacity-90 transition glow flex items-center justify-center gap-2 group"
            >
              Begin Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solution"
              className="px-8 py-4 border border-white/10 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors text-white/70 hover:text-white"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════ 3. USE CASES ═══════════════════ */}
      <section id="use-cases" className="py-24 px-6" ref={useCasesRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${useCasesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <Users className="w-4 h-4" />
              <span>Who It's For</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Built For <span className="text-gradient animate-gradient-x">Ambitious People</span>
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Whether you're scaling expertise or seeking transformation, OmniYou meets you where you are.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Users, title: 'Coaches', desc: 'Scale your coaching without being on camera. Your digital self delivers growth content in your voice, 24/7.' },
              { icon: Briefcase, title: 'Professionals', desc: 'Build authority in your field. Your digital self positions you as the expert while you focus on what matters.' },
              { icon: Rocket, title: 'Entrepreneurs', desc: 'Scale your personal brand without sacrificing time. Your digital self creates content and builds your audience.' },
              { icon: GraduationCap, title: 'Course Creators', desc: 'Deliver value at scale. Your digital self teaches, guides, and engages students in your exact style.' },
              { icon: Lightbulb, title: 'Founders', desc: 'Become the go-to expert in your niche. Consistent content, thought leadership, always-on presence.' },
              { icon: Crown, title: 'Consultants', desc: 'Turn your expertise into daily content. Your digital self shares your knowledge while you serve clients.' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl glass hover:border-cyan-500/30 transition-all duration-300 group cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 4. PROBLEM SECTION ═══════════════════ */}
      <section id="problem" className="py-24 px-6 bg-white/[0.01]" ref={problemRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${problemRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 font-display">
              The Growth <span className="text-red-400">Gap</span>
            </h2>
            <p className="text-2xl md:text-3xl font-display text-white/30">
              You Know Growth = Happiness. So Why Are You Still Stuck?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { icon: '📷', title: "Don't Know Where to Start", desc: 'Too many options, too much noise. You need a clear path forward, not another framework.' },
              { icon: '⏱', title: 'No Time for Development', desc: "Life is relentless. You don't have hours to devote to self-improvement workshops and seminars." },
              { icon: '📉', title: 'Inconsistent Effort', desc: 'Motivation wanes after week one. Old habits creep back when no one is watching or holding you accountable.' },
              { icon: '💭', title: 'Never Know What\'s Next', desc: 'Without structure, every day is a guessing game. You waste energy deciding instead of growing.' },
              { icon: '🔥', title: 'Burnout From Going Alone', desc: 'Trying to improve without support is exhausting. You need a partner, not just willpower.' },
              { icon: '🏆', title: 'Others Seem Ahead', desc: 'Everyone else looks more put together. The comparison trap keeps you paralysed instead of progressing.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl glass hover:border-red-500/20 transition-colors group">
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold mb-2 font-display">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '87%', label: 'of people abandon goals within 30 days', color: 'text-red-400' },
              { value: '24/7', label: 'Your digital self is always live', color: 'text-cyan-400' },
              { value: '0', label: 'Hours of your time needed', color: 'text-green-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl glass">
                <div className={`text-4xl md:text-5xl font-bold font-display mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 5. SOLUTION SECTION ═══════════════════ */}
      <section id="solution" className="py-24 px-6" ref={solutionRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${solutionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <Dna className="w-4 h-4" />
              <span>The Solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 font-display">
              Meet Your
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-gradient animate-gradient-x">
              Digital Self
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              A hyper-realistic AI version of you — built from your goals, values, and personality —
              that guides your growth, delivers personal development content, and never sleeps.
            </p>
            <p className="mt-4 text-sm text-white/30 font-mono tracking-wide uppercase">
              You share your goals · We handle everything else
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye, title: 'Looks Like You', desc: 'Your digital self, personalized to how you want to present. Your likeness, your way.' },
              { icon: Volume2, title: 'Sounds Like You', desc: 'Voice-cloned with your tone. Motivational mode, calm guidance, deeper, higher — you choose how your coach speaks.' },
              { icon: Calendar, title: 'Guides You Daily', desc: 'Daily personal development content, written by our team, on-brand and always progressing — without you lifting a finger.' },
              { icon: Target, title: 'Challenges You', desc: 'Goal reviews, accountability check-ins, challenge content — your digital self pushes you with your energy and authority.' },
              { icon: TrendingUp, title: 'Scales Beyond You', desc: 'Multi-topic, multi-focus, 24/7. Your growth reaches areas you\'d never have time for alone.' },
              { icon: Brain, title: 'Grows With You', desc: 'Analytics, habit tracking, progress positioning. A system that compounds over time — not a one-off experience.' },
            ].map((feature, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl glass hover:border-cyan-500/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 6. OMNIYOU LAB ═══════════════════ */}
      <section id="lab" className="py-24 px-6 bg-white/[0.01] relative" ref={labRef.ref}>
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none" />

        <div className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${labRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <FlaskConical className="w-4 h-4" />
              <span>OmniYou Lab™</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 font-display">
              Watch Your Digital Self
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-gradient animate-gradient-x">
              Come To Life
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              From first payment to first breakthrough. A cinematic 6-stage creation experience — tracked live in your personal dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                stage: '01', title: 'Initiation', color: 'from-violet-500 to-purple-600',
                desc: 'Payment confirmed. You name your digital self. It appears as an embryo in your personal chamber. The journey begins.',
                real: 'Dashboard access granted — your growth chamber goes live'
              },
              {
                stage: '02', title: 'Goal Mapping', color: 'from-blue-500 to-cyan-500',
                desc: 'Share your aspirations. Watch your digital self form as your goals take shape. We send refined previews for your approval.',
                real: 'Goals submitted — refined previews delivered within 48 hours'
              },
              {
                stage: '03', title: 'Values Formation', color: 'from-cyan-500 to-teal-500',
                desc: 'Share your values. Your digital self\'s foundation forms. Background options, style previews and approach approvals begin.',
                real: 'Values submission — draft visual previews for approval'
              },
              {
                stage: '04', title: 'Personality Development', color: 'from-teal-500 to-emerald-500',
                desc: 'Your digital self gets a mind. We map your communication style, values, growth pillars, signature phrases and personal voice.',
                real: 'Voice questionnaire + strategy session — character locked in'
              },
              {
                stage: '05', title: 'Integration', color: 'from-emerald-500 to-green-500',
                desc: 'Goals, values, and personality merge. Your fully-formed digital self appears in the chamber. First sample content delivered.',
                real: 'First sample content delivered — your feedback shapes the final output'
              },
              {
                stage: '06', title: 'Emergence', color: 'from-green-400 to-cyan-400',
                desc: 'The chamber opens. Your digital self steps forward. A personalized greeting delivered in your words, your energy. Welcome to your next level.',
                real: 'Full platform launches — your digital twin is live'
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl glass hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden animate-float"
                style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${6 + i * 0.5}s` }}
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Stage number */}
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} text-white font-bold text-sm font-mono mb-4`}>
                  {step.stage}
                </div>

                <h3 className="text-lg font-semibold mb-2 font-display">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-3">{step.desc}</p>

                {/* Real-world tag */}
                <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-cyan-400/60 leading-relaxed">{step.real}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 7. CONTENT ENGINE ═══════════════════ */}
      <section id="content" className="py-24 px-6" ref={contentRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${contentRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <Monitor className="w-4 h-4" />
              <span>Content Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 font-display">
              Not Just Videos.
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-gradient animate-gradient-x">
              A Full Growth Operating System.
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Your digital self follows proven growth frameworks — structured, consistent, and built for transformation, not just output.
            </p>
          </div>

          {/* Content types grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              'Daily growth content', 'Authority Story Series', 'Myth Busting content',
              'Client Win Showcases', 'Offer launch videos', 'Webinar intros & outros',
              'Course content delivery', 'Audiobook narration', 'Multilingual content',
              'Lead gen video assets', 'Brand authority positioning', 'Micro-Masterclasses'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-colors">
                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>

          {/* Weekly schedule */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 font-display text-center">Content Frameworks</h3>
            <div className="grid gap-3">
              {[
                { day: 'Monday', content: 'Myth Busting', icon: Zap, color: 'from-red-500/20 to-orange-500/20 border-red-500/20' },
                { day: 'Tuesday', content: 'Authority Story', icon: BookOpen, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20' },
                { day: 'Wednesday', content: 'Client Win', icon: Award, color: 'from-green-500/20 to-emerald-500/20 border-green-500/20' },
                { day: 'Thursday', content: 'Education Drop', icon: Brain, color: 'from-purple-500/20 to-violet-500/20 border-purple-500/20' },
                { day: 'Friday', content: 'Offer Spotlight', icon: Star, color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/20' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${item.color} border transition-all hover:scale-[1.01]`}>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-mono text-sm text-white/50 uppercase tracking-wider w-28">{item.day}</span>
                    <span className="font-display font-medium text-white/80">{item.content}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/30 text-sm mt-4 font-mono">+ Weekend Micro-Masterclasses</p>
          </div>
        </div>
      </section>


      {/* ═══════════════════ 8. PRICING ═══════════════════ */}
      <section id="pricing" className="py-24 px-6 bg-white/[0.01]" ref={pricingRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${pricingRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Choose Your <span className="text-gradient animate-gradient-x">Level</span>
            </h2>
            <p className="text-lg text-white/40">
              Pricing revealed on your discovery call. We'll match you to the right plan for your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Core */}
            <div className="p-8 rounded-2xl glass hover:border-white/15 transition-all duration-300 flex flex-col">
              <span className="text-3xl mb-4">🧬</span>
              <h3 className="text-2xl font-bold mb-2 font-display">Core</h3>
              <p className="text-white/40 mb-6 text-sm">Your foundation. Launch your digital presence with consistent, professional growth.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Digital self creation included',
                  '12 growth sessions per month',
                  'Content writing by our team',
                  'Strategy guidance',
                  'OmniYou Lab dashboard',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center py-3.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium text-white/70 hover:text-white">
                Explore Core
              </a>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-blue-600/5 border border-cyan-500/30 relative flex flex-col glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-semibold whitespace-nowrap tracking-wide">
                Most Popular
              </div>
              <span className="text-3xl mb-4">🔥</span>
              <h3 className="text-2xl font-bold mb-2 font-display">Pro</h3>
              <p className="text-white/40 mb-6 text-sm">Accelerate. Voice refinement, bilingual content, and priority production.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Core',
                  'Voice tone refinement options',
                  'Appearance enhancements',
                  '1 additional language included',
                  'Priority content production queue',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition font-medium">
                Explore Pro
              </a>
            </div>

            {/* Authority */}
            <div className="p-8 rounded-2xl glass hover:border-white/15 transition-all duration-300 flex flex-col">
              <span className="text-3xl mb-4">👑</span>
              <h3 className="text-2xl font-bold mb-2 font-display">Authority</h3>
              <p className="text-white/40 mb-6 text-sm">Become the expert in your niche. Limited to 1-2 clients per industry.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Pro',
                  'Paid ads management',
                  'Lead generation funnels',
                  'Webinar and course creation',
                  'Audiobook creation',
                  'Amazon authority positioning',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center py-3.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium text-white/70 hover:text-white">
                Claim Authority
                <span className="block text-xs text-amber-400/60 mt-1">⚠️ Limited availability per niche</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ 9. ENHANCEMENTS ═══════════════════ */}
      <section id="enhance" className="py-24 px-6" ref={enhanceRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${enhanceRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Enhance Your <span className="text-gradient animate-gradient-x">Digital Self</span>
            </h2>
            <p className="text-lg text-white/40">
              Add-ons to make your digital self even more powerful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Volume2,
                title: 'Voice Enhancements',
                desc: 'Deeper. Higher. Motivational mode. Calm guidance. Choose how your digital self speaks.',
                tags: ['Motivational Mode', 'Calm Guidance', 'Deep Tone', 'Confident Mode']
              },
              {
                icon: Shirt,
                title: 'The Wardrobe',
                desc: 'Dress your digital self for every occasion. Outfit bundles, accessory packs and premium collections.',
                tags: ['Outfit Packs', 'Accessories', 'Luxury Collection']
              },
              {
                icon: Globe,
                title: 'Language Expansion',
                desc: 'Take your digital self global. Add languages, reach new markets and scale your authority internationally.',
                tags: ['+1 Language', 'Multi-Language Pack', 'Global Reach']
              },
              {
                icon: Bot,
                title: 'OmniBot™ AI Assistant',
                desc: 'Your digital self, conversational. OmniBot is trained on your voice, personality profile and goals — handling questions, check-ins and enquiries 24/7.',
                tags: ['24/7 Conversational', 'Your Voice & Tone', 'Lead Qualification']
              },
            ].map((item, i) => (
              <div key={i} className="p-7 rounded-2xl glass hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 font-display">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-16">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 rounded-full text-xs bg-white/[0.04] border border-white/[0.08] text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 10. PROTECTED BY DESIGN ═══════════════════ */}
      <section id="trust" className="py-24 px-6 bg-white/[0.01]" ref={trustRef.ref}>
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${trustRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <Shield className="w-4 h-4" />
              <span>Protected by Design</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Your Growth. Your Data.<br />
              <span className="text-gradient animate-gradient-x">Our Responsibility.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: FileText, title: 'Rights Agreement', desc: 'Your growth, your IP. Legally protected from day one. Full ownership remains yours.' },
              { icon: Mic, title: 'Data Consent', desc: 'Your information belongs to you. Always. Clear consent and usage terms from the start.' },
              { icon: Bot, title: 'AI Disclosure Compliant', desc: 'Fully compliant with platform AI disclosure requirements. Transparent and future-proof.' },
              { icon: Lock, title: 'Content Boundaries', desc: 'Clear terms on how, where and when your digital self appears. Nothing published without your approval.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl glass hover:border-cyan-500/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 font-display">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ 11. CTA / CONTACT FORM ═══════════════════ */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-cyan-900/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 font-display">
            Begin Your <span className="text-gradient animate-gradient-x">Transformation</span>
          </h2>
          <p className="text-xl text-white/50 mb-4 font-display">Book Your Session</p>
          <p className="text-white/30 mb-10 max-w-lg mx-auto">
            Limited spots available. We'll walk you through the process, answer your questions, and match you to the right plan.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-display">You're on the list!</h3>
              <p className="text-white/40 mt-2">We'll be in touch within 24 hours to schedule your session.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="What area of life do you want to improve?"
                value={formData.area}
                onChange={e => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm"
              />
              <select
                value={formData.plan}
                onChange={e => setFormData({ ...formData, plan: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/60 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm appearance-none"
              >
                <option value="" className="bg-[#0a0a12]">Which plan interests you?</option>
                <option value="core" className="bg-[#0a0a12]">🧬 Core</option>
                <option value="pro" className="bg-[#0a0a12]">🔥 Pro</option>
                <option value="authority" className="bg-[#0a0a12]">👑 Authority</option>
              </select>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition glow flex items-center justify-center gap-2 group text-lg"
              >
                Begin My Transformation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-white/20">
            No spam. No obligation. Your information is protected.
          </p>
        </div>
      </section>


      {/* ═══════════════════ 12. FOOTER ═══════════════════ */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="OmniYou" className="w-7 h-7" />
              <div>
                <span className="font-bold font-display text-sm">OmniYou™</span>
                <p className="text-xs text-white/20">The personal growth digital clone system.</p>
              </div>
            </div>

            <div className="flex gap-6 text-white/25 text-sm">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">AI Disclosure</a>
            </div>

            <p className="text-white/20 text-xs">
              © 2026 OmniYou. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
