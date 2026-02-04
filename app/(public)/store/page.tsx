"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Star, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Products" },
  { id: "protein", label: "Protein" },
  { id: "supplements", label: "Supplements" },
  { id: "energy_drinks", label: "Energy" },
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
]

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory
  )

  // Featured products (first 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">Official Gear</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.95]">
                FUEL YOUR<br />
                <span className="text-primary">PERFORMANCE</span>
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl">
                Premium supplements, gear, and apparel. Everything you need to maximize 
                your training and recovery.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg">
                  Shop Best Sellers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Featured products preview */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(0, 2).map((product, i) => (
                  <div
                    key={product.id}
                    className={cn(
                      "bg-card rounded-xl p-4 border border-border",
                      i === 1 && "mt-8"
                    )}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
                      <Image
                        src={product.imageUrl || `https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&q=80`}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">{product.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(product.priceCents)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Shield, title: "Quality Guaranteed", desc: "Premium products only" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
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
      </section>

      {/* Products Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="mb-12">
            <div className="flex overflow-x-auto pb-2 gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all",
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={product.imageUrl || `https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80`}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Quick add button - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.stock < 10 && product.stock > 0 && (
                      <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">Low Stock</Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge variant="destructive">Sold Out</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <Badge variant="secondary" className="mb-3 capitalize">
                    {product.category.replace("_", " ")}
                  </Badge>

                  <h3 className="font-bold text-foreground mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-primary">
                        {formatPrice(product.priceCents)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try selecting a different category</p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")} className="bg-transparent">
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-primary font-semibold uppercase tracking-wider mb-4">New Arrivals</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
                IRON FORGE<br />SIGNATURE LINE
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our exclusive apparel collection designed for peak performance. 
                Premium materials, athletic fit, and the iconic Iron Forge branding.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Moisture-wicking fabric
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  4-way stretch
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Anti-odor technology
                </div>
              </div>

              <Button size="lg" className="mt-8">
                Shop Apparel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80"
                  alt="Iron Forge Apparel"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
            MEMBERS SAVE<br />
            <span className="text-primary">15% ON EVERYTHING</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Iron Forge and unlock exclusive member pricing on all supplements, 
            apparel, and accessories.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="text-lg px-8">
                Become a Member
              </Button>
            </Link>
            <Link href="/classes">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
