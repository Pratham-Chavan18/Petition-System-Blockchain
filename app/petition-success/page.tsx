"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CheckCircle,
  ExternalLink,
  Share2,
  Copy,
  Twitter,
  Facebook,
} from "lucide-react"
import Link from "next/link"

export default function PetitionSuccessPage() {
  const [transactionHash, setTransactionHash] = useState("0xABCDEF1234567890") // Example hash
  const [copied, setCopied] = useState(false)
  const [petitionUrl, setPetitionUrl] = useState("")
  const [someValue, setSomeValue] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to use window
      const value = window.localStorage.getItem("someKey")
      setSomeValue(value || "")

      const url = `${window.location.origin}/petition/${Math.floor(Math.random() * 1000)}`
      setPetitionUrl(url)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">DecentralizeIt</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Published Successfully
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Petition Published Successfully!
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Your petition has been permanently recorded on the blockchain and is now live for signatures.
              </p>
              {someValue && (
                <p className="text-sm text-slate-400">Retrieved from localStorage: {someValue}</p>
              )}
            </div>

            {/* Transaction Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Transaction Hash</p>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-white/10 px-2 py-1 rounded text-cyan-400 flex-1">
                        {transactionHash}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(transactionHash)}
                        className="text-slate-400 hover:text-white"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Confirmed
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Network:</span>
                    <span className="text-white">Ethereum Mainnet</span>
                  </div>
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Share2 className="h-5 w-5 mr-2 text-purple-400" />
                    Share Your Petition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Petition URL</p>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-white/10 px-2 py-1 rounded text-purple-400 flex-1">
                        {petitionUrl}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(petitionUrl)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-blue-600/10 border-blue-600/20 text-blue-400 hover:bg-blue-600/20"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Petition
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white">What Happens Next?</CardTitle>
                <CardDescription className="text-slate-300">
                  Your petition is now live and ready to collect signatures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  {/* Steps 1, 2, 3 */}
                  {/* (Same as your current layout) */}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                asChild
              >
                <Link href={petitionUrl}>View Your Petition</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/create">Create Another Petition</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
