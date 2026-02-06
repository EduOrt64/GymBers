"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Menu, X, Instagram, Twitter, Youtube, Facebook } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/coaches", label: "Coaches" },
  { href: "/classes", label: "Classes" },
  { href: "/store", label: "Store" },
]

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement bar */}
      <div className="bg-primary py-2 text-center text-sm font-medium text-primary-foreground">
        New Year Special: First month FREE when you sign up today!{" "}
        <Link href="/signup" className="underline underline-offset-2 hover:no-underline">
          Claim offer
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Dumbbell className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tight text-foreground">IRON FORGE</span>
              <span className="block text-xs text-muted-foreground tracking-widest uppercase">Fitness Club</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/signup">
              <Button variant="ghost" size="sm" className="font-semibold">
                Sing Up
              </Button>
            </Link>
          <Link href="/login">
                <Button className="w-full cursor-pointer">Log in</Button>
                </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Sing up
                  </Button>
                </Link>
                <Link href="/login">
                <Button className="w-full hover:bg-sky-700 cursor-pointer">Log in</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        {/* Main footer */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Dumbbell className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-foreground">IRON FORGE</span>
                  <span className="block text-xs text-muted-foreground tracking-widest uppercase">Fitness Club</span>
                </div>
              </Link>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Where champions are made. Premium fitness facilities, expert coaching, 
                and a community dedicated to excellence.
              </p>
              {/* Social links */}
              <div className="mt-6 flex gap-3">
                {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="lg:col-span-3 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-bold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { href: "/classes", label: "Classes" },
                    { href: "/coaches", label: "Coaches" },
                    { href: "/store", label: "Store" },
                    { href: "/", label: "Membership" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground uppercase tracking-wider mb-4">Hours</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span className="text-foreground">5am - 11pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-foreground">6am - 10pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-foreground">7am - 9pm</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground uppercase tracking-wider mb-4">Contact</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>123 Fitness Street</li>
                  <li>New York, NY 10001</li>
                  <li>
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@ironforge.com" className="hover:text-primary transition-colors">
                      info@ironforge.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>2024 Iron Forge Gym. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
