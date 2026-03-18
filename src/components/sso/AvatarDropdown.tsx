import type { ReactNode } from 'react'

interface MenuItem {
  icon: ReactNode
  label: string
  danger?: boolean
  onClick: () => void
}

interface AvatarDropdownProps {
  name: string
  roleLabel: string
  roleBg: string
  roleText: string
  items: MenuItem[]
}

export const AvatarDropdown = ({ name, roleLabel, roleBg, roleText, items }: AvatarDropdownProps) => (
  <div className="absolute top-[calc(100%+10px)] right-0 w-[230px] bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] z-50 overflow-hidden">
    {/* User info */}
    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
        style={{ background: 'var(--gradient-avatar-primary)' }}
      >
        {name.charAt(0)}
      </div>
      <div>
        <div className="text-base font-medium text-[var(--color-text-primary)]">{name}</div>
        <span
          className="text-xs font-semibold rounded-full px-2 py-0.5 mt-1 inline-block"
          style={{ background: roleBg, color: roleText }}
        >
          {roleLabel}
        </span>
      </div>
    </div>

    {/* Menu items */}
    <div className="border-t border-[var(--color-border-muted)] pt-1.5 pb-1.5">
      {items.map(({ icon, label, danger, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-left cursor-pointer transition-colors ${
            danger
              ? 'text-[var(--color-text-danger)] hover:bg-[var(--color-bg-danger)]'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]'
          }`}
        >
          <span aria-hidden="true">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  </div>
)
