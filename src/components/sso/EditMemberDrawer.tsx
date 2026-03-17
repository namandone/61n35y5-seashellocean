import { useState } from 'react'
import { FieldLabel } from '../shared/FieldLabel'

type EditMemberTab = 'info' | 'access'

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

// Deterministically seed pre-selected instances from the member's name
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

export interface MemberToEdit {
  name:  string
  email: string
  role:  string
}

interface Props {
  member:  MemberToEdit
  onClose: () => void
  onSave:  () => void
}

const INPUT = 'w-full h-10 px-3 border-[1.5px] border-[var(--color-border-default)] rounded-md text-sm text-[var(--color-text-primary)] bg-white outline-none focus:border-[var(--color-border-brand)] focus:shadow-[var(--shadow-focus-brand-sm)] transition-all placeholder:text-[var(--color-text-placeholder)]'

export function EditMemberDrawer({ member, onClose, onSave }: Props) {
  const [closing, setClosing] = useState(false)
  const [activeTab, setActiveTab] = useState<EditMemberTab>('info')

  const nameParts  = member.name.split(' ')
  const initFirst  = nameParts[0] ?? ''
  const initLast   = nameParts.slice(1).join(' ')
  const initUser   = member.email.split('@')[0]
  const initRole   = (member.role === 'admin' ? 'admin' : 'member') as 'member' | 'admin'

  const [firstName, setFirstName] = useState(initFirst)
  const [lastName,  setLastName]  = useState(initLast)
  const [username,  setUsername]  = useState(initUser)
  const [email,     setEmail]     = useState(member.email)
  const [phone,     setPhone]     = useState('')
  const [role,      setRole]      = useState<'member' | 'admin'>(initRole)

  const [selected,   setSelected]  = useState<Set<string>>(seedInstances(member.name))
  const [appSearch,  setAppSearch] = useState('')

  const dismiss = () => { setClosing(true); setTimeout(onClose, 210) }

  const toggleInstance = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const canSave = firstName.trim() && username.trim() && email.trim() && selected.size > 0

  const handleSave = () => {
    if (!canSave) return
    onSave()
    dismiss()
  }

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
          <div className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Edit Member</div>
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
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">

                <div className="flex flex-col">
                  <FieldLabel>First Name</FieldLabel>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first name" className={INPUT} />
                </div>

                <div className="flex flex-col">
                  <FieldLabel>Last Name (Optional)</FieldLabel>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" className={INPUT} />
                </div>

                <div className="flex flex-col">
                  <FieldLabel>Username</FieldLabel>
                  <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" className={INPUT} />
                </div>

                <div className="flex flex-col">
                  <FieldLabel>Phone (Optional)</FieldLabel>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" className={INPUT} />
                </div>

                <div className="flex flex-col">
                  <FieldLabel>Email</FieldLabel>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" className={INPUT} />
                </div>

                <div className="flex flex-col">
                  <FieldLabel>Role</FieldLabel>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as 'member' | 'admin')}
                    className={INPUT + ' cursor-pointer pr-8 appearance-none'}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23888' stroke-width='2.5' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── APP ACCESS ── */}
          {activeTab === 'access' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-[1.5px] border-[var(--color-border-default)] rounded-md px-3 h-10 bg-white focus-within:border-[var(--color-border-brand)] transition-all">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0 text-[var(--color-text-tertiary)]">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  className="flex-1 border-none bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
                  placeholder="Search apps…"
                  value={appSearch}
                  onChange={e => setAppSearch(e.target.value)}
                />
                {appSearch && (
                  <button onClick={() => setAppSearch('')} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer">
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
              {APP_INSTANCES.filter(a => a.app.toLowerCase().includes(appSearch.toLowerCase())).map(app => {
                const anySelected = app.instances.some(i => selected.has(i.id))
                return (
                  <div
                    key={app.app}
                    className={`rounded-xl border p-4 transition-colors ${
                      anySelected
                        ? 'bg-[var(--color-bg-brand-subtle)] border-[var(--color-border-brand-subtle)]'
                        : 'bg-[var(--color-bg-subtle)] border-[var(--color-border-muted)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <img src={app.icon} alt={app.app} className="w-8 h-8 rounded-full shrink-0 object-contain" />
                      <span className="text-base font-semibold text-[var(--color-text-primary)]">{app.app}</span>
                    </div>
                    <div className="flex flex-col pl-[42px]">
                      {app.instances.map(inst => (
                        <label key={inst.id} className="flex items-center gap-2.5 cursor-pointer py-2">
                          <input
                            type="checkbox"
                            checked={selected.has(inst.id)}
                            onChange={() => toggleInstance(inst.id)}
                            className="w-4 h-4 rounded accent-[var(--color-brand-primary)] cursor-pointer shrink-0"
                          />
                          <span className="text-xs font-medium text-[var(--color-text-primary)] w-24 shrink-0">{inst.name}</span>
                          <span className="text-xs text-[var(--color-text-tertiary)] truncate">{inst.url}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-[var(--color-border-muted)] flex flex-col gap-3">
          {selected.size > 0 && (() => {
            const appsWithSelection = APP_INSTANCES.filter(a => a.instances.some(i => selected.has(i.id))).length
            return (
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-text-brand)]">
                  {selected.size} instance{selected.size !== 1 ? 's' : ''} selected across {appsWithSelection} app{appsWithSelection !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-danger)] transition-colors cursor-pointer"
                >
                  Unselect all
                </button>
              </div>
            )
          })()}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="h-10 px-5 rounded-md bg-[var(--color-brand-primary)] border-[1.5px] border-[var(--color-brand-primary)] text-white text-sm font-semibold hover:bg-[var(--color-brand-primary-hover)] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={dismiss}
              className="h-10 px-5 rounded-md bg-transparent border-[1.5px] border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer"
            >
              Discard Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
