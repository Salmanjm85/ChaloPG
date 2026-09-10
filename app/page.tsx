import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero, CitySection, SpaceSection, HowItWorks, OwnerCta } from '@/components/home-sections'
import { Faq } from '@/components/faq'

export default function Page() {
  return <><SiteHeader /><main id="main"><Hero /><CitySection /><SpaceSection /><HowItWorks /><OwnerCta /><Faq /></main><SiteFooter /></>
}
