import { ReactNode } from 'react'

/**
 * FieldLabel — shared input label component.
 *
 * Convention:
 *   - Always use <FieldLabel> above an input, never a raw <label> or <div>
 *   - Label–input gap comes from FieldLabel's own mb-1 (4px) — do NOT add
 *     gap-* or mt-* on the field wrapper
 *   - Required fields: no marker (all fields are implicitly required unless noted)
 *   - Optional fields: append " (Optional)" inside the label text
 */
export const FieldLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-1">
    {children}
  </div>
)
