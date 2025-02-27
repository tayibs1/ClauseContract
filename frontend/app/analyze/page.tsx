"use client"

import { Header } from "@/components/header"
import { DocumentUploader } from "@/components/document-uploader"

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with futuristic gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          {/* Animated glow orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
            <div
              className="absolute right-0 top-40 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="container relative mx-auto px-4 py-12">
            <div className="mx-auto max-w-4xl space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  Document Analysis
                </h1>
                <p className="text-lg text-muted-foreground">
                  Upload your legal document to begin the AI-powered analysis
                </p>
              </div>

              {/* Analysis Steps with modern design */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { step: 1, title: "Upload Document", description: "Select or drop your file" },
                  { step: 2, title: "AI Analysis", description: "Advanced processing" },
                  { step: 3, title: "Get Insights", description: "View detailed results" },
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative overflow-hidden rounded-lg border bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                          <span className="font-bold text-primary">{item.step}</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground/90">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <DocumentUploader />
          </div>
        </div>
      </main>
    </div>
  )
}

