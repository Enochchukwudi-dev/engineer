"use client"

import React from "react"
import Image from "next/image"

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2348064032113"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 right-5 bottom-20 w-16 h-16 rounded-full shadow-lg select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 border border-muted-foreground/10 flex items-center justify-center">
        <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className="object-contain" priority />
      </div>
    </a>
  )
}


