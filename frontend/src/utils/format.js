// Small, dependency-free formatters. We avoid Intl/toLocaleString on purpose:
// Hermes/Android and web disagree on locale support, and the design needs a
// fixed "10 Aug 26" / "11:50 PM" style either way.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 1500 -> "₹ 1,500", 150000 -> "₹ 1,50,000" (Indian digit grouping). */
export function formatINR(amount) {
  const n = Math.round(Number(amount) || 0);
  const s = String(Math.abs(n));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}` : last3;
  return `₹ ${n < 0 ? '-' : ''}${grouped}`;
}

/** ISO string -> "10 Aug 26" (device-local time). Returns null for missing/invalid input. */
export function formatShortDate(value) {
  const d = toDate(value);
  if (!d) return null;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
}

/** ISO string -> "11:50 PM" (device-local time). */
export function formatTime(value) {
  const d = toDate(value);
  if (!d) return null;
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${suffix}`;
}

export function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
