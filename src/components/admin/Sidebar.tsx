const GinesysLogo = () => (
  <svg width="44" height="25" viewBox="0 0 173 100" fill="none">
    <defs>
      <linearGradient id="grad-admin" x1="36.49" y1="13.73" x2="76.41" y2="69.50" gradientUnits="userSpaceOnUse">
        <stop offset="0.162" stopColor="#4FCA43" />
        <stop offset="0.878" stopColor="#415549" />
      </linearGradient>
    </defs>
    <path d="M9.5 50C9.5 28.13 27.21 10.4 49.05 10.4C60.03 10.4 68.23 14.55 74.59 21.61C80.83 28.55 85.22 38.22 88.91 49.19C92.54 59.98 96.65 68.84 102.19 74.99C107.62 81.03 114.48 84.52 123.95 84.52C142.13 84.52 157.03 70.42 158.33 52.54H123.95C122.54 52.54 121.41 51.4 121.41 50C121.41 48.6 122.54 47.46 123.95 47.46H160.96C162.36 47.46 163.5 48.6 163.5 50C163.5 71.87 145.79 89.6 123.95 89.6C112.97 89.6 104.77 85.45 98.41 78.39C92.17 71.45 87.78 61.78 84.09 50.81C80.46 40.02 76.35 31.16 70.81 25.01C65.38 18.97 58.53 15.48 49.05 15.48C30.02 15.48 14.58 30.93 14.58 50C14.58 69.07 30.02 84.52 49.05 84.52L49.6 84.52C60.92 84.35 70.94 78.69 77.1 70.07L77.18 69.97C78.02 68.92 79.54 68.69 80.65 69.48C81.79 70.3 82.05 71.89 81.23 73.03L80.89 73.49C73.75 83.18 62.29 89.5 49.37 89.6L49.05 89.6C27.21 89.6 9.5 71.87 9.5 50Z" fill="#4FCA43" />
    <path d="M123.95 10.4C137.01 10.4 148.59 16.74 155.79 26.51L156.13 26.97L156.21 27.08C156.93 28.21 156.65 29.73 155.54 30.52C154.44 31.31 152.91 31.08 152.08 30.03L152 29.93L151.7 29.52C145.42 20.99 135.33 15.48 123.95 15.48C112.39 15.48 102.15 21.17 95.89 29.93L95.81 30.03C94.98 31.08 93.45 31.31 92.35 30.52C91.21 29.7 90.94 28.12 91.76 26.97L92.1 26.51C99.3 16.74 110.88 10.4 123.95 10.4Z" fill="#415549" />
    <path d="M49.05 10.4C27.21 10.4 9.5 28.13 9.5 50C9.5 71.87 27.21 89.6 49.05 89.6L49.37 89.6C62.29 89.5 73.75 83.18 80.89 73.49L81.23 73.03C82.05 71.89 81.79 70.3 80.65 69.48C79.54 68.69 78.02 68.92 77.18 69.97L77.1 70.07C70.94 78.69 60.92 84.35 49.6 84.52L49.05 84.52C30.02 84.52 14.58 69.07 14.58 50C14.58 30.93 30.02 15.48 49.05 15.48V10.4Z" fill="url(#grad-admin)" />
  </svg>
)

type NavItem = 'enterprises' | 'users' | 'app-instances'

interface Props {
  active: NavItem
  onNavigate: (item: NavItem) => void
}

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  {
    id: 'enterprises',
    label: 'Enterprises',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path d="M3 21h18M9 21V7l6-4v18M9 10H6a1 1 0 00-1 1v10M15 10h3a1 1 0 011 1v10" />
      </svg>
    ),
  },
  {
    id: 'users',
    label: 'Users',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: 'app-instances',
    label: 'App Instances',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
]

export default function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside className="w-[220px] shrink-0 h-screen bg-white border-r border-[var(--color-border-muted)] flex flex-col">

      {/* Logo */}
      <div className="px-4 pt-5 pb-6 flex items-center gap-2.5">
        <GinesysLogo />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.2px' }}>Admin Panel</span>
          <span className="text-[10px] font-medium text-[var(--color-text-tertiary)]">by Ginesys One</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] px-2 mb-2">Core</div>
        <div className="flex flex-col gap-0.5">
          {navItems.map(({ id, label, icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center gap-2.5 px-2 py-2.5 rounded-md text-sm font-medium text-left cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? 'bg-[var(--color-bg-brand-subtle)] text-[var(--color-text-brand)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {icon}
                {label}
              </button>
            )
          })}
        </div>
      </nav>

    </aside>
  )
}
