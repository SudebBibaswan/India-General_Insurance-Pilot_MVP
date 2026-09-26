import { Bell, ChevronDown, CircleHelp, LayoutDashboard, UsersRound, FileText, ShieldCheck, TriangleAlert, Settings2, Plus, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useState, type ReactNode } from 'react';

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/customers', label: 'Customers', icon: UsersRound },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/policies', label: 'Policies', icon: ShieldCheck },
  { href: '/claims', label: 'Claims', icon: TriangleAlert },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="app-noise min-h-[100dvh] bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-sidebar-border px-6">
          <Link href="/" data-testid="link-brand" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <div><div className="text-[17px] font-extrabold tracking-tight text-white">CoverPilot</div><div className="mono text-[9px] uppercase tracking-[.18em] text-sidebar-foreground/60">ops workspace</div></div>
          </Link>
          <button onClick={() => setOpen(false)} className="text-sidebar-foreground/60 lg:hidden" aria-label="Close navigation" data-testid="button-close-navigation"><X size={19} /></button>
        </div>
        <div className="px-4 pt-7">
          <div className="mono mb-3 px-3 text-[10px] uppercase tracking-[.2em] text-sidebar-foreground/45">Workspace</div>
          <nav className="space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = href === '/' ? location === '/' : location.startsWith(href);
              return <Link key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-nav-${label.toLowerCase()}`} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors ${active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'}`}>
                <Icon size={17} className={active ? 'text-sidebar-primary' : 'opacity-75'} /> <span>{label}</span>
                {label === 'Claims' && <span className="mono ml-auto rounded-md bg-[#e2ae54]/15 px-1.5 py-0.5 text-[10px] text-sidebar-primary">06</span>}
              </Link>;
            })}
          </nav>
        </div>
        <div className="mt-auto px-4 pb-5">
          <Link href="/settings" onClick={() => setOpen(false)} data-testid="link-nav-settings" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold ${location.startsWith('/settings') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent'}`}>
            <Settings2 size={17} /> <span>Settings</span>
          </Link>
          <div className="mt-5 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3.5">
            <div className="flex items-center justify-between"><span className="mono text-[9px] uppercase tracking-[.16em] text-sidebar-foreground/45">Partner desk</span><span className="size-1.5 rounded-full bg-[#9bcf9d]" /></div>
            <div className="mt-2 text-xs font-semibold text-sidebar-foreground">BharatSure Partners</div>
            <div className="mt-1 text-[11px] text-sidebar-foreground/50">Mumbai · IRDAI 48219</div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 border-t border-sidebar-border pt-4">
            <div className="grid size-8 place-items-center rounded-full bg-[#d7a85f] text-xs font-extrabold text-[#183c3b]">AS</div>
            <div className="min-w-0 flex-1"><div className="truncate text-xs font-bold">Ananya Shah</div><div className="truncate text-[10px] text-sidebar-foreground/50">Operations lead</div></div>
            <ChevronDown size={14} className="text-sidebar-foreground/45" />
          </div>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-[#072929]/45 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" data-testid="button-overlay-menu" />}
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-border/80 bg-background/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-lg border border-border bg-card lg:hidden" aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={18} /></button>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="mono text-[10px] uppercase tracking-[.17em]">BharatSure Partners</span><span>/</span><span className="text-foreground">Workspace</span></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-5">
            <button className="relative grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notifications" data-testid="button-notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" /></button>
            <button className="hidden items-center gap-2 border-l border-border pl-4 text-left sm:flex" data-testid="button-account-menu"><div className="grid size-8 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">AS</div><span className="text-xs font-bold">Ananya Shah</span><ChevronDown size={14} className="text-muted-foreground" /></button>
            <button className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted" aria-label="Help" data-testid="button-help"><CircleHelp size={18} /></button>
          </div>
        </header>
        <main className="min-h-[calc(100dvh-76px)] px-5 py-7 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

export function QuickAdd({ onClick, label }: { onClick: () => void; label: string }) {
  return <button onClick={onClick} data-testid={`button-add-${label.toLowerCase().replaceAll(' ', '-')}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"><Plus size={15} />{label}</button>;
}