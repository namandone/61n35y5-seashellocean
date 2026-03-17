import { useState } from 'react'

interface LoginEntry {
  id: number
  status: 'success' | 'failed'
  time: string
  ip: string
  browser: string
  device: string
}

const HISTORY: LoginEntry[] = [
  // Page 1
  { id:  1, status: 'success', time: '17 Mar 2026  14:43:21', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  { id:  2, status: 'success', time: '15 Mar 2026  09:12:04', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  { id:  3, status: 'failed',  time: '14 Mar 2026  22:07:33', ip: '185.220.101.34',  browser: 'Firefox 124', device: 'Windows' },
  { id:  4, status: 'success', time: '14 Mar 2026  08:55:17', ip: '103.21.58.92',    browser: 'Safari 17',   device: 'iPhone 15' },
  { id:  5, status: 'success', time: '12 Mar 2026  11:30:09', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  { id:  6, status: 'success', time: '10 Mar 2026  16:44:52', ip: '49.36.114.7',     browser: 'Chrome 144',  device: 'Windows' },
  { id:  7, status: 'failed',  time: '09 Mar 2026  03:21:18', ip: '91.108.4.55',     browser: 'Unknown',     device: 'Unknown' },
  { id:  8, status: 'success', time: '07 Mar 2026  10:02:45', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  // Page 2
  { id:  9, status: 'success', time: '05 Mar 2026  14:17:33', ip: '103.21.58.92',    browser: 'Safari 17',   device: 'iPhone 15' },
  { id: 10, status: 'success', time: '02 Mar 2026  09:48:21', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  { id: 11, status: 'failed',  time: '28 Feb 2026  23:14:07', ip: '185.220.101.34',  browser: 'Firefox 124', device: 'Windows' },
  { id: 12, status: 'success', time: '25 Feb 2026  11:29:44', ip: '49.36.114.7',     browser: 'Chrome 144',  device: 'Windows' },
  { id: 13, status: 'success', time: '20 Feb 2026  08:03:56', ip: '103.21.58.92',    browser: 'Chrome 145',  device: 'Mac' },
  { id: 14, status: 'failed',  time: '15 Feb 2026  02:47:12', ip: '91.108.4.55',     browser: 'Unknown',     device: 'Unknown' },
  { id: 15, status: 'success', time: '10 Feb 2026  15:33:28', ip: '103.21.58.92',    browser: 'Safari 17',   device: 'Mac' },
  { id: 16, status: 'success', time: '05 Feb 2026  10:11:09', ip: '49.36.114.7',     browser: 'Chrome 143',  device: 'Windows' },
]

const PER_PAGE = 8

interface Props {
  onClose: () => void
}

export function LoginHistoryDrawer({ onClose }: Props) {
  const [closing, setClosing] = useState(false)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(HISTORY.length / PER_PAGE)
  const start = page * PER_PAGE
  const end = Math.min(start + PER_PAGE, HISTORY.length)
  const entries = HISTORY.slice(start, end)

  const dismiss = () => {
    setClosing(true)
    setTimeout(onClose, 210)
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
          <div className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ letterSpacing: '-0.3px' }}>Login History</div>
          <button
            onClick={dismiss}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Entry list */}
        <div className="flex-1 overflow-y-auto px-6">
          {entries.map((entry, i) => {
            const success = entry.status === 'success'
            return (
              <div
                key={entry.id}
                className={`py-3.5 flex flex-col gap-1 ${i < entries.length - 1 ? 'border-b border-[var(--color-border-muted)]' : ''}`}
              >
                {/* Status */}
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${success ? 'text-[var(--color-green-200)]' : 'text-[var(--color-text-danger)]'}`}>
                  {success ? (
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0">
                      <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0">
                      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  )}
                  {success ? 'Successful Login' : 'Failed Attempt'}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-0.5 pl-[22px]">
                  <span className="text-xs text-[var(--color-text-secondary)]">{entry.time}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{entry.ip} · {entry.browser} on {entry.device}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination footer — prev · showing X–Y of N · next */}
        <div className="shrink-0 px-6 py-3.5 border-t border-[var(--color-border-muted)] flex items-center justify-between gap-3">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span className="text-xs text-[var(--color-text-secondary)] text-center">
            Showing {start + 1}–{end} of {HISTORY.length} attempts
          </span>

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages - 1}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
