import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AvatarDropdown } from './AvatarDropdown'
import { FieldLabel } from '../shared/FieldLabel'
import { EnterpriseSwitcher, ENTERPRISES } from '../shared/EnterpriseSwitcher'
import { LoginHistoryDrawer } from './LoginHistoryDrawer'
import { AddMemberDrawer, type NewMember } from './AddMemberDrawer'
import { EditMemberDrawer, type MemberToEdit } from './EditMemberDrawer'
import { UserDetailsDrawer, type UserDetail } from './UserDetailsDrawer'

interface Props {
  enterprise: string
  onSwitchEnterprise: (name: string) => void
  onBack: () => void
  onLogout: () => void
}

type ProfileTab = 'profile' | 'enterprise' | 'team'

const GinesysLogo = () => (
  <svg width="44" height="25" viewBox="0 0 173 100" fill="none">
    <defs>
      <linearGradient id="grad-profile" x1="36.49" y1="13.73" x2="76.41" y2="69.50" gradientUnits="userSpaceOnUse">
        <stop offset="0.162" stopColor="#4FCA43" />
        <stop offset="0.878" stopColor="#415549" />
      </linearGradient>
    </defs>
    <path d="M9.5 50C9.5 28.13 27.21 10.4 49.05 10.4C60.03 10.4 68.23 14.55 74.59 21.61C80.83 28.55 85.22 38.22 88.91 49.19C92.54 59.98 96.65 68.84 102.19 74.99C107.62 81.03 114.48 84.52 123.95 84.52C142.13 84.52 157.03 70.42 158.33 52.54H123.95C122.54 52.54 121.41 51.4 121.41 50C121.41 48.6 122.54 47.46 123.95 47.46H160.96C162.36 47.46 163.5 48.6 163.5 50C163.5 71.87 145.79 89.6 123.95 89.6C112.97 89.6 104.77 85.45 98.41 78.39C92.17 71.45 87.78 61.78 84.09 50.81C80.46 40.02 76.35 31.16 70.81 25.01C65.38 18.97 58.53 15.48 49.05 15.48C30.02 15.48 14.58 30.93 14.58 50C14.58 69.07 30.02 84.52 49.05 84.52L49.6 84.52C60.92 84.35 70.94 78.69 77.1 70.07L77.18 69.97C78.02 68.92 79.54 68.69 80.65 69.48C81.79 70.3 82.05 71.89 81.23 73.03L80.89 73.49C73.75 83.18 62.29 89.5 49.37 89.6L49.05 89.6C27.21 89.6 9.5 71.87 9.5 50Z" fill="#4FCA43" />
    <path d="M123.95 10.4C137.01 10.4 148.59 16.74 155.79 26.51L156.13 26.97L156.21 27.08C156.93 28.21 156.65 29.73 155.54 30.52C154.44 31.31 152.91 31.08 152.08 30.03L152 29.93L151.7 29.52C145.42 20.99 135.33 15.48 123.95 15.48C112.39 15.48 102.15 21.17 95.89 29.93L95.81 30.03C94.98 31.08 93.45 31.31 92.35 30.52C91.21 29.7 90.94 28.12 91.76 26.97L92.1 26.51C99.3 16.74 110.88 10.4 123.95 10.4Z" fill="#415549" />
    <path d="M49.05 10.4C27.21 10.4 9.5 28.13 9.5 50C9.5 71.87 27.21 89.6 49.05 89.6L49.37 89.6C62.29 89.5 73.75 83.18 80.89 73.49L81.23 73.03C82.05 71.89 81.79 70.3 80.65 69.48C79.54 68.69 78.02 68.92 77.18 69.97L77.1 70.07C70.94 78.69 60.92 84.35 49.6 84.52L49.05 84.52C30.02 84.52 14.58 69.07 14.58 50C14.58 30.93 30.02 15.48 49.05 15.48V10.4Z" fill="url(#grad-profile)" />
  </svg>
)

// ── Team data ──
const members: UserDetail[] = [
  { name: 'Laksh Aeterna',   you: true,  email: 'laksh@rfad.com',              role: 'holder', av: 'L', color: 'linear-gradient(135deg,#6dbb5a,#4f7c3f)' },
  { name: 'Aniket Mansell',  you: false, email: 'aniket@retailwithesther.in',   role: 'member', av: 'A', color: 'linear-gradient(135deg,#5a8fe8,#3b6fd4)' },
  { name: 'Priya Sharma',    you: false, email: 'priya@retailwithesther.in',    role: 'admin',  av: 'P', color: 'linear-gradient(135deg,#e87a5a,#c95032)' },
  { name: 'Sameer Overture', you: false, email: 'sameer@retailwithesther.in',   role: 'member', av: 'S', color: 'linear-gradient(135deg,#5abce8,#2d7fb3)' },
  { name: 'Meera Gupta',     you: false, email: 'meera@retailwithesther.in',    role: 'member', av: 'M', color: 'linear-gradient(135deg,#e8a85a,#b37020)' },
  { name: 'Ravi Kumar',      you: false, email: 'ravi@retailwithesther.in',     role: 'member', av: 'R', color: 'linear-gradient(135deg,#8a5ae8,#5a2db3)' },
  { name: 'Sunita Patel',    you: false, email: 'sunita@retailwithesther.in',   role: 'member', av: 'S', color: 'linear-gradient(135deg,#5ae8b5,#2db37a)' },
]

const AVATAR_COLORS = [
  'linear-gradient(135deg,#6dbb5a,#4f7c3f)',
  'linear-gradient(135deg,#5a8fe8,#3b6fd4)',
  'linear-gradient(135deg,#e87a5a,#c95032)',
  'linear-gradient(135deg,#5abce8,#2d7fb3)',
  'linear-gradient(135deg,#e8a85a,#b37020)',
  'linear-gradient(135deg,#8a5ae8,#5a2db3)',
  'linear-gradient(135deg,#5ae8b5,#2db37a)',
]

const roleLbl: Record<string, string> = { holder: 'Account Holder', member: 'Member', admin: 'Admin' }
const roleCls: Record<string, string> = {
  holder: 'bg-[var(--color-role-holder-bg)] text-[var(--color-role-holder-text)]',
  member: 'bg-[var(--color-role-member-bg)] text-[var(--color-role-member-text)]',
  admin:  'bg-[var(--color-role-admin-bg)] text-[var(--color-role-admin-text)]',
}

// ── App access helpers (mirrors UserDetailsDrawer) ──
const icon = (file: string) => `${import.meta.env.BASE_URL}icons/${file}`
const APP_INSTANCES = [
  { app: 'Browntape',      slug: 'browntape', icon: icon('browntape.png')    },
  { app: 'Ginesys ERP',    slug: 'erp',       icon: icon('ginesys-erp.png')  },
  { app: 'EaseMyGST',      slug: 'emg',       icon: icon('emg.png')          },
  { app: 'Zwing POS',      slug: 'zwing',     icon: icon('zwing.png')        },
  { app: 'CRM',            slug: 'crm',       icon: icon('crm.png')          },
  { app: 'Gift Vouchers',  slug: 'gifts',     icon: icon('gift-voucher.png') },
  { app: 'Wallet Service', slug: 'wallet',    icon: icon('wallet.png')       },
  { app: 'Connect',        slug: 'connect',   icon: icon('in.png')           },
].map(a => ({
  ...a,
  instances: [
    { id: `${a.slug}-prod`,    name: 'Production', url: `production.${a.slug}.ginesys.one` },
    { id: `${a.slug}-staging`, name: 'Staging',    url: `staging.${a.slug}.ginesys.one`    },
    { id: `${a.slug}-uat`,     name: 'UAT',        url: `uat.${a.slug}.ginesys.one`         },
  ],
}))

function seedInstances(name: string): Set<string> {
  const seed = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const appCount = 1 + (seed % 5)
  const picked: number[] = []
  for (let i = 0; picked.length < appCount; i++) {
    const ai = (seed + i * 31) % 8
    if (!picked.includes(ai)) picked.push(ai)
  }
  const ids: string[] = []
  picked.forEach((ai, i) => {
    const instCount = 1 + ((seed + i) % 2)
    for (let j = 0; j < instCount; j++) {
      ids.push(APP_INSTANCES[ai].instances[(seed + i + j) % 3].id)
    }
  })
  return new Set(ids)
}

const timezones = [
  'GMT -12:00 — International Date Line West', 'GMT -11:00 — Samoa Standard Time',
  'GMT -10:00 — Hawaii Standard Time',         'GMT -08:00 — Pacific Standard Time',
  'GMT -07:00 — Mountain Standard Time',       'GMT -06:00 — Central Standard Time',
  'GMT -05:00 — Eastern Standard Time',        'GMT -03:00 — Buenos Aires Time',
  'GMT +00:00 — Greenwich Mean Time',          'GMT +01:00 — Central European Time',
  'GMT +02:00 — Eastern European Time',        'GMT +03:00 — Moscow Standard Time',
  'GMT +04:00 — Gulf Standard Time',           'GMT +05:00 — Pakistan Standard Time',
  'GMT +05:30 — India Standard Time',          'GMT +05:45 — Nepal Time',
  'GMT +06:00 — Bangladesh Standard Time',     'GMT +07:00 — Indochina Time',
  'GMT +08:00 — China Standard Time',          'GMT +09:00 — Japan Standard Time',
  'GMT +09:30 — Australian Central Time',      'GMT +10:00 — Australian Eastern Time',
  'GMT +12:00 — New Zealand Standard Time',
]

// ── Per-enterprise mock data ──
const ENTERPRISE_DATA: Record<string, {
  tradeName: string; legalName: string; website: string; email: string
  pan: string; cin: string; timezone: string; domains: string[]
}> = {
  'Esther Fashions': {
    tradeName: 'Esther Fashions',     legalName: 'Esther Fashions Private Limited',
    website: '',                       email: 'admin@estherretail.in',
    pan: '',                           cin: '',
    timezone: 'GMT +05:30 — India Standard Time',
    domains: ['rfad.in', 'retailwithesther.com'],
  },
  'Laksh Apparels': {
    tradeName: 'Laksh Apparels',      legalName: 'Laksh Apparels India Private Limited',
    website: 'https://lakshapparels.in', email: 'admin@lakshapparels.in',
    pan: 'AABCL1234P',                cin: 'U17111DL2015PTC280123',
    timezone: 'GMT +05:30 — India Standard Time',
    domains: ['lakshapparels.in'],
  },
  'Aria Retail Co.': {
    tradeName: 'Aria Retail Co.',     legalName: 'Aria Retail Company Private Limited',
    website: 'https://ariaretail.com', email: 'admin@ariaretail.com',
    pan: 'AARCA5678R',                cin: '',
    timezone: 'GMT +05:30 — India Standard Time',
    domains: ['ariaretail.com', 'aria.in'],
  },
}

// ── Reusable section card ──
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-[var(--shadow-sm)] overflow-hidden w-full ${className}`}>{children}</div>
)

export default function ProfileScreen({ enterprise, onSwitchEnterprise, onBack, onLogout }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = (searchParams.get('tab') as ProfileTab) ?? 'profile'
  const setTab = (t: ProfileTab) => setSearchParams({ tab: t }, { replace: true })
  const [avOpen, setAvOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showEntSwitcher, setShowEntSwitcher] = useState(false)

  // ── Change Password panel ──
  const [showPwPanel, setShowPwPanel]   = useState(false)
  const [curPw, setCurPw]               = useState('')
  const [newPw, setNewPw]               = useState('')
  const [confirmPw, setConfirmPw]       = useState('')
  const [showCur, setShowCur]           = useState(false)
  const [showNew, setShowNew]           = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [pwTouched, setPwTouched]       = useState(false)

  const [pwUpdatedToast, setPwUpdatedToast]       = useState(false)
  const [pwDialogCountdown, setPwDialogCountdown] = useState(8)
  const [pwPanelClosing, setPwPanelClosing]       = useState(false)

  useEffect(() => {
    const data = ENTERPRISE_DATA[enterprise]
    if (!data) return
    setTradeName(data.tradeName)
    setLegalName(data.legalName)
    setWebsite(data.website)
    setEntEmail(data.email)
    setPan(data.pan)
    setCin(data.cin)
    setTimezone(data.timezone)
    setDomains(data.domains)
    setEntEditing(false)
  }, [enterprise])

  useEffect(() => {
    if (!pwUpdatedToast) return
    setPwDialogCountdown(8)
    const interval = setInterval(() => {
      setPwDialogCountdown(n => {
        if (n <= 1) { clearInterval(interval); setPwUpdatedToast(false); return 8 }
        return n - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [pwUpdatedToast])

  const closePwPanel = () => {
    setPwPanelClosing(true)
    setTimeout(() => {
      setShowPwPanel(false)
      setPwPanelClosing(false)
      setCurPw(''); setNewPw(''); setConfirmPw('')
      setShowCur(false); setShowNew(false); setShowConfirm(false)
      setPwTouched(false)
    }, 210)
  }

  const submitPwChange = () => {
    closePwPanel()
    setPwUpdatedToast(true)
  }

  const pwLengthOk = newPw.length >= 7 && newPw.length <= 100
  const pwMatchOk  = newPw.length > 0 && newPw === confirmPw

  // ── Login history ──
  const [showLoginHistory, setShowLoginHistory] = useState(false)

  // ── Profile tab state ──
  const [editing, setEditing] = useState(false)
  const [name, setName]         = useState('Laksh Aeterna')
  const [email, setEmail]       = useState('leclerc@scuderia.in')
  const [phone, setPhone]       = useState('(+91) 94500 94500')
  const [username, setUsername] = useState('lakshaeterna')
  const [savedMsg, setSavedMsg] = useState(false)

  // ── Enterprise tab state ──
  const [entEditing, setEntEditing]   = useState(false)
  const [tradeName, setTradeName]     = useState('Esther Fashions')
  const [legalName, setLegalName]     = useState('Esther Fashions Private Limited')
  const [website, setWebsite]         = useState('')
  const [entEmail, setEntEmail]       = useState('admin@estherretail.in')
  const [pan, setPan]                 = useState('')
  const [cin, setCin]                 = useState('')
  const [timezone, setTimezone]       = useState('GMT +05:30 — India Standard Time')
  const [tzSearch, setTzSearch]       = useState('')
  const [tzOpen, setTzOpen]           = useState(false)
  const [entSaved, setEntSaved]       = useState(false)

  // ── Domain policy ──
  const [domains, setDomains]         = useState(['rfad.in', 'retailwithesther.com'])
  const [domainInput, setDomainInput] = useState('')
  const [domainDirty, setDomainDirty] = useState(false)
  const [domainSaved, setDomainSaved] = useState(false)

  // ── Password policy ──
  const [minLen, setMinLen]           = useState(8)
  const [charPills, setCharPills]     = useState([true, false, true, false])
  const [tfa, setTfa]                 = useState(false)
  const [pwDirty, setPwDirty]         = useState(false)
  const [pwSaved, setPwSaved]         = useState(false)

  // ── Team ──
  const [teamMembers, setTeamMembers] = useState(members)
  const [showAddMember, setShowAddMember]         = useState(false)
  const [addMemberToast, setAddMemberToast]       = useState<string | null>(null)
  const [editTarget, setEditTarget]               = useState<MemberToEdit | null>(null)
  const [editMemberToast, setEditMemberToast]     = useState<string | null>(null)
  const [viewTarget, setViewTarget]               = useState<UserDetail | null>(null)
  const [entSwitchToast, setEntSwitchToast]       = useState<string | null>(null)
  const [showPlanLimitToast, setShowPlanLimitToast] = useState(false)
  const [teamSearch, setTeamSearch]   = useState('')
  const [removeToast, setRemoveToast] = useState<string | null>(null)

  const removeUser = (email: string, name: string) => {
    setTeamMembers(prev => prev.filter(m => m.email !== email))
    setRemoveToast(name)
    setTimeout(() => setRemoveToast(null), 2800)
  }

  const handleAddMember = (m: NewMember) => {
    const newMember = {
      name:  `${m.firstName} ${m.lastName}`,
      you:   false,
      email: m.email,
      role:  m.role as 'member' | 'admin',
      av:    m.firstName[0].toUpperCase(),
      color: AVATAR_COLORS[teamMembers.length % AVATAR_COLORS.length],
    }
    setTeamMembers(prev => [...prev, newMember])
    setAddMemberToast(`${m.firstName} ${m.lastName}`)
    setTimeout(() => setAddMemberToast(null), 3000)
  }

  const filteredMembers = teamMembers.filter(m =>
    m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(teamSearch.toLowerCase())
  )

  const saveProfile = () => {
    setEditing(false); setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 3000)
  }

  const saveEnt = () => {
    setEntEditing(false); setEntSaved(true)
    setTimeout(() => setEntSaved(false), 3000)
  }

  const saveDomain = () => {
    setDomainDirty(false); setDomainSaved(true)
    setTimeout(() => setDomainSaved(false), 3000)
  }

  const savePw = () => {
    setPwDirty(false); setPwSaved(true)
    setTimeout(() => setPwSaved(false), 3000)
  }

  const toggleCharPill = (i: number) => {
    setCharPills(p => p.map((v, idx) => idx === i ? !v : v))
    setPwDirty(true)
  }

  const charLabels = [
    { label: 'Lowercase', code: 'a–z' },
    { label: 'Uppercase', code: 'A–Z' },
    { label: 'Numbers',   code: '0–9' },
    { label: 'Special',   code: '!@#$' },
  ]

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-subtle)]">

      {/* ── Header: topbar + tabs as one frosted surface ── */}
      <div className="shrink-0 z-10 bg-white/[0.82] backdrop-blur-md shadow-[var(--shadow-sm)]">
      <div className="h-14 px-9 flex items-center gap-3.5">
        <div className="flex items-center gap-2.5">
          <GinesysLogo />
          <span className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Ginesys One</span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] px-2.5 py-1.5 rounded-md hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-brand)] transition-all"
        >
          <svg width="14" height="14" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" style={{ stroke: 'var(--color-brand-primary)' }}><polyline points="15 18 9 12 15 6" /></svg>
          Back to Apps
        </button>

        <div className="ml-auto flex items-center gap-3">
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
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-50 shrink-0">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )
          })()}

          <div className="relative">
            <button
              aria-label="Open account menu"
              aria-expanded={avOpen}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer"
              style={{ background: 'var(--gradient-avatar-primary)' }}
              onClick={() => setAvOpen(!avOpen)}
            >L</button>
            {avOpen && (
              <AvatarDropdown
                name="Laksh Aeterna"
                roleLabel="Account Holder"
                roleBg="var(--color-role-holder-bg)"
                roleText="var(--color-role-holder-text)"
                items={[
                  {
                    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
                    label: 'All Apps',
                    onClick: () => { setAvOpen(false); onBack() },
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

      {/* ── Tabs ── */}
      <div className="flex justify-center">
        {(['profile', 'enterprise', 'team'] as ProfileTab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-10 py-3.5 text-sm font-medium border-b-[2.5px] transition-colors capitalize ${
              tab === t
                ? 'text-[var(--color-text-brand)] border-[var(--color-border-brand)] font-semibold'
                : 'text-[var(--color-text-tertiary)] border-transparent hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      </div>{/* end unified header */}

      {/* ── Tab Body ── */}
      <div className="flex-1 overflow-y-auto bg-[var(--color-bg-subtle)]">
        <div className="max-w-[860px] w-full mx-auto px-10 py-10 flex flex-col gap-8">

          {/* ══ TAB: PROFILE ══ */}
          {tab === 'profile' && (
            <>
              <Card>
              {/* User Info */}
              <div className="p-6 flex gap-8 items-start">
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <button aria-label="Change profile photo" className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-white text-4xl font-semibold relative cursor-pointer group" style={{ background: 'var(--gradient-avatar-primary)' }}>
                    L
                    <div aria-hidden="true" className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </div>
                  </button>
                  <span className="text-[10px] text-[var(--color-text-tertiary)] text-center">Change photo</span>
                </div>

                {/* Fields */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold mb-5" style={{ letterSpacing: '-0.4px' }}>User Information</h2>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <FieldLabel>Name</FieldLabel>
                      {editing
                        ? <input className="w-full h-[34px] px-2.5 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all" value={name} onChange={e => setName(e.target.value)} />
                        : <div className="text-sm font-normal text-[var(--color-text-primary)]">{name}</div>
                      }
                    </div>
                    <div>
                      <FieldLabel>
                        <span className="flex items-center gap-1.5">
                          Role
                          {editing && <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] rounded px-1.5 py-0.5"><svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>Locked</span>}
                        </span>
                      </FieldLabel>
                      <div className="text-sm font-normal text-[var(--color-text-primary)]">Account Holder</div>
                    </div>
                    <div>
                      <FieldLabel>Email</FieldLabel>
                      {editing
                        ? <input className="w-full h-[34px] px-2.5 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all" value={email} onChange={e => setEmail(e.target.value)} />
                        : <div className="text-sm font-normal text-[var(--color-text-primary)]">{email}</div>
                      }
                    </div>
                    <div>
                      <FieldLabel>Phone</FieldLabel>
                      {editing
                        ? <input className="w-full h-[34px] px-2.5 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all" value={phone} onChange={e => setPhone(e.target.value)} />
                        : <div className="text-sm font-normal text-[var(--color-text-primary)]">{phone}</div>
                      }
                    </div>
                    <div>
                      <FieldLabel>Username</FieldLabel>
                      {editing
                        ? <input className="w-full h-[34px] px-2.5 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all" value={username} onChange={e => setUsername(e.target.value)} />
                        : <div className="text-sm font-normal text-[var(--color-text-primary)]">{username}</div>
                      }
                    </div>
                    {!editing && (
                      <div>
                        <FieldLabel>Last Login</FieldLabel>
                        <div className="text-sm font-normal text-[var(--color-text-primary)]">
                          {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date('2026-03-17T00:00:00'))}
                        </div>
                        <button
                          onClick={() => setShowLoginHistory(true)}
                          className="text-xs text-[var(--color-text-brand)] hover:underline cursor-pointer mt-0.5"
                        >
                          See history
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    {!editing ? (
                      <>
                        <button onClick={() => setEditing(true)} className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                          Edit Info
                        </button>
                        <button onClick={() => setShowPwPanel(true)} className="h-10 px-4 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                          Change Password
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={saveProfile} className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                          Save Changes
                        </button>
                        <button onClick={() => setEditing(false)} className="h-10 px-4 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-bg-subtle)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          Discard
                        </button>
                      </>
                    )}
                    {savedMsg && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-success)]">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                        Profile updated
                      </span>
                    )}
                  </div>
                </div>
              </div>

              </Card>

              {/* 2FA */}
              <Card>
                <div className="p-6 pb-2">
                  <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.3px' }}>Two-factor authentication</h2>
                  <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">Require an additional security code while logging in. Adds a second layer of protection beyond your password.</div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-md bg-[var(--color-bg-brand-subtle)] border border-[var(--color-border-brand-field)] text-xs font-semibold text-[var(--color-text-brand)] w-fit">
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    Active for authenticator app
                  </div>
                  <div>
                    <button className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                      Configure
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* ══ TAB: ENTERPRISE ══ */}
          {tab === 'enterprise' && (
            <>
              {/* Enterprise Info */}
              <Card>
              <div className="p-6 flex gap-8 items-start">
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <button aria-label="Change enterprise logo" className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-white text-4xl font-semibold relative cursor-pointer group" style={{ background: ENTERPRISES.find(e => e.name === enterprise)?.color ?? 'linear-gradient(135deg,#5a8fe8,#3b6fd4)' }}>
                    {ENTERPRISES.find(e => e.name === enterprise)?.initial ?? enterprise[0]}
                    <div aria-hidden="true" className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </div>
                  </button>
                  <span className="text-[10px] text-[var(--color-text-tertiary)] text-center">Change logo</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold mb-5" style={{ letterSpacing: '-0.4px' }}>Enterprise Information</h2>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    {[
                      { label: 'Trade Name',  val: tradeName,  set: setTradeName,  ph: '' },
                      { label: 'Legal Name',  val: legalName,  set: setLegalName,  ph: '' },
                      { label: 'Website',     val: website,    set: setWebsite,    ph: 'https://...' },
                      { label: 'Email',       val: entEmail,   set: setEntEmail,   ph: '' },
                      { label: 'PAN',         val: pan,        set: setPan,        ph: 'ABCDE1234F' },
                      { label: 'CIN',         val: cin,        set: setCin,        ph: 'U12345AB2000PTC123456' },
                    ].map(({ label, val, set, ph }) => (
                      <div key={label}>
                        <FieldLabel>{label}</FieldLabel>
                        {entEditing
                          ? <input className="w-full h-[34px] px-2.5 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all" value={val} onChange={e => set(e.target.value)} placeholder={ph} />
                          : <div className={`text-sm font-normal ${val ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)] italic'}`}>{val || 'Not specified'}</div>
                        }
                      </div>
                    ))}

                    {/* Timezone — full width */}
                    <div className="col-span-2">
                      <FieldLabel>Timezone</FieldLabel>
                      {entEditing ? (
                        <div className="relative">
                          <button
                            onClick={() => setTzOpen(!tzOpen)}
                            className="w-full h-[34px] px-2.5 pr-8 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm font-normal text-[var(--color-text-primary)] bg-white text-left outline-none focus:border-[var(--color-border-brand)] truncate"
                          >
                            {timezone}
                          </button>
                          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-tertiary)]" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
                          {tzOpen && (
                            <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden">
                              <div className="border-b border-[var(--color-border-muted)]">
                                <input autoFocus className="w-full h-9 px-3 text-xs outline-none bg-transparent" placeholder="Search timezone…" value={tzSearch} onChange={e => setTzSearch(e.target.value)} />
                              </div>
                              <div className="max-h-44 overflow-y-auto p-1">
                                {timezones.filter(t => t.toLowerCase().includes(tzSearch.toLowerCase())).map(t => (
                                  <button key={t} onClick={() => { setTimezone(t); setTzOpen(false); setTzSearch('') }} className={`w-full text-left px-2.5 py-2 rounded-md text-xs cursor-pointer transition-colors ${t === timezone ? 'font-semibold text-[var(--color-text-brand)] bg-[var(--color-bg-brand-subtle)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]'}`}>{t}</button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm font-normal text-[var(--color-text-primary)]">{timezone}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {!entEditing ? (
                      <button onClick={() => setEntEditing(true)} className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        Edit Info
                      </button>
                    ) : (
                      <>
                        <button onClick={saveEnt} className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                          Save Changes
                        </button>
                        <button onClick={() => setEntEditing(false)} className="h-10 px-4 rounded-md border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-bg-subtle)] transition-all">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          Discard
                        </button>
                      </>
                    )}
                    {entSaved && <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-success)]"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Enterprise details updated</span>}
                  </div>
                </div>
              </div>
              </Card>

              {/* Domain Policy */}
              <Card>
                <div className="p-6 pb-2">
                  <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.3px' }}>Domain Policy</h2>
                  <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">Authorised domains for SSO username emails eligible to access this enterprise.</div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2">Authorised Domains</div>
                    <div
                      className="min-h-[44px] px-2.5 py-1.5 border-[1.5px] border-[var(--color-border-default)] rounded-md flex flex-wrap items-center gap-1.5 cursor-text focus-within:border-[var(--color-border-brand)] focus-within:shadow-[var(--shadow-focus-brand-field)] bg-white"
                      onClick={() => document.getElementById('domainInput')?.focus()}
                    >
                      {domains.map(d => (
                        <span key={d} className="inline-flex items-center gap-1.5 bg-[var(--color-bg-brand-subtle)] border border-[var(--color-border-brand-field)] text-[var(--color-text-brand)] rounded-md px-2.5 py-1 text-sm font-medium">
                          {d}
                          <button onClick={() => { setDomains(domains.filter(x => x !== d)); setDomainDirty(true) }} className="text-[var(--color-text-brand)] opacity-60 hover:opacity-100 text-sm leading-none">×</button>
                        </span>
                      ))}
                      <input
                        id="domainInput"
                        className="flex-1 min-w-[140px] border-none bg-transparent text-xs text-[var(--color-text-primary)] outline-none py-1 px-1"
                        placeholder="Add domain, press Enter…"
                        value={domainInput}
                        onChange={e => { setDomainInput(e.target.value); setDomainDirty(true) }}
                        onKeyDown={e => {
                          if ((e.key === 'Enter' || e.key === ',') && domainInput.trim().includes('.')) {
                            e.preventDefault()
                            setDomains([...domains, domainInput.trim()])
                            setDomainInput('')
                          } else if (e.key === 'Backspace' && !domainInput && domains.length) {
                            setDomains(domains.slice(0, -1)); setDomainDirty(true)
                          }
                        }}
                      />
                    </div>
                    <div className="text-xs text-[var(--color-text-tertiary)] mt-1.5">Press <kbd className="bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] rounded px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to add · <kbd className="bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] rounded px-1 py-0.5 font-mono text-[10px]">Backspace</kbd> to remove last</div>
                  </div>
                </div>
                {(domainDirty || domainSaved) && (
                  <div className="flex items-center gap-2 px-6 py-3 border-t border-[var(--color-border-muted)] bg-[var(--color-bg-subtle)]">
                    {domainDirty && <>
                      <button onClick={saveDomain} className="h-10 px-3.5 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Save Changes</button>
                      <button onClick={() => { setDomainDirty(false); setDomainInput('') }} className="h-10 px-3.5 rounded-md border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-white transition-all">Discard</button>
                    </>}
                    {domainSaved && <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-success)]"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Domain policy updated</span>}
                  </div>
                )}
              </Card>

              {/* Password Policy */}
              <Card>
                <div className="p-6 pb-2">
                  <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: '-0.3px' }}>Password Policy</h2>
                  <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">Define password complexity requirements for all users in this enterprise.</div>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  {/* Min length */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2">Minimum Password Length</div>
                    <div className="inline-flex items-center border-[1.5px] border-[var(--color-border-default)] rounded-md overflow-hidden focus-within:border-[var(--color-border-brand)]">
                      <button onClick={() => { setMinLen(Math.max(6, minLen - 1)); setPwDirty(true) }} className="w-9 h-10 bg-[var(--color-bg-subtle)] text-base text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-brand-subtle)] hover:text-[var(--color-text-brand)] flex items-center justify-center transition-colors">−</button>
                      <input className="w-12 text-center border-none font-mono text-base font-semibold text-[var(--color-text-primary)] bg-white outline-none p-0" type="number" value={minLen} onChange={e => { setMinLen(Math.min(32, Math.max(6, +e.target.value))); setPwDirty(true) }} />
                      <button onClick={() => { setMinLen(Math.min(32, minLen + 1)); setPwDirty(true) }} className="w-9 h-10 bg-[var(--color-bg-subtle)] text-base text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-brand-subtle)] hover:text-[var(--color-text-brand)] flex items-center justify-center transition-colors">+</button>
                    </div>
                  </div>

                  {/* Char requirements */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2">Require at least one of the following</div>
                    <div className="flex flex-wrap gap-2">
                      {charLabels.map(({ label, code }, i) => (
                        <button
                          key={i}
                          onClick={() => toggleCharPill(i)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border-[1.5px] text-sm font-medium transition-all ${
                            charPills[i]
                              ? 'bg-[var(--color-bg-info)] border-[var(--color-indigo-400-border)] text-[var(--color-text-info)]'
                              : 'bg-white border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 ${charPills[i] ? 'bg-[var(--color-text-info)] border-[var(--color-text-info)]' : 'border-current opacity-50'}`}>
                            {charPills[i] && <svg width="9" height="9" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 12 12"><polyline points="1.5 6 4.5 9 10.5 3" /></svg>}
                          </div>
                          {label} <span className="font-mono text-[10px] opacity-50">{code}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2FA toggle */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2">Additional Settings</div>
                    <label className="flex items-center gap-3 py-1 cursor-pointer">
                      <div className="flex-1">
                        <div className="text-base font-medium text-[var(--color-text-primary)]">Make 2FA mandatory for all users</div>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">Users will be prompted to set up 2FA on their next login if not already configured.</div>
                      </div>
                      <div className="relative w-[38px] h-[22px] shrink-0">
                        <input type="checkbox" className="sr-only" checked={tfa} onChange={() => { setTfa(!tfa); setPwDirty(true) }} />
                        <div aria-hidden="true" className={`absolute inset-0 rounded-full transition-colors ${tfa ? 'bg-[var(--color-text-info)]' : 'bg-[var(--color-border-default)]'}`} />
                        <div aria-hidden="true" className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-[var(--shadow-xs)] transition-transform ${tfa ? 'translate-x-[19px]' : 'translate-x-[3px]'}`} />
                      </div>
                    </label>
                  </div>
                </div>
                {(pwDirty || pwSaved) && (
                  <div className="flex items-center gap-2 px-6 py-3 border-t border-[var(--color-border-muted)] bg-[var(--color-bg-subtle)]">
                    {pwDirty && <>
                      <button onClick={savePw} className="h-10 px-3.5 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Save Changes</button>
                      <button onClick={() => setPwDirty(false)} className="h-10 px-3.5 rounded-md border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-white transition-all">Discard</button>
                    </>}
                    {pwSaved && <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-success)]"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Password policy updated</span>}
                  </div>
                )}
              </Card>
            </>
          )}

          {/* ══ TAB: TEAM ══ */}
          {tab === 'team' && (
            <>
              {/* Plan limit banner */}
              {showPlanLimitToast && (
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[var(--color-status-warning-bg)] border border-[var(--color-status-warning-border)] banner-enter">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5 text-[var(--color-status-warning-text)]"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">User limit reached</span>
                    <span className="text-xs text-[var(--color-text-secondary)] leading-relaxed">Your Ginesys One plan supports up to 8 users. Upgrade your plan to invite more people.</span>
                    <button className="mt-1 self-start text-xs font-semibold text-[var(--color-text-brand)] hover:underline cursor-pointer">Upgrade plan</button>
                  </div>
                  <button onClick={() => setShowPlanLimitToast(false)} className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-[var(--color-status-warning-border)] hover:text-[var(--color-text-secondary)] cursor-pointer shrink-0 transition-colors -mt-0.5 -mr-1">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              )}
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold flex items-center gap-2.5" style={{ letterSpacing: '-0.5px' }}>
                  Team
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-border-muted)] border border-[var(--color-border-default)] rounded-full px-2.5 py-0.5">{teamMembers.length}</span>
                </h2>
                <div className="ml-auto flex gap-2.5">
                  <button className="h-10 px-4 rounded-md border-[1.5px] border-[var(--color-border-default)] text-sm font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5 hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-all bg-transparent">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    Bulk Import
                  </button>
                  <button onClick={() => { if (teamMembers.length >= 8) { setShowPlanLimitToast(true) } else { setShowAddMember(true) } }} className="h-10 px-4 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add User
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 border-[1.5px] border-[var(--color-border-default)] rounded-md px-3.5 h-10 bg-white focus-within:border-[var(--color-border-brand)] transition-colors -mt-4">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[var(--color-text-tertiary)] shrink-0"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input className="flex-1 border-none bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]" placeholder="Search team by name or email…" value={teamSearch} onChange={e => setTeamSearch(e.target.value)} />
              </div>

              {/* Team list */}
              <Card className="overflow-visible">
                {filteredMembers.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[var(--color-text-tertiary)] italic">No members match your search</div>
                ) : filteredMembers.map((m, i) => (
                  <button key={m.email} onClick={() => setViewTarget(m)} className={`w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-[var(--color-bg-page)] transition-colors relative cursor-pointer text-left ${i < filteredMembers.length - 1 ? 'border-b border-[var(--color-border-muted)]' : ''} ${i === 0 ? 'rounded-t-xl' : ''} ${i === filteredMembers.length - 1 ? 'rounded-b-xl' : ''}`}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0" style={{ background: m.color }}>{m.av}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {m.name}{m.you && <span className="text-xs text-[var(--color-text-tertiary)] font-normal ml-1">(You)</span>}
                      </div>
                      <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5 truncate">{m.email}</div>
                    </div>
                    {(() => {
                      const sel = seedInstances(m.name)
                      const assignedApps = APP_INSTANCES.filter(a => a.instances.some(i => sel.has(i.id)))
                      const visibleIcons = assignedApps.slice(0, 3)
                      return (
                        <div className="hidden sm:flex w-56 shrink-0 items-center gap-2.5">
                          <div className="flex items-center justify-center w-[68px] shrink-0">
                            {visibleIcons.map((a, idx) => (
                              <img
                                key={a.slug}
                                src={a.icon}
                                alt={a.app}
                                title={a.app}
                                className="w-7 h-7 rounded-full object-contain border-2 border-white bg-white shrink-0"
                                style={{ marginLeft: idx === 0 ? 0 : -8, zIndex: visibleIcons.length - idx }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-[var(--color-text-tertiary)] w-14 shrink-0 ml-2">
                            {assignedApps.length} app{assignedApps.length !== 1 ? 's' : ''}
                          </span>
                          <span className="text-xs text-[var(--color-text-tertiary)]">
                            {sel.size} instance{sel.size !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )
                    })()}
                    <div className="w-32 shrink-0 flex justify-end">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleCls[m.role]}`}>{roleLbl[m.role]}</span>
                    </div>
                  </button>
                ))}
              </Card>
            </>
          )}
        </div>
      </div>

      {/* ── Remove Member Modal ── */}

      {/* ── Remove Toast ── */}
      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9999] transition-all duration-200 ${removeToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>
        {removeToast} was removed from the team
      </div>

      {/* ── Enterprise Switch Toast ── */}
      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9999] transition-all duration-200 ${entSwitchToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-md bg-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
          <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        Switched to {entSwitchToast}
      </div>

      {/* ── Add Member Toast ── */}
      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9999] transition-all duration-200 ${addMemberToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-md bg-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
          <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        {addMemberToast} added to the team
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--color-bg-inverse)] text-white px-4 py-2.5 rounded-md flex items-center gap-2.5 text-sm font-medium shadow-[var(--shadow-lg)] whitespace-nowrap z-[9999] transition-all duration-200 ${editMemberToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-5 h-5 rounded-md bg-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
          <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        {editMemberToast} updated successfully
      </div>

      {/* ── Add Member ── */}
      {showAddMember && (
        <AddMemberDrawer
          onClose={() => setShowAddMember(false)}
          onSave={handleAddMember}
        />
      )}

      {editTarget && (
        <EditMemberDrawer
          member={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={() => {
            setEditMemberToast(editTarget.name)
            setTimeout(() => setEditMemberToast(null), 2800)
          }}
        />
      )}

      {viewTarget && (
        <UserDetailsDrawer
          user={viewTarget}
          onClose={() => setViewTarget(null)}
          onEdit={() => setEditTarget({ name: viewTarget.name, email: viewTarget.email, role: viewTarget.role })}
          onPromoteDemote={(newRole) => setTeamMembers(prev => prev.map(m => m.email === viewTarget.email ? { ...m, role: newRole } : m))}
          onResetPassword={() => {}}
          onRemove={() => { removeUser(viewTarget.email, viewTarget.name); setViewTarget(null) }}
        />
      )}

      {/* ── Login History ── */}
      {showLoginHistory && (
        <LoginHistoryDrawer onClose={() => setShowLoginHistory(false)} />
      )}

      {/* ── Enterprise Switcher ── */}
      {showEntSwitcher && (
        <EnterpriseSwitcher
          enterprise={enterprise}
          onSwitch={(name) => { onSwitchEnterprise(name); setShowEntSwitcher(false); setEntSwitchToast(name); setTimeout(() => setEntSwitchToast(null), 2800) }}
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
            <div className="text-base font-semibold text-[var(--color-text-primary)] mb-2" style={{ letterSpacing: '-0.3px' }}>Log out of Ginesys One?</div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">You'll be returned to the login screen. Any unsaved changes will be lost.</div>
            <div className="flex gap-2.5">
              <button className="flex-1 h-10 rounded-md bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="flex-1 h-10 rounded-md bg-[var(--color-text-danger)] border-[1.5px] border-[var(--color-text-danger)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-border-danger-hover)] transition-colors" onClick={() => { setShowLogout(false); onLogout() }}>Log out</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Password Updated Dialog ── */}
      {pwUpdatedToast && (
        <div className="fixed inset-0 z-[400] bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-white p-8 pb-6 w-[340px] text-center shadow-[var(--shadow-xl)]" style={{ borderRadius: 'var(--radius-2xl)' }}>
            <div className="w-[52px] h-[52px] rounded-2xl bg-[var(--color-bg-brand-subtle)] flex items-center justify-center mx-auto mb-4 text-[var(--color-text-brand)]">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mb-2" style={{ letterSpacing: '-0.3px' }}>Password updated</div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">Your password has been changed. Log out and sign back in to apply it across all active sessions.</div>
            <div className="flex gap-2.5">
              <button className="flex-1 h-10 rounded-md bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors" onClick={() => setPwUpdatedToast(false)}>Stay logged in ({pwDialogCountdown}s)</button>
              <button className="flex-1 h-10 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-brand-primary-hover)] transition-colors" onClick={() => { setPwUpdatedToast(false); onLogout() }}>Log out</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Password Drawer ── */}
      {showPwPanel && (
        <div className={`fixed inset-0 z-[300] bg-black/30 backdrop-blur-[1px] flex justify-end ${pwPanelClosing ? 'overlay-out' : 'overlay-in'}`} onClick={closePwPanel}>
          <div
            className={`relative h-full w-[420px] bg-white flex flex-col shadow-[var(--shadow-xl)] ${pwPanelClosing ? 'slide-out-right' : 'slide-in-right'}`}
            style={{ borderRadius: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-5">
              <div className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Change Password</div>
              <button onClick={closePwPanel} className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-secondary)] transition-colors">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Fields */}
            <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-5">

              {/* Current Password */}
              <div className="flex flex-col">
                <FieldLabel>Current Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showCur ? 'text' : 'password'}
                    value={curPw}
                    onChange={e => setCurPw(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full h-10 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all placeholder:text-[var(--color-text-placeholder)]"
                  />
                  <button onClick={() => setShowCur(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                    {showCur
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <FieldLabel>New Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    onBlur={() => setPwTouched(true)}
                    placeholder="Enter new password"
                    className="w-full h-10 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all placeholder:text-[var(--color-text-placeholder)]"
                  />
                  <button onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                    {showNew
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <FieldLabel>Confirm Password</FieldLabel>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    onBlur={() => setPwTouched(true)}
                    placeholder="Enter confirm password"
                    className="w-full h-10 px-3 pr-10 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all placeholder:text-[var(--color-text-placeholder)]"
                  />
                  <button onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                    {showConfirm
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              {/* Validation */}
              {pwTouched && (
                <div className="flex flex-col">
                  {[
                    { ok: pwMatchOk,  label: 'Passwords match' },
                    { ok: pwLengthOk, label: 'Should be in the range of 7 to 100 characters' },
                  ].map(({ ok, label }) => (
                    <div key={label} className={`flex items-center gap-2 text-xs font-medium ${ok ? 'text-[var(--color-text-success)]' : 'text-[var(--color-text-danger)]'}`}>
                      {ok
                        ? <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        : <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      }
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 flex items-center gap-3">
              <button
                disabled={!curPw || !pwMatchOk || !pwLengthOk}
                className="h-10 px-5 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={submitPwChange}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                Update
              </button>
              <button onClick={closePwPanel} className="text-sm font-medium text-[var(--color-text-brand)] hover:text-[var(--color-brand-primary-hover)] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
