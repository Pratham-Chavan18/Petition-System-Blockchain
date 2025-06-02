import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileText, CheckCircle, ArrowRight, ArrowLeft, Lock, Globe, Zap } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Petition",
      description:
        "Write a compelling petition with clear goals and supporting evidence. Our platform guides you through the process.",
      icon: FileText,
      details: [
        "Choose a clear, actionable title",
        "Explain the problem and solution",
        "Set a realistic signature target",
        "Add supporting documents or images",
      ],
    },
    {
      number: 2,
      title: "Blockchain Verification",
      description:
        "Your petition is recorded on the blockchain, making it immutable and transparent for all to verify.",
      icon: Shield,
      details: [
        "Petition data is hashed and stored",
        "Immutable record created",
        "Public verification available",
        "Tamper-proof guarantee",
      ],
    },
    {
      number: 3,
      title: "Gather Signatures",
      description: "Share your petition and collect verified signatures from supporters around the world.",
      icon: Users,
      details: [
        "Each signature is cryptographically verified",
        "Duplicate signatures prevented",
        "Real-time progress tracking",
        "Global reach and accessibility",
      ],
    },
    {
      number: 4,
      title: "Make an Impact",
      description: "Use your verified petition to create real change and hold decision-makers accountable.",
      icon: CheckCircle,
      details: [
        "Present to decision-makers",
        "Media coverage and attention",
        "Transparent signature count",
        "Permanent record of support",
      ],
    },
  ]

  const benefits = [
    {
      icon: Lock,
      title: "Immutable Records",
      description: "Once created, petitions cannot be altered or deleted, ensuring permanent accountability.",
    },
    {
      icon: Shield,
      title: "Verified Signatures",
      description: "Each signature is cryptographically verified, preventing fraud and duplicate entries.",
    },
    {
      icon: Globe,
      title: "Global Transparency",
      description: "All petition data is publicly verifiable on the blockchain for complete transparency.",
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Real-time signature counting and progress tracking with immediate blockchain confirmation.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">How It Works</span>
            </div>
          </div>
          <Button asChild>
            <Link href="/create">Start a Petition</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">Blockchain-Powered Democracy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How BlockPetition Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines the power of traditional petitioning with blockchain technology to create transparent,
            verifiable, and tamper-proof campaigns for change.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col lg:flex-row items-center gap-8">
                <div className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.number}
                        </div>
                        <step.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                      <CardDescription className="text-lg">{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className={`lg:w-1/2 flex justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-blue-600" />
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <ArrowRight className="h-8 w-8 text-gray-400 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Blockchain?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Implementation</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Technology</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Ethereum-based Smart Contracts</p>
                    <p className="text-sm text-gray-600">Automated verification and signature recording</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">IPFS Storage</p>
                    <p className="text-sm text-gray-600">Decentralized storage for petition content</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Cryptographic Hashing</p>
                    <p className="text-sm text-gray-600">SHA-256 hashing for data integrity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Digital Signatures</p>
                    <p className="text-sm text-gray-600">Each signature is cryptographically signed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Identity Verification</p>
                    <p className="text-sm text-gray-600">Multi-factor authentication and KYC</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Audit Trail</p>
                    <p className="text-sm text-gray-600">Complete history of all actions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of activists using blockchain technology to create transparent, verifiable campaigns for
            change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/create">
                Start Your Petition
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/petitions">Browse Existing Petitions</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
