'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, House, MapPin, Menu, Plus, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cities } from '@/lib/search'
import { cn } from '@/lib/utils'

export function Brand() {
  return <Link href="/" aria-label="ChaloPG home" className="inline-flex shrink-0 items-center gap-2"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><House className="size-5" strokeWidth={2.2} /></span><span className="text-2xl font-extrabold tracking-tighter">chalo<span className="text-primary">PG</span><span className="text-primary">.</span></span></Link>
}

export function SiteHeader({ city = 'Bengaluru' }: { city?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  return <header className="relative z-20 border-b border-border/60 bg-background">
    <div className="shell flex h-20 items-center justify-between gap-5">
      <div className="flex items-center gap-7"><Brand /><div className="hidden items-center gap-1 border-l pl-6 lg:flex"><MapPin className="size-4 text-primary" /><label htmlFor="header-city" className="sr-only">Select city</label><select id="header-city" value={city} onChange={e => router.push(`/pgs?city=${encodeURIComponent(e.target.value)}`)} className="max-w-32 bg-transparent text-sm font-medium outline-none">{cities.map(c => <option key={c}>{c}</option>)}</select></div></div>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex"><Link className={cn('text-sm font-medium transition-colors hover:text-primary', pathname === '/pgs' && 'text-primary')} href="/pgs">Find a PG</Link><Link className="text-sm font-medium hover:text-primary" href="/#how-it-works">How it works</Link><Link className={cn(buttonVariants({ variant: 'outline' }), 'h-10 px-4')} href="/owner"><Plus data-icon="inline-start" />List your PG</Link><Link href="/login" className="text-sm font-semibold hover:text-primary">Log in <ArrowUpRight className="ml-1 inline size-4" /></Link></nav>
      <div className="flex items-center gap-3 md:hidden"><Link href="/owner" className="text-sm font-semibold text-primary">List your PG</Link><Button variant="ghost" size="icon-lg" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="shell flex flex-col gap-4 border-t py-5 md:hidden"><Link onClick={() => setOpen(false)} href="/pgs">Find a PG</Link><Link onClick={() => setOpen(false)} href="/#how-it-works">How it works</Link><Link onClick={() => setOpen(false)} href="/login">Log in</Link><Link onClick={() => setOpen(false)} href="/signup">Create an account</Link></nav>}
  </header>
}
