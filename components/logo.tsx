import Image from 'next/image'
import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <div className={cn('inline-flex flex-col items-center h-auto w-auto bg-transparent dark:bg-black rounded px-2 py-1', className)}>
            <Image
                src="/whitelogo.png"
                alt="Marock Building (light)"
                width={160}
                height={24}
                className="h-6 w-auto block dark:hidden"
                priority
            />
            <Image
                src="/blacklog.png"
                alt="Marock Building (dark)"
                width={160}
                height={24}
                className="h-6 w-auto hidden dark:block"
                priority
            />
            <span className="mt-1 text-center text-xs sm:text-sm text-foreground dark:text-white leading-none">
                <span className="font-semibold text-[11px] block">MAROCK BUILDING CONST.</span>
                <span className="block text-[10px] sm:text-xs font-extralight text-orange-400">ENTERPRISE</span>
            </span>
        </div>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-5', className)}>
            <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#9B99FE" />
                    <stop offset="1" stopColor="#2BC8B7" />
                </linearGradient>
            </defs>
            <rect width="18" height="18" fill="transparent" />
            <text
                x="9"
                y="12"
                textAnchor="middle"
                fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                fontSize="10"
                fontWeight="700"
                fill={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
            >
                P
            </text>
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('text-foreground size-7 w-7', className)}
            viewBox="0 0 160 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <text
                x="0"
                y="18"
                fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                fontSize="18"
                fontWeight="700"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.6}
            >
                Proofly
            </text>
        </svg>
    )
}
