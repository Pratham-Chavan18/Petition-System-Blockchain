"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Shield, Users, Clock, Share2, Flag, TrendingUp, ArrowLeft, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PetitionDetailPage({ params }: { params: { id: string } }) {
  const [isSigning, setIsSigning] = useState(false)
  const [hasSigned, setHasSigned] = useState(false)
  const [signatureData, setSignatureData] = useState({
    name: "",
    email: "",
    comment: "",
  })

  // Mock petition data - in real app, this would be fetched based on params.id
  const petition = {
    id: Number.parseInt(params.id),
    title: "Climate Action Now",
    description:
      "We are calling for immediate and decisive action on climate change from world leaders. The scientific consensus is clear: we are facing a climate emergency that requires urgent, comprehensive action to reduce greenhouse gas emissions and transition to renewable energy sources.\n\nOur planet is warming at an unprecedented rate, leading to more frequent and severe weather events, rising sea levels, and threats to biodiversity. We cannot afford to wait any longer.\n\nWe demand:\n• Immediate implementation of policies to achieve net-zero emissions by 2030\n• Massive investment in renewable energy infrastructure\n• Protection and restoration of natural ecosystems\n• Support for communities most affected by climate change\n• Transparent reporting on climate action progress",
    signatures: 15420,
    target: 20000,
    category: "Environment",
    timeLeft: "12 days left",
    creator: "Environmental Coalition",
    createdDate: "2024-01-15",
    verified: true,
    trending: true,
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    updates: [
      {
        date: "2024-01-20",
        title: "10,000 signatures reached!",
        content: "Thank you for your incredible support. We've reached 10,000 signatures and the momentum is building.",
      },
      {
        date: "2024-01-18",
        title: "Media coverage expanding",
        content:
          "Our petition has been featured in major news outlets, bringing more attention to this critical issue.",
      },
    ],
    recentSignatures: [
      { name: "Sarah Johnson", location: "New York, NY", comment: "This is urgent - we need action now!" },
      { name: "Michael Chen", location: "San Francisco, CA", comment: "For our children's future" },
      { name: "Emma Rodriguez", location: "Austin, TX", comment: "Climate change affects us all" },
      { name: "David Kim", location: "Seattle, WA", comment: "The time for action is now" },
      { name: "Lisa Thompson", location: "Denver, CO", comment: "We cannot wait any longer" },
    ],
  }

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigning(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSigning(false)
    setHasSigned(true)
  }

  const progressPercentage = Math.min((petition.signatures / petition.target) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/petitions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Petitions
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Petition Details</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Petition Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{petition.category}</Badge>
                    {petition.trending && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">Created {petition.createdDate}</span>
                </div>
                <CardTitle className="text-3xl mb-4">{petition.title}</CardTitle>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{petition.signatures.toLocaleString()} signatures</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{petition.timeLeft}</span>
                  </div>
                  <span>by {petition.creator}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{petition.signatures.toLocaleString()} signed</span>
                      <span className="text-gray-600">Goal: {petition.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{Math.round(progressPercentage)}% of goal reached</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Petition Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Petition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {petition.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Updates</CardTitle>
                <CardDescription>Latest news from the petition creator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {petition.updates.map((update, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{update.title}</h4>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <p className="text-gray-700">{update.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Signatures */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Signatures</CardTitle>
                <CardDescription>See who else has signed this petition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {petition.recentSignatures.map((signature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{signature.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{signature.name}</span>
                          <span className="text-xs text-gray-500">{signature.location}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{signature.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sign Petition */}
            <Card>
              <CardHeader>
                <CardTitle>{hasSigned ? "Thank You!" : "Sign This Petition"}</CardTitle>
                <CardDescription>
                  {hasSigned
                    ? "Your signature has been recorded on the blockchain"
                    : "Add your voice to this important cause"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasSigned ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <p className="text-green-600 font-medium">Signature Verified</p>
                    <p className="text-sm text-gray-600">
                      Your signature has been permanently recorded on the blockchain
                    </p>
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Friends
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSign} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={signatureData.name}
                        onChange={(e) => setSignatureData({ ...signatureData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={signatureData.email}
                        onChange={(e) => setSignatureData({ ...signatureData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Comment (optional)</Label>
                      <Textarea
                        id="comment"
                        placeholder="Why is this important to you?"
                        value={signatureData.comment}
                        onChange={(e) => setSignatureData({ ...signatureData, comment: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSigning}>
                      {isSigning ? "Recording on Blockchain..." : "Sign Petition"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Your signature will be verified and recorded on the blockchain
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Blockchain Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Block Hash:</span>
                  <code className="text-xs bg-gray-100 px-1 rounded">{petition.blockchainHash.slice(0, 10)}...</code>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Signatures:</span>
                  <span>{petition.signatures.toLocaleString()}</span>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain
                </Button>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Petition</CardTitle>
                <CardDescription>Help spread the word</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Share on Twitter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share on Facebook
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
