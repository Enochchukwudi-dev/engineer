"use client"

import { useState } from "react"
import { Building, Droplets, Palette, Grid, ClipboardList, Ruler, BrickWallShield, BrickWall, DropletOff } from 'lucide-react'
import { motion } from 'motion/react'


const SERVICES = [
  { icon: Building, title: 'Structural Building Construction', desc: 'Delivering durable builds.', bg: '/conc7.avif' },
  { icon: DropletOff, title: 'Roofing Systems Installation', desc: 'Shelter without compromise.', bg: '/roof2.avif' },
  { icon: Droplets, title: 'Felting & Waterproofing Solutions', desc: 'Smart seals that last.', bg: '/felt2.avif' },
  { icon: BrickWall, title: 'Concrete & Reinforcement Works', desc: 'Strength made to endure.', bg: '/conc2.avif' },
  { icon: Palette, title: 'Interior & Exterior Finishing', desc: 'Flawless trim and finish.', bg: '/inte3.avif' },
  { icon: BrickWallShield, title: 'Mansory & Block Works', desc: 'Precision in every block.', bg: '/conc1.avif' },
  { icon: Grid, title: 'Flooring, Tiling & Paving', desc: 'Smooth installs for lasting floors.', bg: '/inte4.avif' },
  { icon: ClipboardList, title: 'Construction Project Supervision', desc: 'Expert oversight from start to finish.', bg: '/inte6.avif' },
  { icon: Ruler, title: 'Architectural Drawing', desc: 'Crisp plans, clear intent.', bg: '/hello.avif' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      bounce: 0.3,
      duration: 0.6,
    },
  },
}

export default function Features() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <section id="our-services" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Our Services</h2>
                    <p className="text-sm mt-1 text-gray-500 dark:text-muted-foreground">We manage every phase of a project with experienced oversight, quality materials, and clear communication so your build is durable and completed on time.</p>
                </div>

                <motion.div
                  className="relative mx-auto grid gap-6 max-w-4xl md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={containerVariants}
                >
                    {SERVICES.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div key={idx} variants={itemVariants} className="h-40 relative rounded-lg overflow-hidden flex flex-col items-center justify-center text-center" style={{ backgroundImage: `url(${item.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                                <div className="relative z-10 space-y-2 px-4 flex flex-col items-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <IconComponent className="size-4 text-orange-500" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white">{item.title}</h3>
                                    <p className="text-xs text-gray-200">{item.desc}</p>
                                        <button onClick={() => setSelectedImage(item.bg)} className="mt-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition-colors">
                                        View Image
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
                {selectedImage && (
                    <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setSelectedImage(null)}>
                      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
                      <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Service" className="max-w-[90vw] max-h-[80vh] object-contain shadow-lg" />
                      </div>
                    </div>
                )}
            </div>
        </section>
    )
}
