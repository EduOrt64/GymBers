import Image from "next/image"
import Link from "next/link"
import { Star, Award, ArrowRight, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { coaches } from "@/lib/mock-data"

export default function CoachesPage() {
  const featuredCoach = coaches[0]
  const otherCoaches = coaches.slice(1)

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">World-Class Coaching</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground text-balance leading-[0.95]">
              YOUR SUCCESS IS<br />
              <span className="text-primary">THEIR MISSION</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Train with certified professionals who have transformed thousands of lives. 
              Every coach brings passion, expertise, and a personalized approach to your fitness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Coach - Large spotlight */}
      <section className="py-20 sm:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={featuredCoach.avatarUrl || `https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80`}
                  alt={featuredCoach.fullName}
                  width={500}
                  height={625}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-black">{featuredCoach.yearsExperience}+</div>
                    <div className="text-sm opacity-80">Years</div>
                  </div>
                  <div className="h-12 w-px bg-primary-foreground/20" />
                  <div className="text-center">
                    <div className="text-3xl font-black flex items-center">
                      {featuredCoach.rating}
                      <Star className="h-5 w-5 ml-1 fill-current" />
                    </div>
                    <div className="text-sm opacity-80">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                <Award className="h-3 w-3 mr-1" />
                Head Coach
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground">{featuredCoach.fullName}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{featuredCoach.bio}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredCoach.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button size="lg">Book a Session</Button>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-foreground" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Coaches Grid */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">The Full Team</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
              MEET YOUR COACHES
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCoaches.map((coach, index) => (
              <div
                key={coach.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={coach.avatarUrl || `https://images.unsplash.com/photo-${
                      index % 3 === 0 ? "1594381898411-846e7d193883" : 
                      index % 3 === 1 ? "1571019614242-c5c5dee9f50b" : "1597452485669-2c7bb5fef90d"
                    }?w=400&q=80`}
                    alt={coach.fullName}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{coach.fullName}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-foreground font-medium">{coach.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{coach.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {coach.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {coach.yearsExperience} years experience
                    </span>
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                      View Profile
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
            READY TO TRAIN WITH<br />
            <span className="text-primary">THE BEST?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a free consultation with any of our coaches and discover 
            the personalized approach that will transform your fitness.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8">
              Book Free Consultation
            </Button>
            <Link href="/classes">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Browse Classes Instead
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
