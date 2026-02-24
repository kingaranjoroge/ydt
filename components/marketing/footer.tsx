"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
]

const programLinks = [
  { label: "Digital Skills Training", href: "/#programs" },
  { label: "High School Literacy", href: "/#programs" },
  { label: "Mentorship", href: "/#programs" },
]

const socialLinks = [
  { icon: Twitter, href: "https://x.com/ydtcommunity", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ydtcommunity/", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="text-2xl font-bold tracking-tight">YDT</span>
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Empowering African youth with digital skills, mentorship, and
              opportunities to thrive in the digital economy.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-background/60 transition-colors hover:text-background"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Programs
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-background/70">
              Get the latest news and opportunities from YDT Community.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <Input
                type="email"
                placeholder="Your email"
                className="border-background/20 bg-background/10 text-background placeholder:text-background/40 focus-visible:ring-background/30"
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                variant="secondary"
                className="shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-background/10 pt-8 text-center">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} Young Digital Talents Community.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
