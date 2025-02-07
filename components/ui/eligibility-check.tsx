"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import type React from "react" // Added import for React

export default function EligibilityCheck() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)

    try {
      const response = await fetch(`/api/check-eligibility?wallet=${walletAddress}`)
      const data = await response.json()

      if (response.ok) {
        toast({
          title: data.eligible ? "Congratulations!" : "Sorry!",
          description: data.eligible
            ? "You are eligible to join the waitlist."
            : "You are not eligible to join the waitlist at this time.",
          variant: data.eligible ? "default" : "destructive",
        })
      } else {
        throw new Error(data.error || "Failed to check eligibility")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check eligibility. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <form onSubmit={handleCheck} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter your wallet address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        required
        className="bg-white/10 border-white/20 text-white placeholder-white/50"
      />
      <Button type="submit" className="w-full" disabled={isChecking}>
        {isChecking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          "Check Eligibility"
        )}
      </Button>
    </form>
  )
}

