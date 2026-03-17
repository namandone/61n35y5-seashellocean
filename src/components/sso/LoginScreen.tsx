import { useState, useEffect } from 'react'

// =============================================================================
//  SIMULATION CAROUSEL STATES
//  Each entry is a named left-panel configuration shown during Simulate mode.
//  Add new states to this array — reference them by `id` or `name`.
//
//  Layouts:
//    'centered'       — badge → headline → image → description, all centred
//    'image-overlay'  — image floats in upper-right; badge + headline + description anchor to lower-left
//
//  Badge variants:
//    'gradient-green'  — solid green gradient pill, white text
//    'outlined-green'  — white pill with green border + green text
// =============================================================================

interface CarouselState {
  id: string
  name: string
  layout: 'centered' | 'image-overlay'
  badge: { text: string; variant: 'gradient-green' | 'outlined-green' }
  headline: {
    lines: string[]
    font: 'sans' | 'serif-italic'
    size: number
    align: 'center' | 'left'
  }
  image: { src: string; width: number; height: number; bordered: boolean }
  description: Array<{ text: string; bold?: boolean; break?: boolean }>
}

const CAROUSEL_STATES: CarouselState[] = [
  // ── State 1: Omnichannel ─────────────────────────────────────────────────
  {
    id: 'omnichannel',
    name: 'Omnichannel',
    layout: 'centered',
    badge: { text: 'DO MORE WITH ONE', variant: 'gradient-green' },
    headline: {
      lines: ['12 channels.  1 shipment queue.'],
      font: 'sans',
      size: 32,
      align: 'center',
    },
    image: {
      src: 'https://www.figma.com/api/mcp/asset/1aa18e25-4d46-47b8-8851-b6ba9eab8812',
      width: 480,
      height: 280,
      bordered: true,
    },
    description: [
      { text: 'Retailers on Ginesys used Browntape to process', break: true },
      { text: '40% more orders per day', bold: true },
      { text: ' without adding new staff.' },
    ],
  },

  // ── State 2: Real Intelligence ───────────────────────────────────────────
  {
    id: 'real-intelligence',
    name: 'Real Intelligence',
    layout: 'image-overlay',
    badge: { text: 'NEW RELEASE', variant: 'outlined-green' },
    headline: {
      lines: ['Real Intelligence.', 'Now just a click away.'],
      font: 'serif-italic',
      size: 48,
      align: 'left',
    },
    image: {
      src: 'https://www.figma.com/api/mcp/asset/2090834b-50cb-4359-b5cd-e1a0635aaa27',
      width: 360,
      height: 360,
      bordered: false,
    },
    description: [
      { text: 'The latest InsightX update brings AI-powered insights', break: true },
      { text: 'directly to your reports across all* Ginesys apps.' },
    ],
  },
]

// =============================================================================
//  SIM CAROUSEL — all slides rendered simultaneously in the DOM so images
//  are never unloaded. Active slide is shown via opacity; inactive slides are
//  hidden (opacity:0, pointerEvents:none). No src swapping = no reloads.
// =============================================================================

interface SimCarouselProps {
  activeIndex: number
  contentVisible: boolean   // false during the brief cross-fade window
  total: number
}

const SimCarousel = ({ activeIndex, contentVisible, total }: SimCarouselProps) => {
  const panelBg = 'linear-gradient(138deg, rgb(220, 255, 233) 19.72%, rgb(172, 255, 163) 98.60%)'

  const Dots = ({ current }: { current: number }) => (
    <div style={{ display: 'flex', gap: 5 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 16 : 6, height: 6, borderRadius: 3,
          background: i === current ? 'var(--color-brand-primary)' : 'rgba(79,124,63,0.25)',
          transition: 'width 0.3s ease, background 0.3s ease',
        }} />
      ))}
    </div>
  )

  return (
    // Outer shell — sized by the parent flex row (w-1/2 h-full)
    <div style={{ position: 'relative', width: '50%', height: '100%', flexShrink: 0 }}>
      {CAROUSEL_STATES.map((state, idx) => {
        const isActive = idx === activeIndex
        // Content fades out briefly during swap; slide shell stays opaque while inactive
        const contentOpacity = isActive && contentVisible ? 1 : isActive && !contentVisible ? 0 : 0

        const Badge = () => {
          const base: React.CSSProperties = {
            alignSelf: state.headline.align === 'center' ? 'center' : 'flex-start',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px 16px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-sans)',
          }
          if (state.badge.variant === 'gradient-green') return (
            <div style={{ ...base, background: 'linear-gradient(180deg, #77c564, #59a746)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>
                {state.badge.text}
              </span>
            </div>
          )
          return (
            <div style={{ ...base, background: '#fff', border: '2px solid rgba(0,132,42,0.10)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#00842a', letterSpacing: '0.05em' }}>
                {state.badge.text}
              </span>
            </div>
          )
        }

        const Headline = () => {
          const isSerif = state.headline.font === 'serif-italic'
          return (
            <p style={{
              fontFamily: isSerif ? 'var(--font-serif-alt)' : 'var(--font-sans)',
              fontSize: state.headline.size,
              fontWeight: 600,
              fontStyle: isSerif ? 'italic' : 'normal',
              color: 'var(--color-brand-primary)',
              letterSpacing: isSerif ? '-1.2px' : '-0.8px',
              lineHeight: 1.25, margin: 0,
              textAlign: state.headline.align,
            }}>
              {state.headline.lines.map((line, i) => (
                <span key={i}>{line}{i < state.headline.lines.length - 1 && <br />}</span>
              ))}
            </p>
          )
        }

        const Description = () => (
          <p style={{
            fontSize: 15, color: 'var(--color-text-primary)',
            lineHeight: 1.55, margin: 0,
            textAlign: state.headline.align,
            fontFamily: 'var(--font-sans)',
          }}>
            {state.description.map((part, i) => (
              <span key={i}>
                {part.bold ? <strong>{part.text}</strong> : part.text}
                {part.break && <br />}
              </span>
            ))}
          </p>
        )

        // Dots — absolutely positioned at the bottom-centre of the slide shell
        // so they land in exactly the same spot regardless of layout.
        const dotsNode = (
          <div style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 5,
            opacity: contentOpacity, transition: 'opacity 0.22s ease',
          }}>
            <Dots current={activeIndex} />
          </div>
        )

        // ── Centered layout (omnichannel) ──────────────────────────────────
        if (state.layout === 'centered') {
          return (
            <div key={state.id} style={{
              position: 'absolute', inset: 0,
              backgroundImage: panelBg,
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
              transition: 'opacity 0.22s ease',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* 80px bottom padding keeps content clear of the absolute dots */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 24, padding: '64px 64px 80px',
                opacity: contentOpacity,
                transform: isActive && contentVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}>
                <Badge />
                <Headline />
                <img
                  src={state.image.src}
                  alt=""
                  style={{
                    width: '100%', maxWidth: state.image.width,
                    height: state.image.height, objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)', flexShrink: 0,
                    border: state.image.bordered ? '4px solid #b2e1b8' : 'none',
                  }}
                />
                <Description />
              </div>
              {dotsNode}
            </div>
          )
        }

        // ── Image-overlay layout (real-intelligence) ───────────────────────
        // Flex column, vertically centred.
        // Row 1: image pulled to the right (alignSelf: flex-end), max 360 × 360.
        // Row 2: badge + headline + description, pulled up 32 px to sit close
        //        under the image. Content has 64 px side padding.
        return (
          <div key={state.id} style={{
            position: 'absolute', inset: 0,
            backgroundImage: panelBg,
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 0.22s ease',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: 80,   // clears the absolute dots
          }}>
            {/* Row 1 — image, right-aligned within 64px left inset to match content padding */}
            <div style={{
              paddingRight: 64,
              flexShrink: 0,
              display: 'flex', justifyContent: 'flex-end',
              opacity: contentOpacity,
              transition: 'opacity 0.22s ease',
            }}>
              <img
                src={state.image.src}
                alt=""
                style={{ maxWidth: 360, maxHeight: 360, width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Row 2 — content, pulled up 32 px into the image row */}
            <div style={{
              marginTop: -64,
              padding: '0 64px',
              display: 'flex', flexDirection: 'column', gap: 16,
              opacity: contentOpacity,
              transform: isActive && contentVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }}>
              <Badge />
              <Headline />
              <Description />
            </div>

            {dotsNode}
          </div>
        )
      })}
    </div>
  )
}

// =============================================================================
//  GINESYS LOGO
// =============================================================================

const GinesysLogo = () => (
  <svg width="76" height="44" viewBox="0 0 173 100" fill="none">
    <defs>
      <linearGradient id="grad-form" x1="36.49" y1="13.73" x2="76.41" y2="69.50" gradientUnits="userSpaceOnUse">
        <stop offset="0.162" stopColor="#4FCA43" />
        <stop offset="0.878" stopColor="#415549" />
      </linearGradient>
    </defs>
    <path d="M9.5 50C9.5 28.13 27.21 10.4 49.05 10.4C60.03 10.4 68.23 14.55 74.59 21.61C80.83 28.55 85.22 38.22 88.91 49.19C92.54 59.98 96.65 68.84 102.19 74.99C107.62 81.03 114.48 84.52 123.95 84.52C142.13 84.52 157.03 70.42 158.33 52.54H123.95C122.54 52.54 121.41 51.4 121.41 50C121.41 48.6 122.54 47.46 123.95 47.46H160.96C162.36 47.46 163.5 48.6 163.5 50C163.5 71.87 145.79 89.6 123.95 89.6C112.97 89.6 104.77 85.45 98.41 78.39C92.17 71.45 87.78 61.78 84.09 50.81C80.46 40.02 76.35 31.16 70.81 25.01C65.38 18.97 58.53 15.48 49.05 15.48C30.02 15.48 14.58 30.93 14.58 50C14.58 69.07 30.02 84.52 49.05 84.52L49.6 84.52C60.92 84.35 70.94 78.69 77.1 70.07L77.18 69.97C78.02 68.92 79.54 68.69 80.65 69.48C81.79 70.3 82.05 71.89 81.23 73.03L80.89 73.49C73.75 83.18 62.29 89.5 49.37 89.6L49.05 89.6C27.21 89.6 9.5 71.87 9.5 50Z" fill="#4FCA43" />
    <path d="M123.95 10.4C137.01 10.4 148.59 16.74 155.79 26.51L156.13 26.97L156.21 27.08C156.93 28.21 156.65 29.73 155.54 30.52C154.44 31.31 152.91 31.08 152.08 30.03L152 29.93L151.7 29.52C145.42 20.99 135.33 15.48 123.95 15.48C112.39 15.48 102.15 21.17 95.89 29.93L95.81 30.03C94.98 31.08 93.45 31.31 92.35 30.52C91.21 29.7 90.94 28.12 91.76 26.97L92.1 26.51C99.3 16.74 110.88 10.4 123.95 10.4Z" fill="#415549" />
    <path d="M49.05 10.4C27.21 10.4 9.5 28.13 9.5 50C9.5 71.87 27.21 89.6 49.05 89.6L49.37 89.6C62.29 89.5 73.75 83.18 80.89 73.49L81.23 73.03C82.05 71.89 81.79 70.3 80.65 69.48C79.54 68.69 78.02 68.92 77.18 69.97L77.1 70.07C70.94 78.69 60.92 84.35 49.6 84.52L49.05 84.52C30.02 84.52 14.58 69.07 14.58 50C14.58 30.93 30.02 15.48 49.05 15.48V10.4Z" fill="url(#grad-form)" />
  </svg>
)

// =============================================================================
//  LOGIN SCREEN
// =============================================================================

interface Props {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Forgot password flow: 'login' → 'forgot' → 'sent'
  type View = 'login' | 'forgot' | 'sent'
  const [view, setView] = useState<View>('login')
  const [forgotEmail, setForgotEmail] = useState('')

  const goToForgot = () => { setForgotEmail(''); setView('forgot') }
  const goToLogin  = () => setView('login')
  const sendReset  = () => { if (forgotEmail.trim()) setView('sent') }

  const [simActive, setSimActive] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)

  // Auto-advance carousel every 5 s while simulation is running
  useEffect(() => {
    if (!simActive) return
    const timer = setInterval(() => {
      setContentVisible(false)
      setTimeout(() => {
        setCarouselIndex(i => (i + 1) % CAROUSEL_STATES.length)
        setContentVisible(true)
      }, 250)
    }, 5000)
    return () => clearInterval(timer)
  }, [simActive])

  const startSim = () => {
    setCarouselIndex(0)
    setContentVisible(true)
    setSimActive(true)
  }

  const endSim = () => {
    setSimActive(false)
  }

  return (
    <div className="flex w-full h-screen">

      {/* ── Simulate / End Sim button ── */}
      <button
        onClick={simActive ? endSim : startSim}
        style={{
          position: 'fixed', top: 13, right: 20, zIndex: 100,
          padding: '5px 13px', borderRadius: 'var(--radius-2xl)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
          fontFamily: 'var(--font-sans)', cursor: 'pointer',
          border: simActive
            ? '1.5px solid var(--color-border-brand)'
            : '1.5px solid var(--color-border-default)',
          background: simActive ? 'var(--color-bg-brand-subtle)' : '#fff',
          color: simActive ? 'var(--color-text-brand)' : 'var(--color-text-disabled)',
          transition: 'all 0.18s ease',
        }}
      >
        {simActive ? 'End Sim' : 'Simulate'}
      </button>

      {/* ── Left Panel ── */}
      {simActive ? (
        <SimCarousel
          activeIndex={carouselIndex}
          contentVisible={contentVisible}
          total={CAROUSEL_STATES.length}
        />
      ) : (
        <div
          className="w-1/2 flex flex-col p-12 relative overflow-hidden"
          style={{ background: 'var(--color-brand-dark-bg)' }}
        >
          {/* Animated gradient background */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-20%', width: '140%', height: '140%',
              background: `
                radial-gradient(ellipse 70% 55% at 25% 15%, var(--color-green-glow-1) 0%, transparent 60%),
                radial-gradient(ellipse 55% 70% at 85% 75%, var(--color-green-glow-2) 0%, transparent 60%),
                radial-gradient(ellipse 45% 45% at 55% 50%, var(--color-green-glow-3) 0%, transparent 100%)
              `,
              animation: 'gradientDrift 18s ease-in-out infinite alternate',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center gap-0 py-5">
            <h1
              className="text-5xl leading-tight text-white mb-4 font-normal"
              style={{ fontFamily: 'var(--font-serif-alt)', letterSpacing: '-0.5px' }}
            >
              One login.<br />
              <em style={{ color: 'var(--color-brand-accent)' }}>Every retail tool</em><br />
              you need.
            </h1>

            <p className="text-sm text-white/55 leading-relaxed max-w-sm mb-8 font-normal">
              Ginesys One connects and empowers your entire retail operation, from order
              management and ERP to point of sale, under a single unified identity.
            </p>

            {/* Feature pills */}
            <div className="flex gap-5 px-4 py-2.5 rounded-md" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { icon: 'shield', label: 'SSO & 2FA' },
                { icon: 'users', label: 'Team controls' },
                { icon: 'monitor', label: 'Device Independent' },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-white/50">
                  <svg width="14" height="14" fill="none" strokeWidth="2" viewBox="0 0 24 24" style={{ stroke: 'var(--color-brand-accent-dim)' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs text-white/60 leading-relaxed italic mb-2.5">
              "Ginesys One made managing our 60-store retail chain dramatically simpler.
              One login, one team, everything connected."
            </p>
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold"
                style={{ background: 'var(--gradient-avatar-primary)' }}
              >
                EF
              </div>
              <div>
                <div className="text-xs font-semibold text-white/70">Esther Fashions</div>
                <div className="text-[10px] text-white/35">60 stores across India · Ginesys customer since 2019</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div key={view} className="w-full max-w-sm view-in">

          {/* ── View: Login ── */}
          {view === 'login' && <>
            <div className="mb-9"><GinesysLogo /></div>

            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-1" style={{ letterSpacing: '-0.6px' }}>
              Log in to Ginesys One
            </h2>
            <p className="text-sm text-[var(--color-text-placeholder)] mb-7">
              Welcome back. Sign in to access your apps.
            </p>

            {/* Email field */}
            <div className="relative mb-3.5">
              <input
                className="w-full h-14 pt-6 pb-2 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] outline-none transition-all peer focus:border-[var(--color-border-brand)] focus:bg-[var(--color-bg-surface)] focus:shadow-[var(--shadow-focus-brand)]"
                type="text" placeholder=" "
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-placeholder)] pointer-events-none transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-text-brand)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--color-text-brand)]">
                Enter Email
              </label>
              {email && (
                <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]" onClick={() => setEmail('')}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>

            {/* Password field */}
            <div className="relative mb-2">
              <input
                className="w-full h-14 pt-6 pb-2 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] outline-none transition-all peer focus:border-[var(--color-border-brand)] focus:bg-[var(--color-bg-surface)] focus:shadow-[var(--shadow-focus-brand)]"
                type={showPassword ? 'text' : 'password'} placeholder=" "
                value={password} onChange={e => setPassword(e.target.value)}
              />
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-placeholder)] pointer-events-none transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-text-brand)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--color-text-brand)]">
                Enter Password
              </label>
              <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]" onClick={() => setShowPassword(!showPassword)}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {showPassword
                    ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  }
                </svg>
              </button>
            </div>

            <button
              className="w-full h-12 rounded-md text-white text-sm font-semibold mt-2 transition-all active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: email.trim() && password.trim() ? 'var(--color-brand-primary)' : 'var(--color-border-strong)', letterSpacing: '0.02em', transition: 'background 0.15s, opacity 0.15s' }}
              onMouseEnter={e => { if (email.trim() && password.trim()) e.currentTarget.style.background = 'var(--color-brand-primary-hover)' }}
              onMouseLeave={e => { if (email.trim() && password.trim()) e.currentTarget.style.background = 'var(--color-brand-primary)' }}
              onClick={onLogin}
              disabled={!email.trim() || !password.trim()}
            >
              Login
            </button>

            <button onClick={goToForgot} className="block w-full text-center mt-4 text-xs text-[var(--color-text-brand)] hover:text-[var(--color-brand-primary-hover)] transition-colors">
              Forgot password?
            </button>

            <div className="mt-9 flex items-center gap-2 px-3.5 py-3 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] text-xs text-[var(--color-text-tertiary)] leading-relaxed">
              <svg className="shrink-0 text-[var(--color-brand-primary)]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Your session is protected by enterprise SSO and optional two-factor authentication.
            </div>
          </>}

          {/* ── View: Forgot password ── */}
          {view === 'forgot' && <>
            <div className="mb-9"><GinesysLogo /></div>

            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-1" style={{ letterSpacing: '-0.6px' }}>
              Forgot password?
            </h2>
            <p className="text-sm text-[var(--color-text-placeholder)] mb-7">
              Enter your email and we'll send you instructions to reset your Ginesys One password.
            </p>

            {/* Email input */}
            <div className="relative mb-3.5">
              <input
                className="w-full h-14 pt-6 pb-2 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] outline-none transition-all peer focus:border-[var(--color-border-brand)] focus:bg-[var(--color-bg-surface)] focus:shadow-[var(--shadow-focus-brand)]"
                type="email" placeholder=" "
                value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendReset()}
              />
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-placeholder)] pointer-events-none transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-text-brand)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--color-text-brand)]">
                Enter Email
              </label>
              {forgotEmail && (
                <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]" onClick={() => setForgotEmail('')}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>

            <button
              className="w-full h-12 rounded-md text-white text-sm font-semibold mt-2 transition-all active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: forgotEmail.trim() ? 'var(--color-brand-primary)' : 'var(--color-border-strong)', letterSpacing: '0.02em', transition: 'background 0.15s, opacity 0.15s' }}
              onMouseEnter={e => { if (forgotEmail.trim()) e.currentTarget.style.background = 'var(--color-brand-primary-hover)' }}
              onMouseLeave={e => { if (forgotEmail.trim()) e.currentTarget.style.background = 'var(--color-brand-primary)' }}
              onClick={sendReset}
              disabled={!forgotEmail.trim()}
            >
              Send reset link
            </button>

            <button
              className="w-full h-12 rounded-md text-sm font-semibold mt-2 transition-all active:translate-y-0"
              style={{ background: 'transparent', color: 'var(--color-text-secondary)', border: '1.5px solid var(--color-border-default)', letterSpacing: '0.02em' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-border-strong)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-default)')}
              onClick={goToLogin}
            >
              Back to login
            </button>
          </>}

          {/* ── View: Email sent ── */}
          {view === 'sent' && <>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'var(--color-bg-brand-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-1" style={{ letterSpacing: '-0.6px' }}>
              Check your inbox
            </h2>
            <p className="text-sm text-[var(--color-text-placeholder)] mb-1" style={{ lineHeight: 1.65 }}>
              We've sent password reset instructions to
            </p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-7" style={{ wordBreak: 'break-all' }}>
              {forgotEmail}
            </p>

            <button
              className="w-full h-12 rounded-md text-white text-sm font-semibold transition-all active:translate-y-0"
              style={{ background: 'var(--color-brand-primary)', letterSpacing: '0.02em' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-brand-primary-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-brand-primary)')}
              onClick={goToLogin}
            >
              Back to login
            </button>

            <p className="text-center mt-4 text-xs text-[var(--color-text-disabled)]">
              Didn't get it? Check your spam folder.
            </p>
          </>}

        </div>
      </div>
    </div>
  )
}
