'use client'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { MapPin, Mail, Phone, EyeOff } from 'lucide-react'
import React from 'react' 
import { useRouter } from 'next/navigation'


const links = [
    {
        title: 'Home',
        href: '#link',
    },
    {
        title: 'Project',
        href: '/projects',
    },
    {
        title: 'Services',
        href: '#our-services',
    },
    {
        title: 'Contact',
        href: '/contact',
    },
]

export default function FooterSection() {
    const router = useRouter()

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        // Fast client-side behavior to match header
        if (href === '/projects') {
            e.preventDefault();
            router.push('/projects');
            return;
        }

        if (href === '/contact') {
            e.preventDefault();
            router.push('/contact');
            return;
        }

        if (href === '#link') {
            e.preventDefault();
            if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            router.push('/');
            return;
        }

        if (href === '#our-services') {
            e.preventDefault();
            if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
                const el = document.getElementById('our-services');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            router.push('/?scrollTo=our-services');
            return;
        }

        // Fallback for any other anchors: scroll on-home or navigate with param
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.slice(1);
            if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            } else {
                window.dispatchEvent(new CustomEvent('show-loader'));
                setTimeout(() => {
                    window.location.href = `/?scrollTo=${id}`;
                }, 500);
            }
            return;
        }
    };
                            
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit"
                    onClick={async (e) => {
                        e.preventDefault();
                        // If already on home, just scroll to top
                        if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            return;
                        }

                        // Navigate client-side then ensure top position
                        await router.push('/');
                        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    <Logo />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-muted-foreground hover:text-orange-500 transition-colors duration-150 block">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://web.facebook.com/marshal.okweji.2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-muted-foreground hover:text-primary block">
                        <svg
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
                        </svg>
                    </Link>
                </div>

                <div className="my-4 flex flex-col items-center gap-2 text-muted-foreground text-sm mb-10">
                    <div className="flex items-center gap-3">
                        <MapPin className="size-5 text-orange-500" />
                        <span className="text-gray-500 dark:text-muted-foreground">64 Nepa road awada obosi, Anambra State</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="size-5 text-orange-500" />
                        <a href="mailto:marshaluzor4@gmail.com" className="hover:text-primary text-gray-500 dark:text-muted-foreground">marshaluzor4@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="size-5 text-orange-500" />
                        <span className="text-gray-500 dark:text-muted-foreground">
                            <a href="tel:08064032113" className="hover:text-primary">08064032113</a> or <a href="tel:08155838597" className="hover:text-primary">08155838597</a>
                        </span>
                    </div>
                </div>

                <span className="text-gray-500 dark:text-muted-foreground block text-center text-sm"> © 2026 MBC Const., All rights reserved</span>

                <div className="text-gray-500 dark:text-muted-foreground block text-center text-sm mt-2">built with - <span className="font-medium inline-flex items-center gap-2"><EyeOff className="size-4 text-gray-500 dark:text-gray-300" />Byund Technologies</span></div>

                <div className="mt-3 flex justify-center">
                    <a
                        href="https://wa.me/2349162919586"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        className="mt-2 px-6 py-3 rounded text-xs transition-colors bg-white/90 text-foreground border border-gray-200 hover:bg-white/95 hover:text-primary hover:border-primary dark:bg-white/20 dark:text-white dark:hover:bg-white/30 dark:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                        Reach Us
                    </a>
                </div>
            </div>
        </footer>
    )
}
