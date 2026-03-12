import { useState } from 'react'

interface Props {
  onLogin: () => void
}

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

export default function LoginScreen({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex w-full h-screen">

      {/* ── Left Panel ── */}
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

          <p className="text-sm text-white/55 leading-relaxed max-w-sm mb-8 font-light">
            Ginesys One connects and empowers your entire retail operation, from order
            management and ERP to point of sale, under a single unified identity.
          </p>

          {/* Feature pills */}
          <div className="flex gap-5">
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
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
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

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-9">
            <GinesysLogo />
          </div>

          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-1" style={{ letterSpacing: '-0.6px' }}>
            Log in to Ginesys One
          </h2>
          <p className="text-sm text-[var(--color-text-placeholder)] mb-7">
            Welcome back. Sign in to access your apps.
          </p>

          {/* Email field */}
          <div className="relative mb-3.5">
            <input
              className="w-full h-14 pt-6 pb-2 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-xl bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] outline-none transition-all peer focus:border-[var(--color-border-brand)] focus:bg-[var(--color-bg-surface)] focus:shadow-[var(--shadow-focus-brand)]"
              type="text"
              placeholder=" "
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-placeholder)] pointer-events-none transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-text-brand)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--color-text-brand)]">
              Enter Email
            </label>
            {email && (
              <button
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]"
                onClick={() => setEmail('')}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Password field */}
          <div className="relative mb-2">
            <input
              className="w-full h-14 pt-6 pb-2 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-xl bg-[var(--color-bg-subtle)] text-sm text-[var(--color-text-primary)] outline-none transition-all peer focus:border-[var(--color-border-brand)] focus:bg-[var(--color-bg-surface)] focus:shadow-[var(--shadow-focus-brand)]"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-placeholder)] pointer-events-none transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--color-text-brand)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-[var(--color-text-brand)]">
              Enter Password
            </label>
            <button
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {showPassword
                  ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                  : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                }
              </svg>
            </button>
          </div>

          {/* Login button */}
          <button
            className="w-full h-[50px] rounded-xl text-white text-sm font-semibold mt-2 transition-all hover:-translate-y-px active:translate-y-0"
            style={{ background: 'var(--color-brand-primary)', letterSpacing: '0.02em' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-brand-primary-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-brand-primary)')}
            onClick={onLogin}
          >
            Login
          </button>

          <a href="#" className="block text-center mt-4 text-xs text-[var(--color-text-brand)] hover:text-[var(--color-brand-primary-hover)] transition-colors">
            Forgot password?
          </a>

          {/* Security note */}
          <div className="mt-9 flex items-center gap-2 px-3.5 py-3 rounded-[9px] bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] text-xs text-[var(--color-text-tertiary)] leading-relaxed">
            <svg className="shrink-0 text-[var(--color-brand-primary)]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Your session is protected by enterprise SSO and optional two-factor authentication.
          </div>

        </div>
      </div>
    </div>
  )
}
