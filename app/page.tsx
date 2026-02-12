'use client'

import { useEffect } from 'react'
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-4";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-4";


export default function Home() {
  useEffect(() => {
    // Always scroll to top immediately
    window.scrollTo(0, 0);
    
    // Check if there's a scrollTo parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get('scrollTo');
    
    if (scrollTo) {
      // Delay scroll to section until after page settles
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clean up the URL parameter
        window.history.replaceState({}, '', window.location.pathname);
      }, 300);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <IntegrationsSection />
    
      <Features />
      <FAQsThree />
    </>
  );
}
