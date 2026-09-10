import { redirect } from 'next/navigation'
export default function AccountPage() { redirect('/login?next=%2Faccount') }
