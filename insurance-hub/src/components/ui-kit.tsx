import { AlertCircle, ArrowUpRight, Check, ChevronRight, Search, X } from 'lucide-react';
import { type ReactNode } from 'react';

export const money = (value: number | undefined) => value == null ? '—' : `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`;
export const compactMoney = (value: number | undefined) => value == null ? '—' : value >= 10000000 ? `₹${(value / 10000000).toFixed(1)} Cr` : value >= 100000 ? `₹${(value / 100000).toFixed(1)} L` : money(value);
export const shortDate = (value: string | undefined) => value ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)) : '—';
export const initials = (value: string) => value.split(' ').map((v) => v[0]).slice(0, 2).join('').toUpperCase();

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mono mb-2 text-[10px] font-medium uppercase tracking-[.2em] text-primary">{eyebrow}</div><h1 className="text-[27px] font-extrabold tracking-[-.045em] text-foreground sm:text-[31px]">{title}</h1><p className="mt-1.5 max-w-2xl text-[13px] leading-6 text-muted-foreground">{description}</p></div>{action}</div>;
}
export function Panel({ children, className = '', title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return <section className={`rounded-xl border border-card-border bg-card shadow-[var(--shadow-soft)] ${className}`}><>{title && <div className="flex items-center justify-between border-b border-border/70 px-5 py-4"><h2 className="text-[13px] font-extrabold">{title}</h2>{action}</div>}{children}</></section>;
}
export function StatusPill({ value }: { value: string }) {
  const key = value.toLowerCase(); const tone = key.includes('active') || key.includes('approved') || key.includes('settled') || key.includes('issued') || key.includes('won') ? 'good' : key.includes('pending') || key.includes('review') || key.includes('progress') || key.includes('open') ? 'warn' : key.includes('expired') || key.includes('rejected') || key.includes('declined') ? 'bad' : 'neutral';
  return <span data-testid={`status-${value.toLowerCase().replaceAll(' ', '-')}`} className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold capitalize ${tone === 'good' ? 'bg-[#e4f2e6] text-[#287047]' : tone === 'warn' ? 'bg-[#fff0d6] text-[#95601c]' : tone === 'bad' ? 'bg-[#fce4e1] text-[#a93b32]' : 'bg-muted text-muted-foreground'}`}><span className="size-1.5 rounded-full bg-current" />{value}</span>;
}
export function SearchBox({ value, onChange, placeholder = 'Search records' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <div className="relative"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} data-testid="input-search" className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-[250px]" /></div>;
}
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="mb-4 grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><ArrowUpRight size={20} /></div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}
export function ErrorState({ onRetry, label = 'We could not load this workspace.' }: { onRetry: () => void; label?: string }) {
  return <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="mb-3 grid size-10 place-items-center rounded-full bg-[#fce4e1] text-destructive"><AlertCircle size={18} /></div><p className="text-sm font-bold">{label}</p><button onClick={onRetry} data-testid="button-retry" className="mt-4 rounded-lg border border-border px-3 py-2 text-xs font-bold hover:bg-muted">Try again</button></div>;
}
export function LoadingRows({ count = 5 }: { count?: number }) {
  return <div className="divide-y divide-border/70">{Array.from({ length: count }).map((_, i) => <div key={i} className="flex items-center gap-4 px-5 py-4"><div className="skeleton size-9 rounded-full" /><div className="flex-1 space-y-2"><div className="skeleton h-3 w-1/3 rounded" /><div className="skeleton h-2.5 w-1/5 rounded" /></div><div className="skeleton h-6 w-16 rounded-full" /></div>)}</div>;
}
export function Field({ label, name, value, onChange, placeholder, type = 'text', required = true }: { label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="mb-1.5 block text-[11px] font-bold text-foreground">{label}{required && <span className="ml-0.5 text-destructive">*</span>}</span><input name={name} required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} data-testid={`input-${name}`} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" /></label>;
}
export function Modal({ title, description, children, onClose }: { title: string; description: string; children: ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#073332]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"><div className="max-h-[92dvh] w-full overflow-auto rounded-t-2xl border border-border bg-card shadow-2xl sm:max-w-[510px] sm:rounded-2xl"><div className="flex items-start justify-between border-b border-border px-5 py-4"><div><h2 className="text-base font-extrabold">{title}</h2><p className="mt-1 text-xs text-muted-foreground">{description}</p></div><button onClick={onClose} aria-label="Close dialog" data-testid="button-close-dialog" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><X size={17} /></button></div>{children}</div></div>;
}
export function ToastMessage({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-lg bg-sidebar px-3.5 py-3 text-xs font-bold text-sidebar-foreground shadow-xl"><Check size={15} className="text-sidebar-primary" />{message}<button onClick={onDismiss} aria-label="Dismiss notification" data-testid="button-dismiss-toast"><X size={14} className="ml-2 opacity-50" /></button></div>;
}
export function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} data-testid="select-filter" className="h-10 rounded-lg border border-input bg-card px-3 text-xs font-semibold outline-none focus:border-primary">{options.map((o) => <option value={o} key={o}>{o}</option>)}</select>;
}
export function RowArrow() { return <ChevronRight size={16} className="text-muted-foreground/50" />; }