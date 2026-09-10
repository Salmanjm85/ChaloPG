import { redirect } from 'next/navigation'
export default function OwnerPage() { redirect('/login?next=%2Fowner') }
