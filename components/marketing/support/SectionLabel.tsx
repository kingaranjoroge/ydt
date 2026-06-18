import { Badge } from "@/components/ui/badge"

export function SectionLabel({ children }: { children: string }) {
  return (
    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
      {children}
    </Badge>
  )
}