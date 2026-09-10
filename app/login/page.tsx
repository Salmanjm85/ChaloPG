import type { Metadata } from 'next'
import { AuthEntry } from '@/components/auth-entry'
import { safeReturnPath } from '@/lib/search'
export const metadata: Metadata = { title: 'Log in', robots: { index: false, follow: false } }
export default async function Login({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <AuthEntry next={safeReturnPath(params.next)} />
}
