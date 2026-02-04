"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, MapPin, Users, Flame, Zap, Heart, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gymClasses } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Classes", icon: Dumbbell },
  { id: "strength", label: "Strength", icon: Dumbbell },
  { id: "cardio", label: "Cardio", icon: Flame },
  { id: "hiit", label: "HIIT", icon: Zap },
  { id: "yoga", label: "Mind & Body", icon: Heart },
]

const daysOfWeek = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDay, setSelectedDay] = useState("All")

  const filteredClasses = gymClasses.filter((cls) => {
    const matchesDay = selectedDay === "All" || cls.dayOfWeek === selectedDay
    // For demo, we'll filter by name containing category keyword
    const matchesCategory =
      selectedCategory === "all" ||
      cls.name.toLowerCase().includes(selectedCategory) ||
      cls.description?.toLowerCase().includes(selectedCategory)
    return matchesDay && (selectedCategory === "all" || matchesCategory)
  })

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Energetic, action-focused */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">50+ Classes Weekly</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground text-balance leading-[0.95]">
              FIND YOUR<br />
              <span className="text-primary">PERFECT FIT</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              From high-intensity burn sessions to mindful yoga flows. Whatever your goal, 
              there's a class waiting for you.
            </p>
          </div>

          {/* Category quick links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all",
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Day selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Select a Day</h2>
            <div className="flex overflow-x-auto pb-2 gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                    selectedDay === day
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Grid */}
          {filteredClasses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => {
                const spotsLeft = cls.maxCapacity - cls.currentEnrollment
                const isAlmostFull = spotsLeft <= 3
                const isFull = spotsLeft === 0

                return (
                  <div
                    key={cls.id}
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-primary/5"
                  >
                    {/* Image header */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/photo-${
                          cls.name.toLowerCase().includes("yoga")
                            ? "1544367567-0f2fcb009e0b"
                            : cls.name.toLowerCase().includes("spin") || cls.name.toLowerCase().includes("cycle")
                            ? "1534258936925-c58bed479fcb"
                            : cls.name.toLowerCase().includes("box")
                            ? "1549719386-74dfcbf7dbed"
                            : "1571902943202-507ec2618e8f"
                        }?w=600&q=80`}
                        alt={cls.name}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                      {/* Level badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={cn(
                            "text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full",
                            cls.level === "beginner" && "bg-green-500 text-white",
                            cls.level === "intermediate" && "bg-yellow-500 text-black",
                            cls.level === "advanced" && "bg-red-500 text-white",
                            cls.level === "all" && "bg-primary text-primary-foreground"
                          )}
                        >
                          {cls.level}
                        </span>
                      </div>

                      {/* Availability badge */}
                      {(isFull || isAlmostFull) && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={cn(
                              "text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full",
                              isFull
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-yellow-500 text-black"
                            )}
                          >
                            {isFull ? "Full" : `${spotsLeft} left`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-1">{cls.name}</h3>
                        <p className="text-primary font-medium">with {cls.coachName}</p>
                      </div>

                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{cls.description}</p>

                      {/* Details */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>
                            {cls.dayOfWeek} {cls.startTime} - {cls.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{cls.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-primary" />
                          <span>
                            {cls.currentEnrollment}/{cls.maxCapacity} enrolled
                          </span>
                        </div>
                      </div>

                      <Button className="w-full" disabled={isFull}>
                        {isFull ? "Join Waitlist" : "Book This Class"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No classes found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different day or category
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDay("All")
                  setSelectedCategory("all")
                }}
                className="bg-transparent"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">Why Group Classes?</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
                MOTIVATION MEETS RESULTS
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Group classes combine expert instruction, energizing music, and community support 
                to help you push harder and achieve more than you would alone.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Flame, title: "Burn More", desc: "600+ calories per session" },
                  { icon: Users, title: "Community", desc: "Train with like-minded people" },
                  { icon: Zap, title: "Expert Led", desc: "Professional guidance" },
                  { icon: Heart, title: "Fun Factor", desc: "Actually enjoy working out" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"
                  alt="Group fitness class"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
            CAN'T DECIDE?<br />
            <span className="text-primary">TRY THEM ALL</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            New members get unlimited class access for their first week. 
            Find your favorites without any commitment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/coaches">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Meet the Coaches
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
