'use client'

import { useEffect } from 'react'
import ContactUs from '@/components/ContactUs'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <ContactUs />
    </main>
  )
}
