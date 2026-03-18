import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AvatarDropdown } from './AvatarDropdown'
import { EnterpriseSwitcher, ENTERPRISES } from '../shared/EnterpriseSwitcher'

interface Props {
  enterprise: string
  onSwitchEnterprise: (name: string) => void
  onGoToProfile: () => void
  onLogout: () => void
}

const GinesysLogo = () => (
  <svg width="44" height="25" viewBox="0 0 173 100" fill="none">
    <defs>
      <linearGradient id="grad-launcher" x1="36.49" y1="13.73" x2="76.41" y2="69.50" gradientUnits="userSpaceOnUse">
        <stop offset="0.162" stopColor="#4FCA43" />
        <stop offset="0.878" stopColor="#415549" />
      </linearGradient>
    </defs>
    <path d="M9.5 50C9.5 28.13 27.21 10.4 49.05 10.4C60.03 10.4 68.23 14.55 74.59 21.61C80.83 28.55 85.22 38.22 88.91 49.19C92.54 59.98 96.65 68.84 102.19 74.99C107.62 81.03 114.48 84.52 123.95 84.52C142.13 84.52 157.03 70.42 158.33 52.54H123.95C122.54 52.54 121.41 51.4 121.41 50C121.41 48.6 122.54 47.46 123.95 47.46H160.96C162.36 47.46 163.5 48.6 163.5 50C163.5 71.87 145.79 89.6 123.95 89.6C112.97 89.6 104.77 85.45 98.41 78.39C92.17 71.45 87.78 61.78 84.09 50.81C80.46 40.02 76.35 31.16 70.81 25.01C65.38 18.97 58.53 15.48 49.05 15.48C30.02 15.48 14.58 30.93 14.58 50C14.58 69.07 30.02 84.52 49.05 84.52L49.6 84.52C60.92 84.35 70.94 78.69 77.1 70.07L77.18 69.97C78.02 68.92 79.54 68.69 80.65 69.48C81.79 70.3 82.05 71.89 81.23 73.03L80.89 73.49C73.75 83.18 62.29 89.5 49.37 89.6L49.05 89.6C27.21 89.6 9.5 71.87 9.5 50Z" fill="#4FCA43" />
    <path d="M123.95 10.4C137.01 10.4 148.59 16.74 155.79 26.51L156.13 26.97L156.21 27.08C156.93 28.21 156.65 29.73 155.54 30.52C154.44 31.31 152.91 31.08 152.08 30.03L152 29.93L151.7 29.52C145.42 20.99 135.33 15.48 123.95 15.48C112.39 15.48 102.15 21.17 95.89 29.93L95.81 30.03C94.98 31.08 93.45 31.31 92.35 30.52C91.21 29.7 90.94 28.12 91.76 26.97L92.1 26.51C99.3 16.74 110.88 10.4 123.95 10.4Z" fill="#415549" />
    <path d="M49.05 10.4C27.21 10.4 9.5 28.13 9.5 50C9.5 71.87 27.21 89.6 49.05 89.6L49.37 89.6C62.29 89.5 73.75 83.18 80.89 73.49L81.23 73.03C82.05 71.89 81.79 70.3 80.65 69.48C79.54 68.69 78.02 68.92 77.18 69.97L77.1 70.07C70.94 78.69 60.92 84.35 49.6 84.52L49.05 84.52C30.02 84.52 14.58 69.07 14.58 50C14.58 30.93 30.02 15.48 49.05 15.48V10.4Z" fill="url(#grad-launcher)" />
  </svg>
)

const icon = (file: string) => `${import.meta.env.BASE_URL}icons/${file}`

type Category = 'favorites' | 'all' | 'core' | 'common'

interface App {
  name: string
  category: 'core' | 'common'
  cat: string
  desc: string
  status: 'active' | 'expired' | 'expiring'
  color: string
  icon: string
}

const apps: App[] = [
  {
    name: 'Browntape', category: 'core', cat: 'Order Management',
    desc: 'Manage omnichannel orders, batches, and shipments across all sales channels.',
    status: 'expired', color: '#c9402a',
    icon: icon('browntape.png'),
  },
  {
    name: 'Ginesys ERP', category: 'core', cat: 'Back Office ERP',
    desc: 'Full ERP suite for inventory, production, finance, procurement, and sales.',
    status: 'active', color: '#4f7c3f',
    icon: icon('ginesys-erp.png'),
  },
  {
    name: 'EaseMyGST', category: 'core', cat: 'GST Compliance',
    desc: 'Automated GST filing, reconciliation, and compliance reporting for India.',
    status: 'expiring', color: '#3b6fd4',
    icon: icon('emg.png'),
  },
  {
    name: 'Zwing POS', category: 'core', cat: 'Cloud POS',
    desc: 'Modern cloud point of sale for retail stores with offline capability.',
    status: 'active', color: '#c47d0e',
    icon: icon('zwing.png'),
  },
  {
    name: 'CRM', category: 'common', cat: 'Customer Relationship',
    desc: 'Track leads, manage customer lifecycle, and grow retail relationships.',
    status: 'active', color: '#7c4dcc',
    icon: icon('crm.png'),
  },
  {
    name: 'Gift Vouchers', category: 'common', cat: 'Promotions & Rewards',
    desc: 'Issue, track, and redeem gift vouchers and promotional codes in-store.',
    status: 'active', color: '#e91e8c',
    icon: icon('gift-voucher.png'),
  },
  {
    name: 'Wallet Service', category: 'common', cat: 'Digital Wallet & Credits',
    desc: 'Manage customer wallet balances, loyalty credits, and cashback programs.',
    status: 'active', color: '#00897B',
    icon: icon('wallet.png'),
  },
  {
    name: 'Connect', category: 'common', cat: 'Data Integration Platform',
    desc: 'Integrate and sync data across your retail stack with no-code pipelines.',
    status: 'active', color: '#E65100',
    icon: icon('in.png'),
  },
]

const favorites = new Set(['Browntape', 'Ginesys ERP', 'Zwing POS'])


export default function AppLauncher({ enterprise, onSwitchEnterprise, onGoToProfile, onLogout }: Props) {
  const [category, setCategory] = useState<Category>('favorites')
  const [avOpen, setAvOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [showLogout, setShowLogout] = useState(false)
  const [showEntSwitcher, setShowEntSwitcher] = useState(false)
  const [entToast, setEntToast] = useState<string | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  // Show toast when returning from ProfileScreen after a switch
  useEffect(() => {
    const switched = (location.state as { enterpriseSwitched?: string } | null)?.enterpriseSwitched
    if (switched) {
      setEntToast(switched)
      setTimeout(() => setEntToast(null), 3000)
      // Clear state so re-visiting doesn't re-trigger
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [])

  const handleEnterpriseSwitch = (name: string) => {
    onSwitchEnterprise(name)
    setShowEntSwitcher(false)
    setEntToast(name)
    setTimeout(() => setEntToast(null), 3000)
  }

  const filtered = apps.filter(app => {
    if (category === 'all') return true
    if (category === 'favorites') return favorites.has(app.name)
    return app.category === category
  })

  const launch = (name: string) => {
    if (apps.find(a => a.name === name)?.status === 'expired') return
    setToast(name)
    setTimeout(() => setToast(null), 2800)
  }

  const categories: { key: Category; label: string }[] = [
    { key: 'favorites', label: '⭐ Favorites' },
    { key: 'all', label: 'All Apps' },
    { key: 'core', label: 'Core Apps' },
    { key: 'common', label: 'Common Services' },
  ]

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--gradient-bg-launcher)' }}>

      {/* ── Topbar ── */}
      <div className="h-14 bg-white/[0.82] backdrop-blur-md px-9 flex items-center gap-3.5 shrink-0 z-10 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <GinesysLogo />
          <span className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Ginesys One</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Org pill */}
          {(() => {
            const ent = ENTERPRISES.find(e => e.name === enterprise)
            return (
              <button
                onClick={() => setShowEntSwitcher(true)}
                className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-strong)] pl-1.5 pr-3 py-1 rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                {ent && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: ent.color, fontSize: '9px', fontWeight: 700, letterSpacing: 0 }}
                  >
                    {ent.initial}
                  </div>
                )}
                {enterprise}
                <svg aria-hidden="true" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-50 shrink-0">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )
          })()}

          {/* Avatar */}
          <div className="relative">
            <button
              aria-label="Open account menu"
              aria-expanded={avOpen}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              style={{ background: 'var(--gradient-avatar-primary)' }}
              onClick={() => setAvOpen(!avOpen)}
            >
              L
            </button>

            {/* Dropdown */}
            {avOpen && (
              <AvatarDropdown
                name="Laksh Aeterna"
                roleLabel="Account Holder"
                roleBg="var(--color-role-holder-bg)"
                roleText="var(--color-role-holder-text)"
                items={[
                  {
                    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
                    label: 'Account',
                    onClick: () => { setAvOpen(false); onGoToProfile() },
                  },
                  {
                    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
                    label: 'Log out',
                    danger: true,
                    onClick: () => { setAvOpen(false); setShowLogout(true) },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-6 py-12">
        <p className="text-xs font-medium text-[var(--color-text-tertiary)] tracking-wide mb-1.5">Good morning, Laksh 👋</p>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8" style={{ letterSpacing: '-0.7px' }}>Where would you like to go?</h1>

        {/* Category pills */}
        <div className="flex gap-1.5 mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                category === key
                  ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)] font-semibold'
                  : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-[var(--color-text-disabled)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* App grid */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1020px]">
          {filtered.map(app => (
            <button
              key={app.name}
              onClick={() => launch(app.name)}
              disabled={app.status === 'expired'}
              className={`w-[224px] bg-white rounded-[var(--radius-xl)] p-7 pt-7 pb-5 flex flex-col items-center relative overflow-hidden shadow-[var(--shadow-sm)] transition-all duration-200 group text-left ${
                app.status === 'expired'
                  ? 'opacity-75 cursor-not-allowed'
                  : 'cursor-pointer hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]'
              }`}
            >
              {/* Background glow — uniform brand, scales cleanly at any catalog size */}
              {app.status !== 'expired' && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(79,124,63,0.07) 0%, transparent 65%)' }}
                />
              )}

              {/* Status overlay badge — expired / expiring only */}
              {app.status === 'expired' && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--color-status-danger-bg)] text-[var(--color-status-danger-text)]">Expired 3d ago</span>
              )}
              {app.status === 'expiring' && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]">Expires in 10d</span>
              )}

              {/* Arrow on hover — active only */}
              {app.status === 'active' && (
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-secondary)]">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </div>
              )}

              <div className="w-16 h-16 rounded-full mb-4 shrink-0 overflow-hidden">
                <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-base font-medium text-[var(--color-text-primary)] mb-0.5 text-center" style={{ letterSpacing: '-0.25px' }}>{app.name}</div>
              <div className="text-xs font-normal text-[var(--color-text-tertiary)] text-center mb-3.5">{app.cat}</div>
              <div className="text-xs font-normal text-[var(--color-text-secondary)] text-center leading-relaxed">{app.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Enterprise Switch Toast ── */}
      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9998] transition-all duration-200 ${entToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-md bg-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
          <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        Switched to {entToast}
      </div>

      {/* ── Launch Toast ── */}
      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9999] transition-all duration-200 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0">
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        Launching {toast}…
      </div>

      {/* ── Enterprise Switcher ── */}
      {showEntSwitcher && (
        <EnterpriseSwitcher
          enterprise={enterprise}
          onSwitch={handleEnterpriseSwitch}
          onClose={() => setShowEntSwitcher(false)}
        />
      )}

      {/* ── Logout Modal ── */}
      {showLogout && (
        <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[1px] flex items-center justify-center" onClick={() => setShowLogout(false)}>
          <div className="bg-white p-8 pb-6 w-[340px] text-center shadow-[var(--shadow-xl)]" style={{ borderRadius: 'var(--radius-2xl)' }} onClick={e => e.stopPropagation()}>
            <div className="w-[52px] h-[52px] rounded-2xl bg-[var(--color-bg-danger)] flex items-center justify-center mx-auto mb-4 text-[var(--color-text-danger)]">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mb-2" style={{ letterSpacing: '-0.3px' }}>Log out of Ginesys One?</div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">You'll be returned to the login screen. Any unsaved changes will be lost.</div>
            <div className="flex gap-2.5">
              <button className="flex-1 h-10 rounded-md bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="flex-1 h-10 rounded-md bg-[var(--color-text-danger)] border-[1.5px] border-[var(--color-text-danger)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-border-danger-hover)] transition-colors" onClick={() => { setShowLogout(false); onLogout() }}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
