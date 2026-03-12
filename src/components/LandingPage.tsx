import { useState } from 'react'

interface Props {
  onLaunchSSO: () => void
}

const GinesysLogo = () => (
  <svg width="28" height="16" viewBox="0 0 173 100" fill="none">
    <defs>
      <linearGradient id="grad-vision" x1="36.49" y1="13.73" x2="76.41" y2="69.50" gradientUnits="userSpaceOnUse">
        <stop offset="0.162" stopColor="#4FCA43"/>
        <stop offset="0.878" stopColor="#415549"/>
      </linearGradient>
    </defs>
    <path d="M9.5 50C9.5 28.13 27.21 10.4 49.05 10.4C60.03 10.4 68.23 14.55 74.59 21.61C80.83 28.55 85.22 38.22 88.91 49.19C92.54 59.98 96.65 68.84 102.19 74.99C107.62 81.03 114.48 84.52 123.95 84.52C142.13 84.52 157.03 70.42 158.33 52.54H123.95C122.54 52.54 121.41 51.4 121.41 50C121.41 48.6 122.54 47.46 123.95 47.46H160.96C162.36 47.46 163.5 48.6 163.5 50C163.5 71.87 145.79 89.6 123.95 89.6C112.97 89.6 104.77 85.45 98.41 78.39C92.17 71.45 87.78 61.78 84.09 50.81C80.46 40.02 76.35 31.16 70.81 25.01C65.38 18.97 58.53 15.48 49.05 15.48C30.02 15.48 14.58 30.93 14.58 50C14.58 69.07 30.02 84.52 49.05 84.52L49.6 84.52C60.92 84.35 70.94 78.69 77.1 70.07L77.18 69.97C78.02 68.92 79.54 68.69 80.65 69.48C81.79 70.3 82.05 71.89 81.23 73.03L80.89 73.49C73.75 83.18 62.29 89.5 49.37 89.6L49.05 89.6C27.21 89.6 9.5 71.87 9.5 50Z" fill="#4FCA43"/>
    <path d="M123.95 10.4C137.01 10.4 148.59 16.74 155.79 26.51L156.13 26.97L156.21 27.08C156.93 28.21 156.65 29.73 155.54 30.52C154.44 31.31 152.91 31.08 152.08 30.03L152 29.93L151.7 29.52C145.42 20.99 135.33 15.48 123.95 15.48C112.39 15.48 102.15 21.17 95.89 29.93L95.81 30.03C94.98 31.08 93.45 31.31 92.35 30.52C91.21 29.7 90.94 28.12 91.76 26.97L92.1 26.51C99.3 16.74 110.88 10.4 123.95 10.4Z" fill="#415549"/>
    <path d="M49.05 10.4C27.21 10.4 9.5 28.13 9.5 50C9.5 71.87 27.21 89.6 49.05 89.6L49.37 89.6C62.29 89.5 73.75 83.18 80.89 73.49L81.23 73.03C82.05 71.89 81.79 70.3 80.65 69.48C79.54 68.69 78.02 68.92 77.18 69.97L77.1 70.07C70.94 78.69 60.92 84.35 49.6 84.52L49.05 84.52C30.02 84.52 14.58 69.07 14.58 50C14.58 30.93 30.02 15.48 49.05 15.48V10.4Z" fill="url(#grad-vision)"/>
  </svg>
)

interface Item {
  id: string
  title: string
  description: string
  section: 'core' | 'prototypes'
  status: 'live' | 'coming-soon'
  onClick?: () => void
}

export default function LandingPage({ onLaunchSSO }: Props) {
  const [query, setQuery] = useState('')

  const items: Item[] = [
    {
      id: 'sso',
      title: 'Ginesys One — SSO Launcher',
      description: 'Unified login, app launcher, and account management for the Ginesys One platform.',
      section: 'prototypes',
      status: 'live',
      onClick: onLaunchSSO,
    },
    {
      id: 'design-system',
      title: 'Design System',
      description: 'Component library, tokens, and usage guidelines for Ginesys One product surfaces.',
      section: 'core',
      status: 'coming-soon',
    },
    {
      id: 'design-guidelines',
      title: 'Design Guidelines',
      description: 'Principles, patterns, and standards that guide design decisions across Ginesys products.',
      section: 'core',
      status: 'coming-soon',
    },
  ]

  const q = query.toLowerCase()
  const filtered = items.filter(i =>
    !q ||
    i.title.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q)
  )

  const prototypes = filtered.filter(i => i.section === 'prototypes')
  const core       = filtered.filter(i => i.section === 'core')
  const noResults  = filtered.length === 0

  const SectionLabel = ({ label }: { label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
    </div>
  )

  const Row = ({ item }: { item: Item }) => {
    const [hovered, setHovered] = useState(false)
    const isLive = item.status === 'live'

    return (
      <div
        onClick={isLive ? item.onClick : undefined}
        onMouseEnter={() => isLive && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 18px',
          cursor: isLive ? 'pointer' : 'default',
          background: hovered ? 'var(--color-bg-subtle)' : 'transparent',
          transition: 'background 0.12s',
        }}
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 16, fontWeight: 500,
            color: isLive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            letterSpacing: '-0.2px', marginBottom: 3,
          }}>
            {item.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
            {item.description}
          </div>
        </div>

        {/* Open arrow — live items only */}
        {isLive && (
          <div style={{
            flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 12, fontWeight: 600, color: 'var(--color-text-brand)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.12s',
          }}>
            Open
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-page)', fontFamily: 'var(--font-sans)' }}>

      {/* Topbar */}
      <header style={{
        height: 52, borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex', alignItems: 'center',
        padding: '0 32px', background: 'var(--color-bg-page)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <GinesysLogo />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)' }}>Ginesys</span>
          <span style={{ color: 'var(--color-separator)', fontSize: 14, margin: '0 1px' }}>/</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--color-text-primary)', fontStyle: 'italic' }}>Vision</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-brand-primary)' }} />
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Internal · Design Playground</span>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px 100px' }}>

        {/* Heading */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36, fontWeight: 400,
            color: 'var(--color-text-primary)', letterSpacing: '-0.8px',
            lineHeight: 1.15, margin: '0 0 12px',
          }}>
            The design playground<br />
            <em style={{ color: 'var(--color-text-brand)' }}>for new ideas.</em>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0, maxWidth: 420 }}>
            Early-stage workflows, interaction concepts, and explorations — before they become product.
          </p>
        </div>

        {/* Search bar */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 9,
            border: '1.5px solid var(--color-border-default)', borderRadius: 11,
            padding: '0 13px', height: 40, background: 'var(--color-bg-surface)',
            marginBottom: 40,
          }}
          onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--color-border-brand)')}
          onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--color-border-default)')}
        >
          <svg width="13" height="13" fill="none" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, stroke: 'var(--color-text-disabled)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, prototypes, tags…"
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 14, color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-disabled)', padding: 0, fontSize: 17, lineHeight: 1 }}
            >×</button>
          )}
        </div>

        {/* List */}
        {noResults ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-border-strong)', fontSize: 13 }}>
            No results for "<span style={{ color: 'var(--color-text-secondary)' }}>{query}</span>"
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Prototypes */}
            {prototypes.length > 0 && (
              <div>
                <SectionLabel label="Prototypes" />
                <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: 12, overflow: 'hidden', background: 'var(--color-bg-surface)' }}>
                  {prototypes.map((item, i) => (
                    <div key={item.id}>
                      {i > 0 && <div style={{ height: 1, background: 'var(--color-bg-muted)', margin: '0 14px' }} />}
                      <Row item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core */}
            {core.length > 0 && (
              <div>
                <SectionLabel label="Core" />
                <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: 12, overflow: 'hidden', background: 'var(--color-bg-surface)' }}>
                  {core.map((item, i) => (
                    <div key={item.id}>
                      {i > 0 && <div style={{ height: 1, background: 'var(--color-bg-muted)', margin: '0 14px' }} />}
                      <Row item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border-subtle)', padding: '14px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>© 2026 Ginesys One · Internal use only</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Ginesys Vision</span>
      </footer>
    </div>
  )
}
