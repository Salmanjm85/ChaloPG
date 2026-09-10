import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'ChaloPG — Find a place. Feel at home.', template: '%s | ChaloPG' },
  description: 'Discover PGs, hostels and co-living spaces near your campus or workplace. Find your kind of space with ChaloPG.',
  applicationName: 'ChaloPG',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`light bg-background ${manrope.variable}`}><body className="font-sans"><a className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-background focus:p-4" href="#main">Skip to content</a>{children}</body></html>
}
