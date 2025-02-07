import EligibilityCheck from "@/components/ui/eligibility-check"
import FluidBackground from "@/components/ui/fluid-background"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8">
      <FluidBackground />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Waitlist Checker
          </h1>
        </div>

        <div className="glass-card backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl">
          <EligibilityCheck />
        </div>
      </div>
    </main>
  )
}

