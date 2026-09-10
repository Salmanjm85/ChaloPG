import Link from 'next/link'
import { House } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { buttonVariants } from '@/components/ui/button'
export default function NotFound() {
  return <><SiteHeader /><main id="main" className="shell flex min-h-[65vh] flex-col items-center justify-center gap-5 py-16 text-center"><House className="size-10 text-primary" /><p className="eyebrow">A little off the beaten path</p><h1 className="section-heading">This space isn&apos;t available.</h1><p className="max-w-md text-sm leading-relaxed text-muted-foreground">The page or property could not be found. Live property listings are awaiting platform setup.</p><Link href="/pgs" className={buttonVariants()}>Back to discovery</Link></main><SiteFooter /></>
}
