import { useState } from 'react'

/**
 * EnterpriseSwitcher — full-height slide-in drawer for switching the active enterprise.
 *
 * Usage:
 *   <EnterpriseSwitcher enterprise={enterprise} onSwitch={handleSwitch} onClose={handleClose} />
 *
 * onSwitch is called with the new enterprise name. The caller is responsible for
 * closing the drawer and any post-switch navigation or toast.
 */

export const ENTERPRISES = [
  { id: 'esther', name: 'Esther Fashions',  code: 'ESF-001', initial: 'E', color: 'linear-gradient(135deg,#5a8fe8,#3b6fd4)' },
  { id: 'laksh',  name: 'Laksh Apparels',   code: 'LKA-002', initial: 'L', color: 'linear-gradient(135deg,#6dbb5a,#4f7c3f)' },
  { id: 'aria',   name: 'Aria Retail Co.',  code: 'ARC-003', initial: 'A', color: 'linear-gradient(135deg,#e87a5a,#c95032)' },
]

interface Props {
  enterprise: string
  onSwitch: (name: string) => void
  onClose: () => void
}

export function EnterpriseSwitcher({ enterprise, onSwitch, onClose }: Props) {
  const [closing, setClosing] = useState(false)

  const dismiss = () => {
    setClosing(true)
    setTimeout(onClose, 210)
  }

  const handleSwitch = (name: string) => {
    setClosing(true)
    setTimeout(() => onSwitch(name), 210)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[190] bg-black/30 backdrop-blur-[1px] ${closing ? 'overlay-out' : 'overlay-in'}`}
        onClick={dismiss}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[400px] bg-white z-[200] flex flex-col shadow-[var(--shadow-xl)] ${closing ? 'slide-out-right' : 'slide-in-right'}`}
        style={{ borderRadius: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 shrink-0">
          <div className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Switch Enterprise</div>
          <button
            onClick={dismiss}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Enterprise list */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-2">Your Enterprises</p>
          {ENTERPRISES.map(ent => {
            const isActive = ent.name === enterprise
            return (
              <button
                key={ent.id}
                onClick={() => isActive ? dismiss() : handleSwitch(ent.name)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-bg-brand-subtle)] border-[var(--color-border-brand)]'
                    : 'bg-white border-[var(--color-border-muted)] hover:border-[var(--color-border-default)] hover:bg-[var(--color-bg-subtle)]'
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: ent.color }}
                >
                  {ent.initial}
                </div>

                {/* Name + code */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-sm font-semibold truncate ${isActive ? 'text-[var(--color-text-brand)]' : 'text-[var(--color-text-primary)]'}`}>
                    {ent.name}
                  </span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{ent.code}</span>
                </div>

                {/* Active checkmark */}
                {isActive && (
                  <div className="shrink-0 text-[var(--color-text-brand)]">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
