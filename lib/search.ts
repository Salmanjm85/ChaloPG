export const cities = ['Bengaluru', 'Pune', 'Hyderabad', 'Delhi-NCR'] as const
export const propertyTypes = ['PG', 'Hostel', 'Co-living'] as const
export const amenities = ['Wi-Fi', 'Meals', 'Laundry', 'Air conditioning', 'Power backup', 'Parking'] as const
export type SearchValues = Record<string, string>
export function normalizeSearch(raw: Record<string, string | string[] | undefined>): SearchValues {
  const result: SearchValues = {}
  for (const key of ['city', 'locality', 'budget', 'sharing', 'type', 'gender', 'availability', 'sort', 'view', 'amenities']) {
    const value = raw[key]
    if (typeof value === 'string' && value.length <= 200) result[key] = value
  }
  if (!cities.includes(result.city as typeof cities[number])) result.city = 'Bengaluru'
  if (result.budget && !['8000', '12000', '18000', '25000'].includes(result.budget)) delete result.budget
  if (result.type && !propertyTypes.includes(result.type as typeof propertyTypes[number])) delete result.type
  return result
}
export function searchUrl(values: SearchValues) {
  return `/pgs?${new URLSearchParams(Object.entries(values).filter(([, value]) => Boolean(value))).toString()}`
}
export function safeReturnPath(value: string | string[] | undefined) {
  return typeof value === 'string' && /^\/(owner|account)(\/|\?|$)/.test(value) && !value.includes('\\') ? value : '/account'
}
