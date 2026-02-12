"use client"
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { ClockFading, ShieldCheck, ClipboardCheck, Clock, Award, Shield } from 'lucide-react'

const LEFT_ITEMS = [
  {
    title: '10+ Years Experience',
    desc: 'Longevity = stability we never disappear with your deposit.',
    Icon: ClockFading,
    position: 'left-top' as const,
  },
  {
    title: 'Licensed & Insured',
    desc: 'Legal proof separates professionals from roadside builders',
    Icon: ShieldCheck,
    position: 'left-middle' as const,
  },
  {
    title: '50+ Projects Completed',
    desc: 'Volume proves you deliver consistently',
    Icon: ClipboardCheck,
    position: 'left-bottom' as const,
  },
]

const RIGHT_ITEMS = [
  {
    title: '95% On-Time Completion',
    desc: "Addresses biggest client fear (delays)",
    Icon: Clock,
    position: 'right-top' as const,
  },
  {
    title: '2-Year Work Warranty',
    desc: 'We stay. We support. We fix. Two years guaranteed.',
    Icon: Award,
    position: 'right-middle' as const,
  },
  {
    title: 'Safety Standards',
    desc: 'We adhere strictly to construction safety guidelines.',
    Icon: Shield,
    position: 'right-bottom' as const,
  },
]

const POSITION_STYLES = {
  'left-top': 'left-full top-1/2 w-[130px] origin-left rotate-[25deg]',
  'left-middle': 'left-full top-1/2 w-[120px] origin-left',
  'left-bottom': 'left-full top-1/2 w-[130px] origin-left rotate-[-25deg]',
  'right-top': 'right-full top-1/2 w-[130px] origin-right rotate-[-25deg]',
  'right-middle': 'right-full top-1/2 w-[120px] origin-right',
  'right-bottom': 'right-full top-1/2 w-[130px] origin-right rotate-[25deg]',
} as const

const useMediaQuery = (query: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setValue(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return value
}

type ItemType = typeof LEFT_ITEMS[0] | typeof RIGHT_ITEMS[0]

const IntegrationCard = ({ children, className, position, isCenter = false }: { children: React.ReactNode; className?: string; position?: keyof typeof POSITION_STYLES; isCenter?: boolean }) => (
  <div className={cn('bg-background relative flex size-12 rounded-xl border dark:bg-transparent', className)}>
    <div className={cn('relative z-20 m-auto size-fit *:size-6', isCenter && '*:size-8')}>{children}</div>
    {position && !isCenter && (
      <div className={cn('bg-linear-to-r to-muted-foreground/25 absolute z-10 h-px', position === 'right-top' || position === 'right-middle' || position === 'right-bottom' ? 'bg-linear-to-l' : '', POSITION_STYLES[position])} />
    )}
  </div>
)

export default function IntegrationsSection() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const ItemCard = ({ item }: { item: ItemType }) => {
    const Icon = item.Icon
    return (
      <div>
        <IntegrationCard position={item.position}>
          <Icon className="h-6 w-6 text-amber-600" />
        </IntegrationCard>
        <div className="mt-2">
          <h3 className="text-sm md:text-base font-semibold">{item.title}</h3>
          <p className="text-sm mt-1 text-gray-500 dark:text-muted-foreground">{item.desc}</p>
        </div>
      </div>
    )
  }


  return (
    <section>
      <div className="bg-white dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, scale: 0.96 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.6, ease: 'easeOut' },
            })}
            className="relative mx-auto flex w-full max-w-3xl items-center justify-center gap-12"
          >
            <div className="space-y-6">
              {LEFT_ITEMS.map((item) => (
                <ItemCard key={item.title} item={item} />
              ))}
            </div>

            <div role="presentation" className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:black] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:[--dots-color:white]" />

            <div className="space-y-6">
              {RIGHT_ITEMS.map((item) => (
                <ItemCard key={item.title} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
