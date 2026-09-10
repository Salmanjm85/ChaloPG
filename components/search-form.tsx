'use client'

import { MapPin, Search, Users, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { cities, searchUrl, type SearchValues } from '@/lib/search'

export function SearchForm({ initial = {}, compact = false }: { initial?: SearchValues; compact?: boolean }) {
  const router = useRouter()
  return <form action="/pgs" onSubmit={event => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as SearchValues
    router.push(searchUrl(values))
  }} className={compact ? 'rounded-2xl border bg-background p-5' : 'search-panel rounded-2xl border border-border/70 bg-background p-3 md:p-4'}>
    <FieldGroup className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0">
      <Field className="min-w-0 flex-[1.1] px-3 sm:border-r md:px-5"><FieldLabel htmlFor="search-city"><MapPin className="size-4 text-primary" />Where are you moving?</FieldLabel><select id="search-city" name="city" defaultValue={initial.city || 'Bengaluru'} className="h-9 w-full bg-transparent text-sm outline-none">{cities.map(city => <option key={city}>{city}</option>)}</select></Field>
      <Field className="min-w-0 flex-1 px-3 sm:border-r md:px-5"><FieldLabel htmlFor="search-budget"><Wallet className="size-4 text-primary" />Monthly budget</FieldLabel><select id="search-budget" name="budget" defaultValue={initial.budget || ''} className="h-9 w-full bg-transparent text-sm text-muted-foreground outline-none"><option value="">Choose your budget</option><option value="8000">Up to ₹8,000</option><option value="12000">Up to ₹12,000</option><option value="18000">Up to ₹18,000</option><option value="25000">Up to ₹25,000</option></select></Field>
      <Field className="min-w-0 flex-1 px-3 md:px-5"><FieldLabel htmlFor="search-sharing"><Users className="size-4 text-primary" />Room preference</FieldLabel><select id="search-sharing" name="sharing" defaultValue={initial.sharing || ''} className="h-9 w-full bg-transparent text-sm text-muted-foreground outline-none"><option value="">Any sharing</option><option value="1">Private room</option><option value="2">Double sharing</option><option value="3">Triple sharing</option></select></Field>
      <Button type="submit" size="lg" className="h-14 px-6"><Search data-icon="inline-start" />Find my PG</Button>
    </FieldGroup>
  </form>
}
