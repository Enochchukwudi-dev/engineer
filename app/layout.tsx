import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBC Building Construction Enterprise - Building Dreams in Motion",
  description: "Premium construction services in Morocco. Crafting visions with precision and devotion, building excellence with passion and action.",
  icons: {
    icon: "/foi.png",
    shortcut: "/foi.png",
    apple: "/foi.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >            <PageLoader />            <HeroHeader />
            {children}
            <FooterSection />
          </ThemeProvider>
      </body>
    </html>
  );
}
