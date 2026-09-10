'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const questions = [
  ['What is ChaloPG?', 'ChaloPG is being built to help you discover PGs, hostels, and co-living spaces and contact their owners directly. Public discovery is available to explore; live listings and accounts are pending service setup.'],
  ['Can I visit a property before deciding?', 'Once live listings and accounts are enabled, you will be able to propose a visit time. A request is not confirmed until the owner accepts it, and an accepted visit does not reserve a room.'],
  ['What should I check before moving in?', 'Confirm monthly rent, the deposit and its refund terms, meal charges, electricity, notice periods, house rules, and bed availability. Visit the property and review any agreement before committing.'],
  ['Are all properties independently verified?', 'No. Publishing a property does not mean it has been independently verified. Check the details with the owner and visit the property before making a decision.'],
  ['Does ChaloPG handle rent or booking payments?', 'No. This version does not accept payments or provide paid bookings. Enquiries and visits are not rental agreements.'],
  ['How do I list my PG?', 'Use “List your PG” to access the owner entry point. Owner registration, photo uploads, and publishing remain unavailable until secure accounts, the database, and storage are configured.'],
]

export function Faq() {
  return <section id="faq" className="shell pb-16"><div className="flex flex-col gap-8 md:flex-row md:gap-20"><div className="flex flex-1 flex-col items-start gap-4"><p className="eyebrow">A little clarity</p><h2 className="section-heading">Before you<br className="hidden md:block" /> make your move.</h2><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">New place, plenty of questions. Let&apos;s start with the essentials.</p></div><Accordion className="flex-[1.6]" multiple>{questions.map(([question, answer], index) => <AccordionItem value={String(index)} key={question}><AccordionTrigger className="py-5">{question}</AccordionTrigger><AccordionContent className="pb-5"><p className="leading-relaxed text-muted-foreground">{answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>
}
