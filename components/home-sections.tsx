import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, BedDouble, Building2, CalendarDays, Check, HeartHandshake, House, MapPin, MessageSquare, ReceiptText, Search, Trees, Users } from 'lucide-react'
import { SearchForm } from '@/components/search-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { cities } from '@/lib/search'

export function Hero() {
  return <section className="bg-secondary pb-10 pt-8 md:pb-12 md:pt-12">
    <div className="shell">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        <div className="hero-enter flex w-full flex-1 flex-col items-start gap-6 py-3 lg:py-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-3 py-1.5 text-sm font-medium text-primary"><House className="size-3.5" />A new city. A place that feels like you.</span>
          <h1 className="text-balance text-5xl leading-[1.13] font-semibold tracking-[-0.055em] md:text-6xl xl:text-7xl">Find a place.<br /><span className="text-primary">Feel at home.</span></h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">Your next chapter deserves the right address. Discover PGs and co-living spaces near work, campus, and everything you love.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 pt-1 text-sm font-medium"><span className="inline-flex items-center gap-2"><Check className="size-4 text-primary" />Your budget</span><span className="inline-flex items-center gap-2"><Check className="size-4 text-primary" />Your neighbourhood</span><span className="inline-flex items-center gap-2"><Check className="size-4 text-primary" />Your kind of space</span></div>
          <a href="#find-your-space" className="hidden items-center gap-2 text-sm text-muted-foreground lg:inline-flex">Let&apos;s find your next home <ArrowDown className="size-4" /></a>
        </div>
        <figure className="hero-enter-delayed relative w-full lg:w-[47%]">
          <div className="relative aspect-[1.25] overflow-hidden rounded-[28px] lg:aspect-[1.16]"><Image src="/images/chalopg-home.png" alt="A sunlit shared living room with a green sofa, books and space to unwind" fill priority sizes="(max-width: 1024px) 90vw, 550px" className="object-cover" /></div>
          <figcaption className="absolute bottom-5 left-5 flex max-w-[85%] items-center gap-3 rounded-xl border border-border/40 bg-background/95 px-4 py-3 shadow-sm"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary"><HeartHandshake className="size-5" /></span><span className="flex flex-col gap-0.5"><strong className="text-sm font-semibold">More than a room.</strong><span className="text-sm text-muted-foreground">A little space to call your own.</span></span></figcaption>
        </figure>
      </div>
      <div className="relative pt-8 lg:pt-9"><SearchForm /></div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-6 text-sm"><span className="text-muted-foreground">Popular in Bengaluru:</span>{['Koramangala', 'Whitefield', 'HSR Layout', 'Electronic City'].map(locality => <Link key={locality} href={`/pgs?city=Bengaluru&locality=${encodeURIComponent(locality)}`} className="border-b border-foreground/25 pb-0.5 hover:text-primary">{locality}</Link>)}</div>
    </div>
  </section>
}

const cityDetails = [
  { icon: Trees, detail: 'Big ideas. Greener neighbourhoods.' },
  { icon: Building2, detail: 'Campus life meets city life.' },
  { icon: House, detail: 'New opportunities. Familiar warmth.' },
  { icon: Building2, detail: 'A new chapter in the capital.' },
]

export function CitySection() {
  return <section className="shell py-14 md:py-16" aria-labelledby="city-heading"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"><div className="flex flex-col gap-3"><p className="eyebrow">New city, new beginnings</p><h2 id="city-heading" className="section-heading">Where&apos;s life taking you?</h2></div><span className="text-sm text-muted-foreground">Find your corner of the city.</span></div><div className="grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2 lg:grid-cols-4">{cities.map((city, index) => { const Icon = cityDetails[index].icon; return <Link key={city} href={`/pgs?city=${encodeURIComponent(city)}`} className="group flex items-center gap-4 rounded-2xl border bg-background p-5 transition-colors hover:border-primary/35 hover:bg-accent/50"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><Icon className="size-6" strokeWidth={1.5} /></span><div className="flex flex-1 flex-col gap-1"><h3 className="text-base font-bold">{city}</h3><p className="text-sm text-muted-foreground">Explore spaces</p></div><ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link> })}</div></section>
}

const spaces = [
  { title: 'A PG that fits your everyday', type: 'PG', label: 'Paying guest', description: 'Room to settle in, close to the things that matter.', image: '/images/shared-room.png', icon: BedDouble },
  { title: 'Good company. Great beginnings.', type: 'Hostel', label: 'Hostels', description: 'Shared spaces for your campus-to-city chapter.', image: '/images/private-room.png', icon: Users },
  { title: 'Your space. A shared way of life.', type: 'Co-living', label: 'Co-living', description: 'A little independence, a little community.', image: '/images/chalopg-home.png', icon: House },
]

export function SpaceSection() {
  return <section id="find-your-space" className="border-y border-border/60 bg-secondary/60 py-14 md:py-16"><div className="shell"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"><div className="flex flex-col gap-3"><p className="eyebrow">Make yourself at home</p><h2 className="section-heading">A space for every kind of you.</h2></div><Link href="/pgs" className="text-link">Explore all spaces <ArrowRight className="size-4" /></Link></div><div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">{spaces.map(space => <Link key={space.type} href={`/pgs?type=${space.type}`} className="group overflow-hidden rounded-2xl border border-border/60 bg-background"><div className="relative aspect-[1.55] overflow-hidden"><Image src={space.image} alt={`Illustrative ${space.label.toLowerCase()} accommodation interior`} fill sizes="(max-width: 768px) 90vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="flex flex-col gap-3 p-5"><span className="flex items-center gap-2 text-sm text-primary"><space.icon className="size-4" />{space.label}</span><h3 className="text-lg font-semibold tracking-tight">{space.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{space.description}</p><span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold">Explore {space.label.toLowerCase()}<ArrowUpRight className="size-4 text-primary" /></span></div></Link>)}</div><p className="pt-5 text-sm text-muted-foreground">Images illustrate accommodation styles, not available properties. Live inventory is not connected yet.</p></div></section>
}

const benefits = [
  { icon: MapPin, title: 'Less commute. More you.', text: 'Start with the neighbourhoods near your campus, office, and everyday essentials.' },
  { icon: ReceiptText, title: 'Know what you’re comparing.', text: 'Look beyond rent. Ask about deposits, meals, electricity, and any extra charges.' },
  { icon: MessageSquare, title: 'A conversation, not a commitment.', text: 'Ask questions and arrange a visit before deciding whether a place feels right.' },
]

export function HowItWorks() {
  return <><section className="shell py-16"><div className="grid grid-cols-1 gap-9 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex flex-col items-start gap-4"><span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary"><Icon className="size-6" strokeWidth={1.5} /></span><h3 className="text-lg font-semibold">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></section><section id="how-it-works" className="bg-accent/60 py-14 md:py-16"><div className="shell"><div className="flex flex-col gap-3 text-center"><p className="eyebrow">Less searching. More settling in.</p><h2 className="section-heading">Your next chapter, in three steps.</h2><p className="text-sm leading-relaxed text-muted-foreground">Here&apos;s how enquiries work once listings go live.</p></div><div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">{[{ icon: Search, title: 'Find your fit', text: 'Choose a neighbourhood, set your budget, and compare your room preferences.' }, { icon: CalendarDays, title: 'Ask. Visit. Get a feel.', text: 'Send the owner an enquiry or propose a visit. Wait for their confirmation before heading over.' }, { icon: House, title: 'Make your own decision', text: 'See the space, discuss the details directly, and decide what feels like home.' }].map(({ icon: Icon, title, text }, i) => <div key={title} className="flex flex-col items-center gap-4 text-center"><div className="flex items-center gap-3"><span className="text-sm font-semibold text-primary">0{i + 1}</span><Icon className="size-6 text-primary" strokeWidth={1.5} /></div><h3 className="text-lg font-semibold">{title}</h3><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div><p className="pt-9 text-center text-sm text-muted-foreground">A visit request is not a booking. ChaloPG does not collect payments.</p></div></section></>
}

export function OwnerCta() {
  return <section className="shell py-16"><div className="flex flex-col overflow-hidden rounded-3xl bg-primary text-primary-foreground md:flex-row"><div className="flex flex-1 flex-col items-start gap-5 p-8 md:p-12"><span className="text-sm font-medium text-primary-foreground/75">FOR PROPERTY OWNERS</span><h2 className="text-balance text-3xl leading-tight font-semibold tracking-tight md:text-4xl">Your property.<br />Someone&apos;s next home.</h2><p className="max-w-sm text-pretty text-sm leading-relaxed text-primary-foreground/80">Give your PG, hostel, or co-living space a place to be discovered. Get ready to connect with people looking in your neighbourhood.</p><Link href="/owner" className={cn(buttonVariants({ variant: 'secondary' }), 'h-11 px-5')}>List your PG <ArrowUpRight data-icon="inline-end" /></Link></div><div className="relative min-h-64 md:w-[42%]"><Image src="/images/private-room.png" alt="A comfortable room ready for its next resident" fill sizes="(max-width: 768px) 90vw, 450px" className="object-cover" /></div></div></section>
}
