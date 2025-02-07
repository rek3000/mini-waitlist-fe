"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle2, XCircle, Calendar } from "lucide-react"
import type React from "react"

interface WaitlistResponse {
  exists: boolean
  details?: {
    walletAddress: string
    joinedAt: number
  }
}

export default function EligibilityCheck() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [waitlistData, setWaitlistData] = useState<WaitlistResponse | null>(null)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)
    setWaitlistData(null)

    try {
      const response = await fetch(`https://mini-waitlist.rek3000.workers.dev/waitlist/${walletAddress}`)
      const data: WaitlistResponse = await response.json()

      setWaitlistData(data)
      
      toast({
        title: data.exists ? "ACCESS GRANTED 🔓" : "ACCESS DENIED",
        description: data.exists
          ? "Wallet verified on waitlist."
          : "Wallet not found in database.",
        variant: data.exists ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        description: "Verification failed. Retry sequence initiated.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Check Waitlist Status
        </h2>
        <p className="text-zinc-400 text-sm tracking-wider">
          Enter your wallet address to check if you're on the waitlist
        </p>
      </div>
      
      <form onSubmit={handleCheck} className="space-y-4">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-10
                     transition-all duration-300 
                     focus:bg-white/15 focus:scale-[1.02] focus:shadow-lg
                     hover:bg-white/15 hover:border-white/30
                     h-12 tracking-wider"
          />
          {waitlistData !== null && (
            <div className="absolute right-3 inset-y-0 flex items-center">
              {waitlistData.exists ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-700 hover:to-purple-700 
                   transition-all duration-300 transform
                   hover:scale-[1.02] hover:shadow-lg
                   active:scale-95
                   animate-pulse-glow
                   tracking-wider" 
          disabled={isChecking}
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Status"
          )}
        </Button>
      </form>

      {waitlistData && (
        <div 
          className={`mt-6 rounded-lg p-4 transition-all duration-500 
                     transform animate-scale-in hover:scale-[1.02]
                     ${waitlistData.exists 
                       ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/15' 
                       : 'bg-red-500/10 border border-red-500/20 hover:bg-red-500/15'
                     } animate-shimmer`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              {waitlistData.exists ? (
                <div className="w-12 h-12 rounded-full bg-green-500/20 
                              flex items-center justify-center
                              transform transition-all duration-300
                              hover:scale-110 hover:bg-green-500/30">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-500/20 
                              flex items-center justify-center
                              transform transition-all duration-300
                              hover:scale-110 hover:bg-red-500/30">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
              )}
            </div>
            
            <div className="text-center space-y-3">
              <h3 className={`text-lg font-semibold transform transition-all duration-300
                            ${waitlistData.exists ? 'text-green-400' : 'text-red-400'}`}>
                {waitlistData.exists ? 'Wallet Found!' : 'Not Registered'}
              </h3>
              
              {waitlistData.exists && waitlistData.details && (
                <div className="mt-4 space-y-2 text-sm text-zinc-400">
                  <div className="flex items-center justify-center gap-2 
                                group hover:bg-white/5 p-2 rounded-lg
                                transition-all duration-300">
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-zinc-300 transition-colors duration-300
                                   group-hover:text-white tracking-wider">
                      Registered {formatDate(waitlistData.details.joinedAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

