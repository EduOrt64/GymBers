import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { coaches, gymClasses } from "@/lib/mock-data"

const transformations = [
  { name: "Sarah M.", result: "Lost 45 lbs", time: "6 months" },
  { name: "Mike R.", result: "Gained 20 lbs muscle", time: "8 months" },
  { name: "Jessica T.", result: "First marathon", time: "1 year" },
]

const membershipBenefits = [
  "Unlimited access to all equipment",
  "50+ weekly group classes",
  "Personal training sessions",
  "Nutrition coaching included",
  "Locker room & sauna access",
  "Free parking",
]

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full viewport, cinematic */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Now open 24/7
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground text-balance leading-[0.9]">
            FORGE YOUR
            <br />
            <span className="text-primary">STRONGEST</span> SELF
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Where champions are made. Premium equipment, elite coaches, 
            and a community that pushes you to be your best.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6 font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 font-semibold bg-transparent border-foreground/20 hover:bg-foreground/10"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch Tour
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-secondary overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Member"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">500+ Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-muted-foreground animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Bar - Bold numbers */}
      <section className="bg-primary py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "15+", label: "Years" },
              { value: "50+", label: "Classes/Week" },
              { value: "12", label: "Expert Coaches" },
              { value: "24/7", label: "Access" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">Success Stories</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
              REAL PEOPLE.<br />REAL RESULTS.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transformations.map((story, i) => (
              <div
                key={story.name}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <Image
                    src={`https://images.unsplash.com/photo-${
                      i === 0 ? "1550345332-09e3ac987658" : i === 1 ? "1583454110551-21f2fa2afe61" : "1518310383802-640c2de311b2"
                    }?w=600&q=80`}
                    alt={story.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider">{story.time}</p>
                  <h3 className="text-2xl font-bold text-foreground mt-1">{story.result}</h3>
                  <p className="text-muted-foreground mt-1">{story.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="bg-transparent">
              See All Transformations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Meet the Coaches - Featured Section */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">Your Guides</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                MEET THE COACHES
              </h2>
            </div>
            <Link href="/coaches" className="mt-6 lg:mt-0">
              <Button variant="outline" className="bg-transparent">
                View Full Roster
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.slice(0, 4).map((coach) => (
              <div key={coach.id} className="group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={coach.avatarUrl || `https://i.pravatar.cc/400?u=${coach.id}`}
                    alt={coach.fullName}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex flex-wrap gap-1">
                      {coach.specializations.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground">{coach.fullName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    {coach.rating}
                  </span>
                  <span>•</span>
                  <span>{coach.yearsExperience} yrs exp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">Find Your Fit</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                50+ WEEKLY CLASSES
              </h2>
            </div>
            <Link href="/classes" className="mt-6 lg:mt-0">
              <Button variant="outline" className="bg-transparent">
                View Full Schedule
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gymClasses.slice(0, 6).map((cls) => (
              <div
                key={cls.id}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:translate-y-[-4px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                      cls.level === "beginner"
                        ? "bg-green-500/10 text-green-500"
                        : cls.level === "intermediate"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : cls.level === "advanced"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {cls.level}
                  </span>
                  <span className="text-sm text-muted-foreground">{cls.dayOfWeek}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{cls.name}</h3>
                <p className="text-primary text-sm mb-3">with {cls.coachName}</p>
                <p className="text-muted-foreground text-sm line-clamp-2">{cls.description}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {cls.startTime} - {cls.endTime}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {cls.currentEnrollment}/{cls.maxCapacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">Join Today</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
                EVERYTHING YOU NEED TO SUCCEED
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                One membership. Unlimited possibilities. Start your transformation today 
                with our all-inclusive plan.
              </p>

              <ul className="mt-8 space-y-4">
                {membershipBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 font-semibold">
                  Get Started - $49/mo
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Schedule Tour
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80"
                  alt="Gym interior"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Price badge */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-2xl">
                <div className="text-sm uppercase tracking-wider opacity-80">Starting at</div>
                <div className="text-4xl font-black">$49<span className="text-lg font-normal">/mo</span></div>
                <div className="text-sm opacity-80">Cancel anytime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
            YOUR JOURNEY STARTS<br />
            <span className="text-primary">TODAY</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Join Iron Forge and become part of a community dedicated to excellence. 
            Your first week is on us.
          </p>
          <div className="mt-10">
            <Button size="lg" className="text-lg px-12 py-6 font-semibold">
              Claim Your Free Week
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
