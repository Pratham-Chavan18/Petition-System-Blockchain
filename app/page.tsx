"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  Github,
  Chrome,
  Zap,
  Users,
  Globe,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

// Declare ethereum type for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletError, setWalletError] = useState("")
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)

  // Check MetaMask availability on component mount
  useEffect(() => {
    checkMetaMaskAvailability()
  }, [])

  const checkMetaMaskAvailability = () => {
    if (typeof window !== "undefined") {
      const isAvailable = typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask
      setIsMetaMaskAvailable(isAvailable)

      if (isAvailable) {
        // Check if already connected
        checkExistingConnection()
      }
    }
  }

  const checkExistingConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)
        }
      }
    } catch (error) {
      console.error("Error checking existing connection:", error)
    }
  }

  const connectWallet = async () => {
    if (!isMetaMaskAvailable) {
      setWalletError("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setIsConnecting(true)
    setWalletError("")

    try {
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)

          // Auto redirect to dashboard after wallet connection
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        }
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)

      // Handle specific error types
      if (error.code === 4001) {
        setWalletError("Connection rejected. Please approve the connection request.")
      } else if (error.code === -32002) {
        setWalletError("Connection request pending. Please check MetaMask.")
      } else {
        setWalletError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const installMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: Shield, label: "Verified Petitions", value: "2.8K" },
    { icon: Globe, label: "Countries", value: "120+" },
    { icon: Zap, label: "Success Rate", value: "89%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">DecentralizeIt</h1>
                <p className="text-cyan-200 text-sm">Decentralized Petition Platform</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Your Voice, Verified Forever
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Create and sign petitions with complete transparency using blockchain technology. Every signature is
                  immutable and verifiable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <stat.icon className="h-8 w-8 text-cyan-400" />
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-slate-300">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge
                className={`${isMetaMaskAvailable ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-orange-500/20 text-orange-400 border-orange-500/30"}`}
              >
                <div
                  className={`w-2 h-2 ${isMetaMaskAvailable ? "bg-green-400" : "bg-orange-400"} rounded-full mr-2`}
                ></div>
                {isMetaMaskAvailable ? "MetaMask Available" : "MetaMask Required"}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Fully Secured
              </Badge>
            </div>
            <p className="text-sm text-slate-400">Powered by Ethereum • IPFS Storage • Zero-Knowledge Proofs</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">DecentralizeIt</h1>
              </div>
              <p className="text-slate-300">Decentralized Petition Platform</p>
            </div>

            {/* Wallet Connection Status */}
            {walletConnected && (
              <div className="lg:hidden text-center mb-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Badge>
              </div>
            )}

            {/* MetaMask Not Available Warning */}
            {!isMetaMaskAvailable && (
              <div className="mb-6">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-400 mb-1">MetaMask Required</h4>
                      <p className="text-sm text-slate-300 mb-3">
                        To use blockchain features, you need MetaMask installed in your browser.
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

            {/* Wallet Error Display */}
            {walletError && (
              <div className="mb-6">
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

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                <CardDescription className="text-slate-300">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-slate-300"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm text-slate-300">
                          <input type="checkbox" className="rounded border-white/20" />
                          <span>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-white">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-white">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-white">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-1 rounded border-white/20" required />
                        <label className="text-sm text-slate-300">
                          I agree to the{" "}
                          <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full bg-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {isMetaMaskAvailable ? (
                      <Button
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={connectWallet}
                        disabled={isConnecting || walletConnected}
                      >
                        {isConnecting ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : walletConnected ? (
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                        ) : (
                          <Wallet className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="bg-orange-500/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30"
                        onClick={installMetaMask}
                      >
                        <Wallet className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Chrome className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                New to blockchain petitions?{" "}
                <Link href="/learn" className="text-cyan-400 hover:text-cyan-300">
                  Learn how it works
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
