import type { BlogCategory, BlogPost } from "@/components/marketing/blog/types"

export const categories: BlogCategory[] = [
  "All",
  "Career Tips",
  "Tech Trends",
  "Member Spotlight",
  "Event Recaps",
]

export const posts: BlogPost[] = [
  {
    id: "post-01",
    slug: "future-of-ai-in-kenyas-education-system",
    title: "The Future of AI in Kenya's Education System",
    category: "Tech Trends",
    image: "/images/hero.jpg",
    excerpt:
      "AI-powered tutoring and classroom analytics are helping schools personalize learning and close long-standing achievement gaps.",
    date: "2026-02-14",
    featured: true,
  },
  {
    id: "post-02",
    slug: "five-freelance-skills-that-open-global-doors",
    title: "5 Freelance Skills That Open Global Doors",
    category: "Career Tips",
    image: "/images/intro.jpg",
    excerpt:
      "From UX writing to no-code automation, these practical skills can help African youth access international remote opportunities faster.",
    date: "2026-01-29",
    featured: false,
  },
  {
    id: "post-03",
    slug: "inside-our-nairobi-community-build-day",
    title: "Inside Our Nairobi Community Build Day",
    category: "Event Recaps",
    image: "/images/about-hero.jpg",
    excerpt:
      "Mentors, learners, and founders came together to ship prototypes, exchange feedback, and build confidence through hands-on collaboration.",
    date: "2026-01-18",
    featured: false,
  },
  {
    id: "post-04",
    slug: "how-janet-landed-her-first-remote-client",
    title: "How Janet Landed Her First Remote Client",
    category: "Member Spotlight",
    image: "/images/founder.jpg",
    excerpt:
      "After 10 weeks in YDT's mentorship track, Janet moved from self-doubt to client-ready by refining her portfolio and outreach strategy.",
    date: "2026-01-05",
    featured: false,
  },
  {
    id: "post-05",
    slug: "portfolio-mistakes-that-cost-you-interviews",
    title: "Portfolio Mistakes That Cost You Interviews",
    category: "Career Tips",
    image: "/images/hero.jpg",
    excerpt:
      "If your work is strong but callbacks are weak, these common portfolio issues may be holding you back and are easier to fix than you think.",
    date: "2025-12-22",
    featured: false,
  },
  {
    id: "post-06",
    slug: "why-community-accelerates-digital-growth",
    title: "Why Community Accelerates Digital Growth",
    category: "Member Spotlight",
    image: "/images/intro.jpg",
    excerpt:
      "Peer accountability, shared resources, and regular feedback loops turn individual ambition into sustainable career momentum.",
    date: "2025-12-09",
    featured: false,
  },
  {
    id: "post-07",
    slug: "cybersecurity-basics-for-new-freelancers",
    title: "Cybersecurity Basics for New Freelancers",
    category: "Tech Trends",
    image: "/images/about-hero.jpg",
    excerpt:
      "Simple security habits like contract-safe file sharing and MFA can protect your reputation before you scale to larger clients.",
    date: "2025-11-28",
    featured: false,
  },
  {
    id: "post-08",
    slug: "what-we-learned-from-our-mombasa-tech-meetup",
    title: "What We Learned From Our Mombasa Tech Meetup",
    category: "Event Recaps",
    image: "/images/founder.jpg",
    excerpt:
      "The meetup spotlighted practical pathways into digital work, from portfolio clinics to mentorship circles and internship pipelines.",
    date: "2025-11-12",
    featured: false,
  },
]
