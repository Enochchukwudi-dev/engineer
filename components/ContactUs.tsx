import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export default function ContactUs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 mt-10">
        <div className="text-center">
          <p className="text-sm tracking-wide text-muted-foreground">Connect</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Ways to reach us</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Pick the method that works best for you. We’re here either way, ready to listen and help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="py-6 px-1 flex flex-col items-center text-center dark:bg-slate-900/20 border-0">
            <div className="mb-6 flex h-19 w-19 items-center justify-center rounded-full  ">
              <Mail className="size-10 text-gray-400" />
            </div>
            <h3 className="font-semibold">Send us an email</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-[20ch]">Write what you need and we will get back to you promptly.</p>
            <div className="mt-6">
              <Link href="mailto:marshaluzor4@gmail.com" aria-label="Send an email">
                <Button variant="outline" size="lg">Send an email</Button>
              </Link>
            </div>
          </Card>

          <Card className="py-12 flex flex-col items-center text-center dark:bg-slate-900/20 border-0">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-muted-foreground/30">
              <div className="rounded-full bg-green-600 p-2">
                <Image src="/whatsapp.svg" alt="whatsapp" width={48} height={48} />
              </div>
            </div>
            <h3 className="font-semibold">Message on WhatsApp</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-[20ch]">Quick conversations happen best where you already are.</p>
            <div className="mt-6">
              <a href="https://wa.me/2349162919586" target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">Message on WhatsApp</Button>
              </a>
            </div>
          </Card>

          <Card className="py-12 flex flex-col items-center text-center dark:bg-slate-900/20 border-0">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-muted-foreground/30">
              <Phone className="size-10 text-gray-400" />
            </div>
            <h3 className="font-semibold">Call us directly</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-[20ch]">Speak to someone who knows how to help.</p>
            <div className="mt-6">
              <Link href="tel:08064032113" aria-label="Call us">
                <Button variant="outline" size="lg">Call us</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
