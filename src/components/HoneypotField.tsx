import { HONEYPOT_FIELD } from '@/lib/anti-spam'

/**
 * Hidden anti-bot field. Positioned off-screen (not display:none) so naive
 * form-fillers still populate it. Server actions silently drop submissions
 * where this has a value. See src/lib/anti-spam.ts.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Company website
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}
