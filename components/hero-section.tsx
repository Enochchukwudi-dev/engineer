"use client"
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Construction, FilePenLine, Hammer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { motion, AnimatePresence } from "motion/react"

const BG_IMAGES = [
  { src: '/hulu.png', duration: 4500 },
  { src: '/hulu2.png', duration: 4500 },
  { src: '/hulu3.png', duration: 4500 },
]

const MARQUEE_IMAGES = [
  { src: '/conc1.jpeg', alt: 'construction 1' },
  { src: '/conc2.jpeg', alt: 'construction 2' },
  { src: '/conc3.jpeg', alt: 'construction 3' },
  { src: '/conc4.jpeg', alt: 'construction 4' },
  { src: '/inte1.jpeg', alt: 'construction extra 1' },
  { src: '/inte2.jpeg', alt: 'construction extra 2' },
  { src: '/inte3.jpeg', alt: 'construction extra 3' },
  { src: '/inte4.jpeg', alt: 'construction extra 4' },
  { src: '/inte5.jpeg', alt: 'construction extra 5' },
  { src: '/inte6.jpeg', alt: 'construction extra 6' },
]

const HERO_TEXT = [
  { key: 'quality', text: 'Quality', className: 'font-light mr-2 inline-block text-gray-700 dark:text-gray-400' },
  { key: 'delivered', text: 'Construction Delivered On', className: 'text-4xl md:text-5xl font-normal' },
  { key: 'time', text: 'Time & On Budget', className: 'text-5xl md:text-7xl font-bold ml-2 inline-block  text-black dark:text-orange-100' },
]

const FOOTER_ITEMS = [    
  {
    Icon: Construction,
    parts: [{ text: 'Marock Construction Enterprise', className: 'font-semibold text-gray-600 dark:text-gray-300' }],
  },
  {
    Icon: FilePenLine,
    parts: [
      { text: 'CAC Registered • ', className: 'text-gray-600 dark:text-gray-400' },
      { text: '3492332', className: 'font-semibold text-gray-600 dark:text-orange-100' },
    ],
  },
  {
    Icon: Hammer,
    parts: [{ text: 'Led by Engr. Marshal Uzor', className: 'text-gray-600 dark:text-gray-400' }],
  },
]

const TRANSITION_VARIANTS = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring' as const, bounce: 0.3, duration: 1.5 },
    },
  },
}

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

export default function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const timer = setTimeout(() => setBgIndex(i => (i + 1) % BG_IMAGES.length), BG_IMAGES[bgIndex].duration)
    return () => clearTimeout(timer)
  }, [bgIndex])

  // Use consistent opacity on both server and client to avoid hydration mismatch
  const bgOpacity = 0.4


  return (
    <main className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 isolate hidden contain-strict lg:block">
        {[87.5, 0, 87.5].map((y, i) => (
          <div
            key={i}
            className={`absolute left-0 top-0 -rotate-45 rounded-full ${
              i === 0 ? 'w-140 h-320 -translate-y-87.5 bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' :
              i === 1 ? 'w-60 h-320 [translate:5%_-50%] bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' :
              'w-60 h-320 -translate-y-87.5 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]'
            }`}
          />
        ))}
      </div>

      <section className="relative pt-24">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="sm:mx-auto lg:mr-auto lg:mt-0 relative">
            {prefersReducedMotion ? (
              <Image
                src={BG_IMAGES[bgIndex].src}
                alt=""
                width={700}
                height={620}
                className="absolute left-1/2 -translate-x-1/2 sm:left-[65%] sm:-translate-x-1/2 -top-12 sm:top-4 -z-10 opacity-30 sm:opacity-50 dark:opacity-30 pointer-events-none select-none w-[120%] sm:w-auto max-w-none sm:max-w-[65%] md:max-w-[75%] lg:max-w-[85%] xl:max-w-[95%]"
                priority
                aria-hidden
              />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={bgIndex}
                  initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
                  animate={{ opacity: bgOpacity, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 sm:left-[65%] sm:-translate-x-1/2 -top-12 sm:top-4 -z-10 pointer-events-none select-none w-[120%] sm:w-auto max-w-none sm:max-w-[65%] md:max-w-[75%] lg:max-w-[85%] xl:max-w-[95%]"
                  aria-hidden
                >
                  <Image
                    src={BG_IMAGES[bgIndex].src}
                    alt=""
                    width={700}
                    height={620}
                    priority
                    className="w-full h-auto"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h1 className="mt-14 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 leading-tight">
                {HERO_TEXT.map(h => (
                  <TextEffect
                    key={h.key}
                    per="word"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="span"
                    className={h.className}
                  >
                    {h.text}
                  </TextEffect>
                ))}
              </h1>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mt-4 max-w-2xl text-gray-800 dark:text-gray-400 text-sm md:text-base"
              >
                With 10+ years of experience, we deliver residential and commercial projects that meet all safety standards, completed on time and within budget.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  item: TRANSITION_VARIANTS.item,
                  container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                }}
                className="mt-12 flex items-center gap-4 justify-center sm:justify-start"
              >
                <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] p-0.5">
                  <Button asChild size="lg" className="rounded-xl px-6 sm:px-5 text-sm sm:text-base">
                    <Link href="/book"><span className="text-nowrap">Book Us</span></Link>
                  </Button>
                </div>
                <Button asChild size="lg" variant="ghost" className="h-9 sm:h-10.5 rounded-xl px-6 sm:px-5 text-sm sm:text-base border border-gray-600">
                  <Link href="/projects"><span className="text-nowrap hover:text-orange-500">See Projects</span></Link>
                </Button>
              </AnimatedGroup>

              <ul className="mt-5 md:mt-10 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
                {FOOTER_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <item.Icon className="size-4 text-black dark:text-white" />
                    {item.parts.map((part, i) => (
                      <TextEffect key={i} per="line" preset="fade-in-blur" speedSegment={0.3} delay={0.5} as="span" className={part.className}>
                        {part.text}
                      </TextEffect>
                    ))}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <AnimatedGroup variants={{
          item: TRANSITION_VARIANTS.item,
          container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
        }}>
          <motion.div
            ref={marqueeRef}
            initial={!prefersReducedMotion ? { opacity: 0, y: 24, x: -20 } : undefined}
            whileInView={!prefersReducedMotion ? { opacity: 1, y: 0, x: 0 } : undefined}
            viewport={!prefersReducedMotion ? { once: true, amount: 0.2 } : undefined}
            transition={!prefersReducedMotion ? { duration: 0.7, ease: 'easeOut' } : undefined}
            className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-40"
          >
            <div className="ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <div className="overflow-hidden">
                <div className="flex gap-4 min-w-[200%] marquee-track" aria-hidden>
                  {MARQUEE_IMAGES.concat(MARQUEE_IMAGES).map((img, idx) => (
                    <div key={`${img.src}-${idx}`} className="w-[23%] flex-shrink-0 relative z-20 rounded-sm overflow-hidden border bg-background shadow-sm">
                      <Image 
                        src={img.src} 
                        alt={img.alt} 
                        width={800} 
                        height={540} 
                        className="w-full h-40 md:h-56 lg:h-64 object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <style jsx>{`
                .marquee-track { animation: marquee 40s linear infinite; will-change: transform; }
                @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
                @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
              `}</style>
            </div>
          </motion.div>
        </AnimatedGroup>
      </section>
    </main>
  )
}
