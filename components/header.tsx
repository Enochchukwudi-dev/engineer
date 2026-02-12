'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { ModeToggle } from './toggle'

const menuItems = [
    { name: 'Home', href: '#link' },
    { name: 'Project', href: '/projects' },
    { name: 'Services', href: '#our-services' },
    { name: 'Contact', href: '/contact' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();

            // Special case: Home should go to the very top (include header),
            // show loader and refresh / navigate after 4s so users see the loader.
            if (href === '#link') {
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('show-loader'))
                }

                // Scroll to top immediately for visual feedback
                window.scrollTo({ top: 0, behavior: 'smooth' });

                if (window.location.pathname === '/' || window.location.pathname === '') {
                    // If already on home, reload after loader finishes
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    // If coming from another page, navigate to home after loader finishes
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                }
            } else {
                const id = href.slice(1);
                // If not on home page, navigate there first
                if (window.location.pathname !== '/' && window.location.pathname !== '') {
                    window.dispatchEvent(new CustomEvent('show-loader'));
                    setTimeout(() => {
                        window.location.href = `/?scrollTo=${id}`;
                    }, 500);
                } else {
                    // Use a small delay to ensure menu is closed and DOM is ready
                    setTimeout(() => {
                        const el = document.getElementById(id);
                        if (el) {
                            // Smooth scroll to the section. Offset is handled via CSS (scroll-margin-top), so we avoid mutating the DOM or adding classes.
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 50);
                }
            }
        }
        setMenuState(false);
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        // Show the global loader for 4s, then reload/navigate.
        e.preventDefault();
        // Trigger PageLoader via event
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('show-loader'))
        }

        if (window.location.pathname === '/' || window.location.pathname === '') {
            // Scroll to top then reload after loader finishes
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            // Navigate to home after loader finishes
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        }
    };

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-2000 w-full border-b transition-colors duration-150', scrolled && 'bg-background backdrop-blur-none shadow-sm')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                                onClick={(e) => handleLogoClick(e)}>
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-foreground" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-foreground" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                className="text-foreground hover:text-orange-500 block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-card in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border p-6 shadow-2xl shadow-foreground/10 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                className="text-foreground hover:text-orange-500 block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="#">
                                        <span>Get Quote</span>
                                    </Link>
                                </Button>
                                <ModeToggle onThemeChange={() => setMenuState(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {menuState && (
                <div
                    className="fixed inset-0 lg:hidden z-10 bg-foreground/10 backdrop-blur-sm transition-opacity duration-200"
                    onClick={() => setMenuState(false)}
                    onTouchEnd={() => setMenuState(false)}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}
