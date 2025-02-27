"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Page() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your legal documents with unprecedented accuracy.",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      hoverGradient: "from-blue-500/30 via-indigo-500/30 to-purple-500/30",
      glowColor: "group-hover:shadow-blue-500/25",
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Generate and analyze contracts with intelligent clause detection and risk assessment.",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      hoverGradient: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
      glowColor: "group-hover:shadow-emerald-500/25",
    },
    {
      icon: Sparkles,
      title: "Instant Insights",
      description: "Get real-time analysis and actionable insights from your legal documents.",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      hoverGradient: "from-orange-500/30 via-amber-500/30 to-yellow-500/30",
      glowColor: "group-hover:shadow-orange-500/25",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          {/* Animated glow effects */}
          <div className="absolute inset-0">
            <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="absolute -right-4 top-40 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex items-center justify-center space-x-2"
              >
                <div className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                  Powered by Advanced AI
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
              >
                ClauseCraft AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 text-xl text-muted-foreground md:text-2xl"
              >
                Transform Legal Documents into Intelligent Insights
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 md:flex-row"
              >
                <Link href="/analysis">
                  <Button
                    size="lg"
                    className="h-12 px-6 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 backdrop-blur-sm"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/analyze">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 transition-all hover:scale-105 hover:bg-primary/10 backdrop-blur-sm"
                  >
                    Try Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border bg-background/50 p-8 backdrop-blur-sm
                    transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.glowColor}`}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 transition-all duration-300 group-hover:opacity-100`}
                  />

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

                  {/* Content */}
                  <div className="relative">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

