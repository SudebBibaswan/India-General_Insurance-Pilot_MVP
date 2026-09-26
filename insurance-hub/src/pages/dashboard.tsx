import { Activity, ArrowRight, CalendarClock, ClipboardCheck, FileText, IndianRupee, ShieldCheck, TriangleAlert, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { getGetActivityQueryKey, getGetDashboardSummaryQueryKey, useGetActivity, useGetDashboardSummary } from '@workspace/api-client-react';
import { AppShell } from '@/components/app-shell';
import { compactMoney, ErrorState, LoadingRows, PageHeader, Panel, StatusPill } from '@/components/ui-kit';

export default function Dashboard() {
  const summary = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const activity = useGetActivity({ query: { queryKey: getGetActivityQueryKey() } });
  const s = summary.data;
  const activities = activity.data ?? [];
  return <AppShell><div className="page-enter">
    <PageHeader eyebrow="Monday, 14 October 2024" title="Good morning, Ananya." description="Your operations desk is clear on the next best actions. Keep every customer moving forward." action={<Link href="/quotes" data-testid="link-dashboard-new-quote" className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-secondary px-3.5 py-2.5 text-xs font-bold text-primary hover:bg-secondary/70"><FileText size={15} />Create a quote</Link>} />
    {summary.isError ? <Panel><ErrorState onRetry={() => summary.refetch()} /></Panel> : <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {[
        { label: 'Active policies', value: s?.activePolicies ?? 0, icon: ShieldCheck, tone: 'teal', note: 'Across all books' },
        { label: 'Open claims', value: s?.openClaims ?? 0, icon: TriangleAlert, tone: 'amber', note: '2 need attention' },
        { label: 'Renewal value', value: compactMoney(s?.renewalValue), icon: CalendarClock, tone: 'blue', note: 'Next 30 days' },
        { label: 'Pending actions', value: s?.pendingActions ?? 0, icon: ClipboardCheck, tone: 'coral', note: 'Across your desk' },
        { label: 'Quote conversion', value: `${s?.quoteConversion ?? 0}%`, icon: TrendingUp, tone: 'green', note: 'This quarter' },
      ].map((item) => <div key={item.label} data-testid={`metric-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="rounded-xl border border-card-border bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="mb-4 flex items-start justify-between"><span className={`grid size-8 place-items-center rounded-lg ${item.tone === 'amber' ? 'bg-[#fff0d6] text-[#a96b1e]' : item.tone === 'coral' ? 'bg-[#fce4e1] text-[#a9473c]' : item.tone === 'blue' ? 'bg-[#e3eff0] text-[#317078]' : 'bg-[#e4f2e6] text-[#287047]'}`}><item.icon size={16} /></span><span className="mono text-[9px] uppercase tracking-[.12em] text-muted-foreground">01 / 05</span></div>
        <div className="text-[25px] font-extrabold tracking-[-.05em]">{summary.isLoading ? <span className="skeleton inline-block h-7 w-16 rounded" /> : item.value}</div><div className="mt-1 text-[11px] font-bold">{item.label}</div><div className="mt-1 text-[10px] text-muted-foreground">{item.note}</div>
      </div>)}
    </div>}
    <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_.9fr]">
      <Panel title="Recent activity" action={<Link href="/claims" data-testid="link-view-activity" className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">View all <ArrowRight size={13} /></Link>}>
        {activity.isError ? <ErrorState onRetry={() => activity.refetch()} /> : activity.isLoading ? <LoadingRows count={4} /> : activities.length === 0 ? <div className="p-5"><div className="rounded-lg bg-muted/50 p-5 text-center text-xs text-muted-foreground">Your activity trail will appear here as work moves through the desk.</div></div> : <div className="divide-y divide-border/70">{activities.slice(0, 6).map((item) => <div key={item.id} data-testid={`activity-${item.id}`} className="flex gap-3.5 px-5 py-4 transition-colors hover:bg-muted/30"><div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Activity size={15} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-extrabold">{item.title}</span><StatusPill value={item.status} /></div><p className="mt-1 text-xs text-muted-foreground">{item.description}</p></div><time className="mono shrink-0 text-[10px] text-muted-foreground">{item.time}</time></div>)}</div>}
      </Panel>
      <Panel title="Book health">
        <div className="p-5">
          <div className="mb-5 flex items-center justify-between"><div><div className="text-3xl font-extrabold tracking-[-.06em]">84<span className="text-base text-muted-foreground">/100</span></div><div className="mt-1 text-xs text-muted-foreground">A dependable book, trending up</div></div><div className="grid size-14 place-items-center rounded-full border-[5px] border-[#9ccf9d] border-r-[#dceadc] text-xs font-extrabold text-[#287047]">+6.4%</div></div>
          <div className="space-y-4">{[{ label: 'Policies in force', value: '92%', width: '92%' }, { label: 'Claims within SLA', value: '78%', width: '78%' }, { label: 'Renewals retained', value: '86%', width: '86%' }].map((row) => <div key={row.label}><div className="mb-1.5 flex justify-between text-[11px] font-bold"><span>{row.label}</span><span className="mono text-muted-foreground">{row.value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: row.width }} /></div></div>)}</div>
          <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground"><IndianRupee size={13} className="text-primary" /> ₹18.4L protected value added this month</div>
        </div>
      </Panel>
    </div>
    <div className="mt-5 grid gap-5 md:grid-cols-3">
      {[{ title: 'Renewals to call', count: 8, copy: 'Customers expiring in the next 30 days', href: '/policies', icon: CalendarClock }, { title: 'Claims desk', count: s?.openClaims ?? 0, copy: 'Open cases waiting for a next step', href: '/claims', icon: TriangleAlert }, { title: 'Quote pipeline', count: s?.pendingActions ?? 0, copy: 'Quotes that could become policies', href: '/quotes', icon: FileText }].map((card) => <Link key={card.title} href={card.href} data-testid={`link-action-${card.title.toLowerCase().replaceAll(' ', '-')}`} className="group rounded-xl border border-card-border bg-card p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"><div className="flex items-center justify-between"><span className="grid size-8 place-items-center rounded-lg bg-muted text-primary"><card.icon size={16} /></span><ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1" /></div><div className="mt-5 text-[22px] font-extrabold tracking-[-.04em]">{card.count}</div><div className="mt-1 text-xs font-extrabold">{card.title}</div><div className="mt-1 text-[11px] text-muted-foreground">{card.copy}</div></Link>)}
    </div>
  </div></AppShell>;
}