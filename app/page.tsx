import EligibilityCheck from "@/components/ui/eligibility-check"
import WaitlistForm from "@/components/ui/waitlist-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="glass-card p-8 w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Join Our Exclusive Waitlist</h1>
        <EligibilityCheck />
        <WaitlistForm />
      </div>
    </main>
  )
}

