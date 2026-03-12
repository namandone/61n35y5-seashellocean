import { useState } from 'react'

interface Props {
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

type Category = 'favorites' | 'all' | 'core' | 'common'

interface App {
  name: string
  category: 'core' | 'common'
  cat: string
  desc: string
  status: 'active' | 'expired' | 'expiring'
  color: string
  icon: React.ReactNode
}

const apps: App[] = [
  {
    name: 'Browntape', category: 'core', cat: 'Order Management',
    desc: 'Manage omnichannel orders, batches, and shipments across all sales channels.',
    status: 'expired', color: '#c9402a',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="#BF1A1A" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10.478 12.285a2.4 2.4 0 01.317-.277c.394-.284 1.02-.608 1.857-.943 1.664-.668 4.039-1.336 6.726-1.836 2.687-.5 5.143-.732 6.936-.708.902.012 1.603.088 2.072.212.186.049.314.1.396.143-.061.07-.162.164-.318.276-.393.284-1.02.608-1.857.943-1.664.667-4.039 1.335-6.726 1.836a47.3 47.3 0 01-2.03.231c-.09-.504-.238-.926-.44-1.257-.27-.441-.679-.776-1.197-.809-.517-.032-.948.249-1.236.62-.289.372-.476.877-.548 1.458l-.08.41a38.7 38.7 0 01-2.354-.008c-.902-.012-1.603-.088-2.072-.212a2.12 2.12 0 01-.423-.143zm6.567-.728c.099.162.199.415.269.783l-.962.114.025-.19c.052-.42.178-.696.295-.847.154-.198.267-.108.373.14zM15.715 13.77l-.116.01a19.4 19.4 0 01-2.57.12c-.886-.012-1.661-.082-2.26-.225l1.385 7.436c.138.134.349.204.526.265.48.165 1.193.298 2.101.37 1.807.142 4.273.032 6.941-.465 2.668-.497 5.008-1.282 6.643-2.066.82-.393 1.438-.774 1.827-1.101.143-.12.314-.262.395-.437L28.89 10.23c-.508.348-1.206.693-2.029 1.024-1.761.706-4.22 1.394-6.962 1.904a60.5 60.5 0 01-4.183.611z" fill="white" />
      </svg>
    )
  },
  {
    name: 'Ginesys ERP', category: 'core', cat: 'Back Office ERP',
    desc: 'Full ERP suite for inventory, production, finance, procurement, and sales.',
    status: 'active', color: '#4f7c3f',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="#4FCA43" />
        <path fillRule="evenodd" clipRule="evenodd" d="M20.066 27.381c5.766 0 10.44-4.674 10.44-10.44 0-2.712-1.033-5.182-2.728-7.038 1.326-.703 2.143-2.173 2.223-2.93.028-.26-.182-.473-.444-.473H20.066c-5.766 0-10.44 4.674-10.44 10.44s4.674 10.44 10.44 10.44zm-6.644-10.44c0-3.67 2.975-6.644 6.644-6.644s6.644 2.975 6.644 6.644-2.975 6.644-6.644 6.644-6.644-2.975-6.644-6.644zm16.215 14.724a1.5 1.5 0 00.242-2.096l-1.12-1.534a1.5 1.5 0 00-1.949-.27 12.6 12.6 0 01-6.944 2.178 12.6 12.6 0 01-6.944-2.178 1.5 1.5 0 00-1.948.27l-1.12 1.534a1.5 1.5 0 00.241 2.096A17.46 17.46 0 0020.066 34.5c3.531 0 6.818-1.042 9.571-2.835z" fill="white" />
      </svg>
    )
  },
  {
    name: 'EaseMyGST', category: 'core', cat: 'GST Compliance',
    desc: 'Automated GST filing, reconciliation, and compliance reporting for India.',
    status: 'expiring', color: '#3b6fd4',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="#448AAD" />
        <path fillRule="evenodd" clipRule="evenodd" d="M20.869 5.572a3.2 3.2 0 010 4.52L13.48 17.48a1.8 1.8 0 000 2.546 1.8 1.8 0 002.546 0l3.563-3.563a3.2 3.2 0 014.52 0 3.2 3.2 0 010 4.52L14.61 29.91 6.094 21.39a5.6 5.6 0 010-7.92L16.35 3.213a3.2 3.2 0 014.52.36z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M34.428 19.131a3.2 3.2 0 010 4.52L24.172 33.906a5.6 5.6 0 01-7.92 0l-4.867-4.867a1.8 1.8 0 010-2.546l1.738-1.738a1.8 1.8 0 012.546 0l2.434 2.433a1.1 1.1 0 001.556 0l7.822-7.822a3.2 3.2 0 014.947.765z" fill="#5FFFE4" />
      </svg>
    )
  },
  {
    name: 'Zwing POS', category: 'core', cat: 'Cloud POS',
    desc: 'Modern cloud point of sale for retail stores with offline capability.',
    status: 'active', color: '#c47d0e',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="#FFCC00" />
        <path d="M13.208 8.302H31.32L24.15 19.245V10.194L11.887 28.68H8.679L17.736 15.094H8.679l4.529-6.792z" fill="white" />
        <path d="M20.755 37.736L31.32 21.887H23.02V13.962L13.208 28.68h7.547v9.056z" fill="white" />
      </svg>
    )
  },
  {
    name: 'CRM', category: 'common', cat: 'Customer Relationship',
    desc: 'Track leads, manage customer lifecycle, and grow retail relationships.',
    status: 'active', color: '#7c4dcc',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#EDE7F6" />
        <path d="M32 31a7 7 0 100-14 7 7 0 000 14z" fill="#7C4DCC" />
        <path d="M19 46c0-7.18 5.82-10 13-10s13 2.82 13 10" stroke="#7C4DCC" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M41 27l1.5 1.5 4-4" stroke="#7C4DCC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'Gift Vouchers', category: 'common', cat: 'Promotions & Rewards',
    desc: 'Issue, track, and redeem gift vouchers and promotional codes in-store.',
    status: 'active', color: '#e91e8c',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#FCE4EC" />
        <rect x="17" y="30" width="30" height="20" rx="3" fill="#E91E8C" />
        <rect x="17" y="24" width="30" height="8" rx="3" fill="#C2185B" />
        <line x1="32" y1="24" x2="32" y2="50" stroke="#FCE4EC" strokeWidth="2" />
        <path d="M32 24c0 0-3.5-5 0-7s3.5 5 0 7z" fill="#FCE4EC" />
        <path d="M32 24c0 0 3.5-5 0-7s-3.5 5 0 7z" fill="#F48FB1" />
      </svg>
    )
  },
  {
    name: 'Wallet Service', category: 'common', cat: 'Digital Wallet & Credits',
    desc: 'Manage customer wallet balances, loyalty credits, and cashback programs.',
    status: 'active', color: '#00897B',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#E0F2F1" />
        <rect x="16" y="24" width="32" height="22" rx="4" fill="#00897B" />
        <rect x="16" y="29" width="32" height="7" fill="#00695C" />
        <circle cx="42" cy="32" r="3.5" fill="#80CBC4" />
        <rect x="20" y="39" width="9" height="3" rx="1.5" fill="#80CBC4" />
      </svg>
    )
  },
  {
    name: 'Connect', category: 'common', cat: 'Data Integration Platform',
    desc: 'Integrate and sync data across your retail stack with no-code pipelines.',
    status: 'active', color: '#E65100',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#FBE9E7" />
        <circle cx="32" cy="32" r="5" fill="#E65100" />
        <circle cx="17" cy="23" r="3.5" fill="#FF8A65" />
        <circle cx="47" cy="23" r="3.5" fill="#FF8A65" />
        <circle cx="17" cy="41" r="3.5" fill="#FF8A65" />
        <circle cx="47" cy="41" r="3.5" fill="#FF8A65" />
        <line x1="20.5" y1="25" x2="28" y2="29.5" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        <line x1="43.5" y1="25" x2="36" y2="29.5" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        <line x1="20.5" y1="39" x2="28" y2="34.5" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        <line x1="43.5" y1="39" x2="36" y2="34.5" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
]

const favorites = new Set(['Browntape', 'Ginesys ERP', 'Zwing POS'])

const StatusBadge = ({ status }: { status: App['status'] }) => {
  if (status === 'expired') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[var(--color-status-danger-bg)] text-[var(--color-status-danger-text)]">
      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      License Expired
    </span>
  )
  if (status === 'expiring') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]">
      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      Expires Soon
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[var(--color-status-active-bg)] text-[var(--color-status-active-text)]">
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      Active
    </span>
  )
}

export default function AppLauncher({ onGoToProfile, onLogout }: Props) {
  const [category, setCategory] = useState<Category>('favorites')
  const [avOpen, setAvOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [showLogout, setShowLogout] = useState(false)

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
      <div className="h-14 bg-white border-b border-[var(--color-border-default)] px-9 flex items-center gap-3.5 shrink-0 z-10 shadow-[0_1px_0_var(--color-border-default)]">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <GinesysLogo />
          <span className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Ginesys One</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Org pill */}
          <div className="flex items-center gap-2 text-[12.5px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] px-3 py-1.5 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--color-text-tertiary)]">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" />
            </svg>
            Esther Fashions
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              style={{ background: 'var(--gradient-avatar-primary)' }}
              onClick={() => setAvOpen(!avOpen)}
            >
              L
            </div>

            {/* Dropdown */}
            {avOpen && (
              <div className="absolute top-[calc(100%+10px)] right-0 w-[230px] bg-white border border-[var(--color-border-default)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] z-50 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-brand-subtle)] border-b border-[var(--color-border-brand-subtle)]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: 'var(--gradient-avatar-primary)' }}>L</div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-primary)]">Laksh Aeterna</div>
                    <span className="text-xs font-bold bg-[var(--color-role-holder-bg)] text-[var(--color-role-holder-text)] rounded-full px-2 py-0.5 mt-1 inline-block">Account Holder</span>
                  </div>
                </div>
                <div className="p-1.5">
                  <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] cursor-pointer hover:bg-[var(--color-bg-subtle)]"
                    onClick={() => { setAvOpen(false); onGoToProfile() }}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[var(--color-text-secondary)]"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Account
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-danger)] cursor-pointer hover:bg-[var(--color-bg-danger)]"
                    onClick={() => { setAvOpen(false); setShowLogout(true) }}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Log out
                  </div>
                </div>
              </div>
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
            <div
              key={app.name}
              onClick={() => launch(app.name)}
              className={`w-[224px] bg-white border border-[var(--color-border-default)] rounded-[18px] p-7 pt-7 pb-5 flex flex-col items-center relative overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 group ${
                app.status === 'expired'
                  ? 'opacity-75 cursor-not-allowed'
                  : 'cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-[var(--color-border-hover)]'
              }`}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-[0.055] pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% -10%, ${app.color} 0%, transparent 65%)` }}
              />

              {/* Arrow on hover */}
              {app.status !== 'expired' && (
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-secondary)]">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </div>
              )}

              <div className="w-16 h-16 rounded-[18px] flex items-center justify-center mb-4 shrink-0 overflow-hidden">
                {app.icon}
              </div>
              <div className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5 text-center" style={{ letterSpacing: '-0.25px' }}>{app.name}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] font-medium text-center mb-3.5">{app.cat}</div>
              <div className="text-[11.5px] text-[var(--color-text-secondary)] text-center leading-relaxed mb-4">{app.desc}</div>
              <div className="mt-auto flex items-center gap-1.5">
                <StatusBadge status={app.status} />
                {app.status === 'expired' && (
                  <span className="text-[10.5px] font-bold text-[var(--color-text-expired)] underline underline-offset-2 cursor-pointer">Renew</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Launch Toast ── */}
      <div className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-sm font-medium shadow-[0_8px_28px_rgba(0,0,0,0.18)] whitespace-nowrap z-[9999] transition-all duration-200 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0">
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        Launching {toast}…
      </div>

      {/* ── Logout Modal ── */}
      {showLogout && (
        <div className="fixed inset-0 z-[200] bg-black/35 backdrop-blur-sm flex items-center justify-center" onClick={() => setShowLogout(false)}>
          <div className="bg-white rounded-[18px] p-8 pb-6 w-[340px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]" onClick={e => e.stopPropagation()}>
            <div className="w-[52px] h-[52px] rounded-2xl bg-[var(--color-bg-danger)] flex items-center justify-center mx-auto mb-4 text-[var(--color-text-danger)]">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            <div className="text-[17px] font-bold text-[var(--color-text-primary)] mb-2" style={{ letterSpacing: '-0.3px' }}>Log out of Ginesys One?</div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">You'll be returned to the login screen. Any unsaved changes will be lost.</div>
            <div className="flex gap-2.5">
              <button className="flex-1 h-10 rounded-xl bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="flex-1 h-10 rounded-xl bg-[var(--color-text-danger)] border-[1.5px] border-[var(--color-text-danger)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-border-danger-hover)] transition-colors" onClick={() => { setShowLogout(false); onLogout() }}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
