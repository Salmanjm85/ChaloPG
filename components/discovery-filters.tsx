'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { amenities, cities, propertyTypes, searchUrl, type SearchValues } from '@/lib/search'

export function DiscoveryFilters({ values }: { values: SearchValues }) {
  const router = useRouter()
  return <form action="/pgs" className="rounded-2xl border bg-background p-5" onSubmit={event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next = Object.fromEntries(data.entries()) as SearchValues
    next.amenities = data.getAll('amenities').join(',')
    router.push(searchUrl(next))
  }}><div className="flex items-center justify-between pb-5"><h2 className="inline-flex items-center gap-2 text-base font-semibold"><SlidersHorizontal className="size-4" />Your preferences</h2><Link href="/pgs" className="text-sm text-primary underline underline-offset-4">Reset</Link></div><FieldGroup>
    <Field><FieldLabel htmlFor="city">City</FieldLabel><select className="control" id="city" name="city" defaultValue={values.city}>{cities.map(c => <option key={c}>{c}</option>)}</select></Field>
    <Field><FieldLabel htmlFor="locality">Locality</FieldLabel><Input id="locality" name="locality" maxLength={100} defaultValue={values.locality || ''} placeholder="e.g. Koramangala" className="h-11" /></Field>
    <Field><FieldLabel htmlFor="type">Property type</FieldLabel><select className="control" id="type" name="type" defaultValue={values.type || ''}><option value="">All types</option>{propertyTypes.map(type => <option key={type}>{type}</option>)}</select></Field>
    <Field><FieldLabel htmlFor="budget">Maximum monthly rent</FieldLabel><select className="control" id="budget" name="budget" defaultValue={values.budget || ''}><option value="">Any budget</option>{[8000, 12000, 18000, 25000].map(budget => <option key={budget} value={budget}>₹{budget.toLocaleString('en-IN')}</option>)}</select></Field>
    <Field><FieldLabel htmlFor="sharing">Room sharing</FieldLabel><select className="control" id="sharing" name="sharing" defaultValue={values.sharing || ''}><option value="">Any sharing</option><option value="1">Private room</option><option value="2">Double sharing</option><option value="3">Triple sharing</option></select></Field>
    <Field><FieldLabel htmlFor="gender">Gender policy</FieldLabel><select className="control" id="gender" name="gender" defaultValue={values.gender || ''}><option value="">Any policy</option><option value="women">Women</option><option value="men">Men</option><option value="all">All genders</option></select></Field>
    <FieldSet><FieldLegend variant="label">Amenities</FieldLegend><FieldGroup>{amenities.map(amenity => <Field key={amenity} orientation="horizontal"><input type="checkbox" className="size-4 accent-primary" id={`amenity-${amenity}`} name="amenities" value={amenity} defaultChecked={values.amenities?.split(',').includes(amenity)} /><FieldLabel htmlFor={`amenity-${amenity}`}>{amenity}</FieldLabel></Field>)}</FieldGroup></FieldSet>
    <Field><FieldLabel htmlFor="availability">Availability</FieldLabel><select className="control" id="availability" name="availability" defaultValue={values.availability || ''}><option value="">Any availability</option><option value="available">Available beds only</option></select></Field>
    <Field><FieldLabel htmlFor="sort">Sort results</FieldLabel><select className="control" id="sort" name="sort" defaultValue={values.sort || 'newest'}><option value="newest">Newest first</option><option value="price-asc">Rent: low to high</option><option value="price-desc">Rent: high to low</option></select></Field>
    <input type="hidden" name="view" value={values.view || 'list'} />
    <Button type="submit" className="h-11"><Search data-icon="inline-start" />Apply filters</Button>
  </FieldGroup></form>
}
