"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BlogCategory } from "@/components/marketing/blog/types"

type CategoryFilterProps = {
  categories: BlogCategory[]
  activeCategory: BlogCategory
  onCategoryChange: (category: BlogCategory) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((category) => {
        const isActive = category === activeCategory

        return (
          <Button
            key={category}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "rounded-full px-5",
              !isActive && "border-primary/20 bg-card text-foreground/80 hover:border-primary/40 hover:text-primary",
            )}
            onClick={() => onCategoryChange(category)}
            aria-pressed={isActive}
          >
            {category}
          </Button>
        )
      })}
    </nav>
  )
}
