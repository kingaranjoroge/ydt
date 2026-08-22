import { Mail, MapPin, MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

import { Card, CardContent } from "@/components/ui/card"

const contactPoints = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@ydtcommunity.co.ke",
    href: "mailto:hello@ydtcommunity.co.ke",
  },
  {
    icon: FaWhatsapp,
    label: "Chat on WhatsApp",
    value: "Join our WhatsApp channel",
    href: "https://www.whatsapp.com/channel/0029Val1bGK2Jl89H5VF782n",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Nairobi, Kenya",
    href: undefined,
  },
]

export function ContactDetails() {
  return (
    <Card className="border-border/70 bg-muted/30 shadow-lg shadow-primary/5">
      <CardContent className="space-y-8 p-6 md:p-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <MessageCircle className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-wider">Contact Info</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Prefer a direct line? Reach us through any of the channels below
            and we&apos;ll respond within 1-2 business days.
          </p>
        </div>

        <ul className="space-y-5">
          {contactPoints.map((point) => (
            <li key={point.label} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <point.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{point.label}</p>
                {point.href ? (
                  <a
                    href={point.href}
                    target={point.href.startsWith("http") ? "_blank" : undefined}
                    rel={point.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {point.value}
                  </a>
                ) : (
                  <p className="text-base font-semibold text-foreground">{point.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default ContactDetails
