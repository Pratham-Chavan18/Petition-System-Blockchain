"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Search, Filter, TrendingUp, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PetitionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")

  const petitions = [
    {
      id: 1,
      title: "Climate Action Now",
      description:
        "Demand immediate action on climate change from world leaders. We need comprehensive policies to reduce carbon emissions and transition to renewable energy sources.",
      signatures: 15420,
      target: 20000,
      category: "Environment",
      timeLeft: "12 days left",
      creator: "Environmental Coalition",
      verified: true,
      trending: true,
    },
    {
      id: 2,
      title: "Digital Privacy Rights",
      description:
        "Protect user data and establish comprehensive digital privacy laws that give users control over their personal information.",
      signatures: 8750,
      target: 10000,
      category: "Technology",
      timeLeft: "8 days left",
      creator: "Privacy Advocates",
      verified: true,
      trending: true,
    },
    {
      id: 3,
      title: "Education Funding Reform",
      description:
        "Increase funding for public education and teacher salaries to ensure quality education for all students.",
      signatures: 12300,
      target: 15000,
      category: "Education",
      timeLeft: "15 days left",
      creator: "Teachers Union",
      verified: true,
      trending: false,
    },
    {
      id: 4,
      title: "Universal Healthcare Access",
      description:
        "Establish universal healthcare coverage to ensure medical care is accessible and affordable for everyone.",
      signatures: 22100,
      target: 25000,
      category: "Healthcare",
      timeLeft: "20 days left",
      creator: "Healthcare Alliance",
      verified: true,
      trending: true,
    },
    {
      id: 5,
      title: "Animal Welfare Protection",
      description: "Strengthen laws protecting animals from cruelty and establish better standards for animal welfare.",
      signatures: 6800,
      target: 10000,
      category: "Animal Rights",
      timeLeft: "25 days left",
      creator: "Animal Rights Group",
      verified: true,
      trending: false,
    },
    {
      id: 6,
      title: "Renewable Energy Initiative",
      description: "Accelerate the transition to renewable energy sources and phase out fossil fuel dependency.",
      signatures: 18900,
      target: 30000,
      category: "Environment",
      timeLeft: "30 days left",
      creator: "Green Energy Coalition",
      verified: true,
      trending: true,
    },
  ]

  const categories = [
    "all",
    "environment",
    "technology",
    "education",
    "healthcare",
    "animal rights",
    "politics",
    "social justice",
  ]

  const filteredPetitions = petitions.filter((petition) => {
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || petition.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPetitions = [...filteredPetitions].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.trending ? 1 : -1
      case "signatures":
        return b.signatures - a.signatures
      case "recent":
        return b.id - a.id
      case "deadline":
        return Number.parseInt(a.timeLeft) - Number.parseInt(b.timeLeft)
      default:
        return 0
    }
  })

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
              <span className="text-xl font-bold text-gray-900">Browse Petitions</span>
            </div>
          </div>
          <Button asChild>
            <Link href="/create">Start a Petition</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search petitions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="signatures">Most Signatures</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="deadline">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {sortedPetitions.length} of {petitions.length} petitions
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>All petitions are blockchain verified</span>
            </div>
          </div>
        </div>

        {/* Petitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPetitions.map((petition) => (
            <Card key={petition.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{petition.category}</Badge>
                    {petition.trending && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  {petition.verified && <Shield className="h-4 w-4 text-green-600" />}
                </div>
                <CardTitle className="text-lg line-clamp-2">{petition.title}</CardTitle>
                <CardDescription className="line-clamp-3">{petition.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{petition.signatures.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500">{petition.timeLeft}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-600">
                        {Math.round((petition.signatures / petition.target) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((petition.signatures / petition.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">Goal: {petition.target.toLocaleString()} signatures</div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-3">Created by {petition.creator}</p>
                    <Button className="w-full" asChild>
                      <Link href={`/petition/${petition.id}`}>View & Sign</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedPetitions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No petitions found matching your criteria.</p>
            <Button className="mt-4" asChild>
              <Link href="/create">Create the first petition in this category</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
