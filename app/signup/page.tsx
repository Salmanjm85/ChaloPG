import type { Metadata } from 'next'
import { AuthEntry } from '@/components/auth-entry'
import { safeReturnPath } from '@/lib/search'
export const metadata: Metadata = { title: 'Create your account', robots: { index: false, follow: false } }
export default async function Signup({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <AuthEntry signup next={safeReturnPath(params.next)} />
}
