"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowLeft, Upload, CheckCircle, AlertCircle, Wallet, ExternalLink, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"

// Declare ethereum type for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

export default function CreatePetitionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [transactionHash, setTransactionHash] = useState("")
  const [blockchainStatus, setBlockchainStatus] = useState("disconnected") // disconnected, connecting, connected, publishing, published
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const [walletError, setWalletError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    target: "",
    deadline: "",
    tags: "",
    location: "",
    recipient: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // Check wallet connection on component mount
  useEffect(() => {
    checkMetaMaskAvailability()
  }, [])

  const checkMetaMaskAvailability = () => {
    if (typeof window !== "undefined") {
      const isAvailable = typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask
      setIsMetaMaskAvailable(isAvailable)

      if (isAvailable) {
        checkWalletConnection()
      }
    }
  }

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)
          setBlockchainStatus("connected")
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (!isMetaMaskAvailable) {
      setWalletError("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setBlockchainStatus("connecting")
    setWalletError("")

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)
          setBlockchainStatus("connected")
        }
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)

      if (error.code === 4001) {
        setWalletError("Connection rejected. Please approve the connection request.")
      } else if (error.code === -32002) {
        setWalletError("Connection request pending. Please check MetaMask.")
      } else {
        setWalletError("Failed to connect wallet. Please try again.")
      }
      setBlockchainStatus("disconnected")
    }
  }

  const installMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank")
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const publishToBlockchain = async () => {
    if (!walletConnected) {
      setWalletError("Please connect your wallet first.")
      return
    }

    setIsSubmitting(true)
    setBlockchainStatus("publishing")
    setWalletError("")

    try {
      // Simulate smart contract interaction
      const petitionData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        target: Number.parseInt(formData.target),
        deadline: formData.deadline,
        creator: walletAddress,
        timestamp: Date.now(),
      }

      // Simulate transaction hash generation
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64)

      // Simulate blockchain transaction delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setTransactionHash(mockTxHash)
      setBlockchainStatus("published")

      // Redirect to success page after a short delay
      setTimeout(() => {
        window.location.href = `/petition-success?tx=${mockTxHash}`
      }, 2000)
    } catch (error) {
      console.error("Blockchain publication failed:", error)
      setWalletError("Failed to publish to blockchain. Please try again.")
      setBlockchainStatus("connected")
    }

    setIsSubmitting(false)
  }

  const categories = [
    "Environment & Climate",
    "Human Rights",
    "Education",
    "Healthcare",
    "Technology & Privacy",
    "Politics & Government",
    "Social Justice",
    "Animal Rights",
    "Economic Policy",
    "Community Development",
  ]

  const tips = [
    {
      step: 1,
      title: "Write a compelling title",
      description: "Make it clear, specific, and action-oriented",
    },
    {
      step: 2,
      title: "Tell your story",
      description: "Explain the problem, why it matters, and what you want to achieve",
    },
    {
      step: 3,
      title: "Set realistic goals",
      description: "Choose a signature target that's ambitious but achievable",
    },
    {
      step: 4,
      title: "Review everything",
      description: "Double-check all details before publishing to the blockchain",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Create Petition</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Wallet Connection Status */}
                {walletConnected ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </Badge>
                ) : isMetaMaskAvailable ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={connectWallet}
                    disabled={blockchainStatus === "connecting"}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {blockchainStatus === "connecting" ? "Connecting..." : "Connect Wallet"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={installMetaMask}
                    className="bg-orange-500/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Install MetaMask
                  </Button>
                )}

                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Blockchain Secured
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* MetaMask Not Available Warning */}
          {!isMetaMaskAvailable && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-orange-400 mb-1">MetaMask Required</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      To publish your petition to the blockchain, you need MetaMask installed in your browser.
                    </p>
                    <Button
                      onClick={installMetaMask}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Install MetaMask
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Connection Warning */}
          {isMetaMaskAvailable && !walletConnected && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-400 mb-1">Wallet Required</h4>
                    <p className="text-sm text-slate-300">
                      Please connect your MetaMask wallet to publish your petition to the blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Error Display */}
          {walletError && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-400 mb-1">Connection Error</h4>
                    <p className="text-sm text-slate-300">{walletError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Start Your Petition</h1>
              <p className="text-slate-300">
                Create a blockchain-verified petition that ensures transparency and prevents fraud
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-300">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/10" />

              <div className="flex justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center space-x-2 ${
                      step <= currentStep ? "text-cyan-400" : "text-slate-500"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step < currentStep
                          ? "bg-cyan-400 border-cyan-400 text-white"
                          : step === currentStep
                            ? "border-cyan-400 text-cyan-400"
                            : "border-slate-500 text-slate-500"
                      }`}
                    >
                      {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {step === 1 && "Basic Info"}
                      {step === 2 && "Details"}
                      {step === 3 && "Settings"}
                      {step === 4 && "Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-3">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {currentStep === 1 && "Basic Information"}
                      {currentStep === 2 && "Petition Details"}
                      {currentStep === 3 && "Campaign Settings"}
                      {currentStep === 4 && "Review & Publish"}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {currentStep === 1 && "Start with the basics - title and category"}
                      {currentStep === 2 && "Tell your story and explain why this matters"}
                      {currentStep === 3 && "Set your goals and campaign parameters"}
                      {currentStep === 4 && "Review everything before publishing to blockchain"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-white">
                            Petition Title *
                          </Label>
                          <Input
                            id="title"
                            placeholder="e.g., Implement Renewable Energy in Our Community"
                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                          <p className="text-xs text-slate-400">Make it clear, specific, and action-oriented</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-white">
                            Category *
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {categories.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase()} className="text-white">
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recipient" className="text-white">
                            Petition Target *
                          </Label>
                          <Input
                            id="recipient"
                            placeholder="e.g., City Council, Mayor, Congress"
                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            value={formData.recipient}
                            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                          />
                          <p className="text-xs text-slate-400">Who has the power to make this change?</p>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-white">
                            Petition Description *
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Explain the problem, why it matters, and what you want to achieve..."
                            className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                          <p className="text-xs text-slate-400">
                            Be specific about the problem and your proposed solution
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-white">
                            Location (Optional)
                          </Label>
                          <Input
                            id="location"
                            placeholder="e.g., San Francisco, CA or Global"
                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                        </div>

                        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-white mb-2">Upload Supporting Documents</p>
                          <p className="text-sm text-slate-400 mb-4">
                            Add images, documents, or videos to support your petition
                          </p>
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Settings */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="target" className="text-white">
                              Signature Target *
                            </Label>
                            <Input
                              id="target"
                              type="number"
                              placeholder="e.g., 10000"
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                              value={formData.target}
                              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="deadline" className="text-white">
                              Campaign Deadline
                            </Label>
                            <Input
                              id="deadline"
                              type="date"
                              className="bg-white/10 border-white/20 text-white"
                              value={formData.deadline}
                              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags" className="text-white">
                            Tags (Optional)
                          </Label>
                          <Input
                            id="tags"
                            placeholder="climate, environment, sustainability (comma-separated)"
                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          />
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-400 mb-1">Blockchain Publication</h4>
                              <p className="text-sm text-slate-300">
                                Once published, your petition will be permanently recorded on the blockchain and cannot
                                be edited or deleted.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="bg-white/5 rounded-lg p-6 space-y-4">
                          <h3 className="text-lg font-medium text-white">Petition Preview</h3>

                          <div className="space-y-3">
                            <div>
                              <Label className="text-slate-400">Title</Label>
                              <p className="text-white font-medium">{formData.title || "No title provided"}</p>
                            </div>

                            <div>
                              <Label className="text-slate-400">Category</Label>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-2">
                                {formData.category || "No category"}
                              </Badge>
                            </div>

                            <div>
                              <Label className="text-slate-400">Target</Label>
                              <p className="text-white">{formData.recipient || "No target specified"}</p>
                            </div>

                            <div>
                              <Label className="text-slate-400">Description</Label>
                              <p className="text-slate-300 text-sm">
                                {formData.description
                                  ? formData.description.substring(0, 200) +
                                    (formData.description.length > 200 ? "..." : "")
                                  : "No description provided"}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-slate-400">Signature Goal</Label>
                                <p className="text-white">
                                  {formData.target ? Number(formData.target).toLocaleString() : "Not set"}
                                </p>
                              </div>
                              <div>
                                <Label className="text-slate-400">Deadline</Label>
                                <p className="text-white">{formData.deadline || "No deadline"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Blockchain Status */}
                        {blockchainStatus === "published" && transactionHash && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-green-400 mb-1">Successfully Published!</h4>
                                <p className="text-sm text-slate-300 mb-2">
                                  Your petition has been recorded on the blockchain.
                                </p>
                                <div className="flex items-center space-x-2">
                                  <code className="text-xs bg-white/10 px-2 py-1 rounded text-cyan-400">
                                    {transactionHash}
                                  </code>
                                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {blockchainStatus === "connected" && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-green-400 mb-1">Ready to Publish</h4>
                                <p className="text-sm text-slate-300">
                                  Your petition will be recorded on the blockchain with a unique hash for verification.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t border-white/10">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Previous
                      </Button>

                      {currentStep < totalSteps ? (
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={publishToBlockchain}
                          disabled={
                            isSubmitting || !walletConnected || blockchainStatus === "published" || !isMetaMaskAvailable
                          }
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                              <span>Publishing to Blockchain...</span>
                            </div>
                          ) : blockchainStatus === "published" ? (
                            "Published Successfully"
                          ) : !isMetaMaskAvailable ? (
                            "Install MetaMask Required"
                          ) : (
                            "Publish to Blockchain"
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Wallet Status */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Wallet className="h-5 w-5 mr-2 text-cyan-400" />
                      Wallet Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isMetaMaskAvailable ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-sm text-red-400">MetaMask Not Installed</span>
                        </div>
                        <Button
                          onClick={installMetaMask}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Install MetaMask
                        </Button>
                      </div>
                    ) : walletConnected ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-green-400">Connected</span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono">{walletAddress}</p>
                        <div className="text-xs text-slate-400">Network: Ethereum Mainnet</div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-sm text-orange-400">Not Connected</span>
                        </div>
                        <Button
                          onClick={connectWallet}
                          disabled={blockchainStatus === "connecting"}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Connect MetaMask
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Current Step Tip */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{tips[currentStep - 1]?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm">{tips[currentStep - 1]?.description}</p>
                  </CardContent>
                </Card>

                {/* Blockchain Benefits */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                      Blockchain Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-sm text-white">Immutable Records</p>
                        <p className="text-xs text-slate-400">Cannot be altered or deleted</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-sm text-white">Verified Signatures</p>
                        <p className="text-xs text-slate-400">Cryptographically secured</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-sm text-white">Full Transparency</p>
                        <p className="text-xs text-slate-400">Publicly verifiable</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Success Stats */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                      Platform Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Success Rate</span>
                      <span className="text-green-400 font-medium">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg. Signatures</span>
                      <span className="text-blue-400 font-medium">2.3K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Active Petitions</span>
                      <span className="text-purple-400 font-medium">2.8K</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
