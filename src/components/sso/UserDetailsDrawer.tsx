import { useState } from 'react'
import { FieldLabel } from '../shared/FieldLabel'

type DetailsTab = 'info' | 'access'

const icon = (file: string) => `${import.meta.env.BASE_URL}icons/${file}`

const APP_INSTANCES = [
  { app: 'Browntape',      slug: 'browntape',    icon: icon('browntape.png')     },
  { app: 'Ginesys ERP',    slug: 'erp',          icon: icon('ginesys-erp.png')   },
  { app: 'EaseMyGST',      slug: 'emg',          icon: icon('emg.png')           },
  { app: 'Zwing POS',      slug: 'zwing',        icon: icon('zwing.png')         },
  { app: 'CRM',            slug: 'crm',          icon: icon('crm.png')           },
  { app: 'Gift Vouchers',  slug: 'gifts',        icon: icon('gift-voucher.png')  },
  { app: 'Wallet Service', slug: 'wallet',       icon: icon('wallet.png')        },
  { app: 'Connect',        slug: 'connect',      icon: icon('in.png')            },
].map(a => ({
  ...a,
  instances: [
    { id: `${a.slug}-prod`,    name: 'Production', url: `production.${a.slug}.ginesys.one` },
    { id: `${a.slug}-staging`, name: 'Staging',    url: `staging.${a.slug}.ginesys.one`    },
    { id: `${a.slug}-uat`,     name: 'UAT',        url: `uat.${a.slug}.ginesys.one`         },
  ],
}))

const NOW = new Date(2026, 2, 17)

function seedDate(name: string, minDaysAgo: number, rangeDays: number): Date {
  const seed = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const daysAgo = minDaysAgo + (seed % rangeDays)
  const d = new Date(NOW)
  d.setDate(d.getDate() - daysAgo)
  return d
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function timeAgo(d: Date): string {
  const secs = Math.floor((NOW.getTime() - d.getTime()) / 1000)
  if (secs < 60)  return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

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

const roleLbl: Record<string, string> = { holder: 'Account Holder', member: 'Member', admin: 'Admin' }

export interface UserDetail {
  name:  string
  email: string
  role:  'holder' | 'member' | 'admin'
  you:   boolean
  color: string
  av:    string
}

interface Props {
  user:            UserDetail
  onClose:         () => void
  onEdit:          () => void
  onPromoteDemote: (newRole: 'member' | 'admin') => void
  onResetPassword: () => void
  onRemove:        () => void
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <div className={`text-sm font-normal ${value ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)] italic'}`}>
      {value || 'Not set'}
    </div>
  </div>
)

export function UserDetailsDrawer({ user, onClose, onEdit, onPromoteDemote, onResetPassword, onRemove }: Props) {
  const [closing,           setClosing]           = useState(false)
  const [activeTab,         setActiveTab]         = useState<DetailsTab>('info')
  const [role,              setRole]              = useState(user.role)
  const [confirmRoleChange, setConfirmRoleChange] = useState(false)
  const [confirmRemove,     setConfirmRemove]     = useState(false)

  const nameParts = user.name.split(' ')
  const firstName = nameParts[0] ?? ''
  const lastName  = nameParts.slice(1).join(' ')
  const username  = user.email.split('@')[0]

  const selected     = seedInstances(user.name)
  const userCreated  = seedDate(user.name, 180, 360)
  const lastUpdated  = seedDate(user.email, 7, 83)
  const lastActiveDate = seedDate(user.name + user.email, 1, 13)
  const assignedApps = APP_INSTANCES.filter(a => a.instances.some(i => selected.has(i.id)))

  const dismiss = () => { setClosing(true); setTimeout(onClose, 210) }

  const confirmPromoteDemote = () => {
    const newRole = role === 'admin' ? 'member' : 'admin'
    setRole(newRole)
    onPromoteDemote(newRole)
    setConfirmRoleChange(false)
  }

  const isHolder = role === 'holder' || user.you

  return (
    <>
      <div
        className={`fixed inset-0 z-[190] bg-black/30 backdrop-blur-[1px] ${closing ? 'overlay-out' : 'overlay-in'}`}
        onClick={dismiss}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full sm:max-w-[600px] bg-white z-[200] flex flex-col shadow-[var(--shadow-xl)] ${closing ? 'slide-out-right' : 'slide-in-right'}`}
        style={{ borderRadius: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0" style={{ background: user.color }}>{user.av}</div>
            <div className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>{user.name}</div>
          </div>
          <button onClick={dismiss} className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex px-6 mt-5 gap-6 border-b border-[var(--color-border-muted)] shrink-0">
          {(['info', 'access'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 text-sm font-semibold border-b-[2.5px] -mb-px transition-colors cursor-pointer ${
                activeTab === t
                  ? 'border-[var(--color-brand-primary)] text-[var(--color-text-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {t === 'info' ? 'User Information' : 'App Access'}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── USER INFO ── */}
          {activeTab === 'info' && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <Field label="First Name" value={firstName} />
                <Field label="Last Name"  value={lastName}  />
                <Field label="Username"   value={username}  />
                <Field label="Phone"      value=""          />
                <Field label="Email"      value={user.email} />
                <div>
                  <FieldLabel>Role</FieldLabel>
                  <div className="text-sm font-normal text-[var(--color-text-primary)]">{roleLbl[role] ?? role}</div>
                </div>
              </div>
              <div className="border-t border-[var(--color-border-muted)] pt-5 grid grid-cols-2 gap-5">
                <Field label="User Created"  value={formatDate(userCreated)} />
                <Field label="Last Updated"  value={formatDate(lastUpdated)} />
                <div>
                  <FieldLabel>Last Active</FieldLabel>
                  {user.you ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-green-200)] bg-[var(--color-bg-success)] border border-[var(--color-border-success)] px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-200)] animate-pulse shrink-0" />
                      Currently Active
                    </span>
                  ) : (
                    <div className="text-sm font-normal text-[var(--color-text-primary)]">
                      {formatDate(lastActiveDate)}
                      <span className="text-xs text-[var(--color-text-tertiary)] ml-1.5">({timeAgo(lastActiveDate)})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── APP ACCESS ── */}
          {activeTab === 'access' && (
            <div className="flex flex-col gap-4">
              {assignedApps.length === 0 ? (
                <div className="text-sm text-[var(--color-text-tertiary)] italic py-4">No app access configured.</div>
              ) : assignedApps.map(app => {
                const activeInstances = app.instances.filter(i => selected.has(i.id))
                return (
                  <div key={app.app} className="rounded-xl border border-[var(--color-border-muted)] bg-[var(--color-bg-subtle)] p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <img src={app.icon} alt={app.app} className="w-8 h-8 rounded-full shrink-0 object-contain" />
                      <span className="text-base font-semibold text-[var(--color-text-primary)]">{app.app}</span>
                    </div>
                    <div className="flex flex-col pl-[42px]">
                      {activeInstances.map(inst => (
                        <div key={inst.id} className="flex items-center gap-2.5 py-1">
                          <span className="text-xs font-medium text-[var(--color-text-primary)] w-24 shrink-0">{inst.name}</span>
                          <span className="text-xs text-[var(--color-text-tertiary)] truncate">{inst.url}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isHolder && (
          <div className="shrink-0 px-6 py-4 border-t border-[var(--color-border-muted)] flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <button
                onClick={() => { dismiss(); setTimeout(onEdit, 220) }}
                className="flex-1 h-10 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[var(--color-brand-primary-hover)] transition-all cursor-pointer"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit User
              </button>
              <button
                onClick={() => setConfirmRoleChange(true)}
                className="flex-1 h-10 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer"
              >
                {role === 'admin' ? 'Demote to Member' : 'Promote to Admin'}
              </button>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={onResetPassword}
                className="flex-1 h-10 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Reset Password
              </button>
              <button
                onClick={() => setConfirmRemove(true)}
                className="flex-1 h-10 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-danger)] text-[var(--color-text-danger)] text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[var(--color-bg-danger)] transition-all cursor-pointer"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>
                Remove User
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Remove confirmation ── */}
      {confirmRemove && (
        <div className="fixed inset-0 z-[210] bg-black/30 backdrop-blur-[1px] flex items-center justify-center" onClick={() => setConfirmRemove(false)}>
          <div className="bg-white p-8 pb-6 w-[340px] text-center shadow-[var(--shadow-xl)]" style={{ borderRadius: 'var(--radius-2xl)' }} onClick={e => e.stopPropagation()}>
            <div className="w-[52px] h-[52px] rounded-2xl bg-[var(--color-bg-danger)] flex items-center justify-center mx-auto mb-4 text-[var(--color-text-danger)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>
            </div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mb-2" style={{ letterSpacing: '-0.3px' }}>Remove {user.name}?</div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">They will lose access to all Ginesys One apps under this account. This cannot be undone.</div>
            <div className="flex gap-2.5">
              <button className="flex-1 h-10 rounded-md bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors" onClick={() => setConfirmRemove(false)}>Cancel</button>
              <button className="flex-1 h-10 rounded-md bg-[var(--color-text-danger)] border-[1.5px] border-[var(--color-text-danger)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-border-danger-hover)] transition-colors" onClick={() => { onRemove(); dismiss() }}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Promote / Demote confirmation ── */}
      {confirmRoleChange && (
        <div className="fixed inset-0 z-[210] bg-black/30 backdrop-blur-[1px] flex items-center justify-center" onClick={() => setConfirmRoleChange(false)}>
          <div className="bg-white rounded-2xl shadow-[var(--shadow-xl)] p-6 w-80 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>
                {role === 'admin' ? 'Demote to Member?' : 'Promote to Admin?'}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                {role === 'admin'
                  ? `${user.name} will lose admin privileges and return to a regular member.`
                  : `${user.name} will gain admin access and can manage users and settings.`}
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                className="flex-1 h-10 rounded-md bg-[var(--color-bg-subtle)] border-[1.5px] border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer hover:border-[var(--color-border-strong)] transition-colors"
                onClick={() => setConfirmRoleChange(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-10 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-sm font-semibold text-white cursor-pointer hover:bg-[var(--color-brand-primary-hover)] transition-colors"
                onClick={confirmPromoteDemote}
              >
                {role === 'admin' ? 'Demote' : 'Promote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
