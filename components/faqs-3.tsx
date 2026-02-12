'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'clock',
            question: 'What are your operating hours for site visits?',
            answer: 'Our team is available Monday through Friday from 8:00 AM to 6:00 PM for consultations and site visits. Weekend appointments can be scheduled on request.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'How are project payments handled?',
            answer: 'We require a deposit to secure materials and scheduling. Milestone invoices are issued through your account; payments can be made by credit card, bank transfer, or check.',
        },
        {
            id: 'item-3',
            icon: 'truck',
            question: 'Can I expedite material delivery?',
            answer: 'Yes — expedited delivery options are available depending on supplier availability. Additional fees may apply, and we\'ll coordinate delivery windows with your site schedule.',
        },
        {
            id: 'item-4',
            icon: 'map-pin',
            question: 'Do you provide on-site consultations and permit support?',
            answer: 'We offer on-site consultations and can assist with permit submissions in our service areas. For remote projects, we provide virtual consultations as needed.',
        },
        {
            id: 'item-5',
            icon: 'package',
            question: 'How can I track my project materials?',
            answer: 'Once materials are ordered, you\'ll receive tracking information and regular updates via email. You can also view order status in your client dashboard.',
        },
    ]

    return (
        <section className="bg-gray-50 dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-balance text-4xl font-medium lg:text-5xl mb-3">Frequently Asked Questions</h2>
                            <p className="text-sm mt-1 text-gray-500 dark:text-muted-foreground">
                                Can&apos;t find what you&apos;re looking for?<br />
                                Contact our{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4 text-orange-500"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-sm mt-1 text-gray-400 dark:text-muted-foreground">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
