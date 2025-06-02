"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Plus,
  Search,
  Bell,
  TrendingUp,
  Users,
  FileText,
  Zap,
  ChevronDown,
  Filter,
  Star,
  Eye,
  Share2,
  CheckCircle,
  Clock,
  Calendar,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [petitionFilter, setPetitionFilter] = useState("all") // all, active, completed
  const [sortOrder, setSortOrder] = useState("newest") // newest, oldest, most-signatures

  const userStats = [
    { label: "Petitions Created", value: "12", icon: FileText, color: "text-blue-400" },
    { label: "Petitions Signed", value: "47", icon: Users, color: "text-green-400" },
    { label: "Total Impact", value: "2.3K", icon: TrendingUp, color: "text-purple-400" },
    { label: "Success Rate", value: "83%", icon: Zap, color: "text-orange-400" },
  ]

  const myPetitions = [
    {
      id: 1,
      title: "Clean Energy Initiative for Local Schools",
      status: "Active",
      signatures: 1247,
      target: 2000,
      daysLeft: 15,
      category: "Environment",
      trending: true,
      createdAt: "2023-11-15",
    },
    {
      id: 2,
      title: "Digital Privacy Rights Protection",
      status: "Active",
      signatures: 856,
      target: 1500,
      daysLeft: 8,
      category: "Technology",
      trending: false,
      createdAt: "2023-12-01",
    },
    {
      id: 3,
      title: "Community Garden Development",
      status: "Completed",
      signatures: 2100,
      target: 2000,
      daysLeft: 0,
      category: "Community",
      trending: false,
      createdAt: "2023-10-20",
    },
    {
      id: 4,
      title: "Affordable Housing Initiative",
      status: "Active",
      signatures: 1823,
      target: 5000,
      daysLeft: 21,
      category: "Housing",
      trending: false,
      createdAt: "2023-12-10",
    },
    {
      id: 5,
      title: "Public Transportation Improvement",
      status: "Completed",
      signatures: 3500,
      target: 3000,
      daysLeft: 0,
      category: "Infrastructure",
      trending: false,
      createdAt: "2023-09-15",
    },
    {
      id: 6,
      title: "Mental Health Resources for Schools",
      status: "Active",
      signatures: 987,
      target: 2500,
      daysLeft: 30,
      category: "Healthcare",
      trending: true,
      createdAt: "2023-12-05",
    },
  ]

  const recentActivity = [
    { type: "signature", petition: "Climate Action Now", user: "Sarah M.", time: "2 hours ago" },
    { type: "comment", petition: "Education Reform", user: "Mike R.", time: "4 hours ago" },
    { type: "share", petition: "Healthcare Access", user: "Emma L.", time: "6 hours ago" },
    { type: "signature", petition: "Digital Rights", user: "Alex K.", time: "8 hours ago" },
  ]

  const trendingPetitions = [
    {
      id: 7,
      title: "Universal Basic Income Pilot Program",
      signatures: 15420,
      target: 20000,
      category: "Economics",
      creator: "Policy Institute",
    },
    {
      id: 8,
      title: "Renewable Energy Transition Plan",
      signatures: 8750,
      target: 10000,
      category: "Environment",
      creator: "Green Coalition",
    },
    {
      id: 9,
      title: "Mental Health Support in Schools",
      signatures: 12300,
      target: 15000,
      category: "Education",
      creator: "Student Alliance",
    },
  ]

  // Filter petitions based on selected filter
  const filteredPetitions = myPetitions.filter((petition) => {
    if (petitionFilter === "all") return true
    if (petitionFilter === "active") return petition.status === "Active"
    if (petitionFilter === "completed") return petition.status === "Completed"
    return true
  })

  // Sort petitions based on selected sort order
  const sortedPetitions = [...filteredPetitions].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if (sortOrder === "most-signatures") {
      return b.signatures - a.signatures
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">DecentralizeIt</h1>
                    <p className="text-xs text-cyan-200">Dashboard</p>
                  </div>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "overview" ? "text-cyan-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("my-petitions")}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "my-petitions" ? "text-cyan-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    My Petitions
                  </button>
                  <button
                    onClick={() => setActiveTab("discover")}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "discover" ? "text-cyan-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Discover
                  </button>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search petitions..."
                    className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  asChild
                >
                  <Link href="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    New Petition
                  </Link>
                </Button>

                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <Bell className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Mobile Navigation Tabs */}
          <div className="md:hidden mb-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 bg-white/10">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="my-petitions" className="text-white data-[state=active]:bg-white/20">
                  My Petitions
                </TabsTrigger>
                <TabsTrigger value="discover" className="text-white data-[state=active]:bg-white/20">
                  Discover
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h2>
                  <p className="text-slate-300">Here's what's happening with your petitions today.</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Blockchain Synced
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userStats.map((stat, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-300 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* My Active Petitions */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">My Active Petitions</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:text-cyan-300"
                          onClick={() => setActiveTab("my-petitions")}
                        >
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {myPetitions
                        .filter((p) => p.status === "Active")
                        .slice(0, 3)
                        .map((petition) => (
                          <div key={petition.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-medium text-white">{petition.title}</h3>
                                  {petition.trending && (
                                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                  {petition.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-300">
                                  {petition.signatures.toLocaleString()} signatures
                                </span>
                                <span className="text-slate-400">{petition.daysLeft} days left</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${(petition.signatures / petition.target) * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-slate-400">
                                Goal: {petition.target.toLocaleString()} signatures
                              </div>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div>
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Activity</CardTitle>
                      <CardDescription className="text-slate-300">
                        Latest interactions with your petitions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            {activity.type === "signature" && <Users className="h-4 w-4 text-white" />}
                            {activity.type === "comment" && <FileText className="h-4 w-4 text-white" />}
                            {activity.type === "share" && <Share2 className="h-4 w-4 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.type === "signature" && "signed"}
                              {activity.type === "comment" && "commented on"}
                              {activity.type === "share" && "shared"}{" "}
                              <span className="text-cyan-400">{activity.petition}</span>
                            </p>
                            <p className="text-xs text-slate-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "my-petitions" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">My Petitions</h2>
                  <p className="text-slate-300">Manage and track all your created petitions</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={petitionFilter} onValueChange={setPetitionFilter}>
                    <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white">
                        All Petitions
                      </SelectItem>
                      <SelectItem value="active" className="text-white">
                        Active
                      </SelectItem>
                      <SelectItem value="completed" className="text-white">
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="newest" className="text-white">
                        Newest First
                      </SelectItem>
                      <SelectItem value="oldest" className="text-white">
                        Oldest First
                      </SelectItem>
                      <SelectItem value="most-signatures" className="text-white">
                        Most Signatures
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Petitions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPetitions.map((petition) => (
                  <Card
                    key={petition.id}
                    className={`bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all ${
                      petition.status === "Completed" ? "border-green-500/30" : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="secondary"
                          className={`${
                            petition.status === "Active"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-green-500/20 text-green-400 border-green-500/30"
                          }`}
                        >
                          {petition.status === "Active" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {petition.status}
                        </Badge>
                        <Badge variant="outline" className="bg-white/5 text-slate-300 border-white/20">
                          {petition.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{petition.title}</CardTitle>
                      <div className="flex items-center text-xs text-slate-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Created on {new Date(petition.createdAt).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{petition.signatures.toLocaleString()} signatures</span>
                          <span className="text-slate-400">
                            {petition.status === "Active" ? `${petition.daysLeft} days left` : "Completed"}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              petition.status === "Active"
                                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                                : "bg-gradient-to-r from-green-400 to-emerald-500"
                            }`}
                            style={{ width: `${Math.min(100, (petition.signatures / petition.target) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-400">
                          Goal: {petition.target.toLocaleString()} signatures
                        </div>

                        <div className="flex justify-between pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            asChild
                          >
                            <Link href={`/petition/${petition.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>

                          <div className="flex space-x-2">
                            {petition.status === "Active" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {sortedPetitions.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No petitions found</h3>
                  <p className="text-slate-400 mb-6">
                    {petitionFilter === "all"
                      ? "You haven't created any petitions yet."
                      : `You don't have any ${petitionFilter} petitions.`}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    asChild
                  >
                    <Link href="/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Petition
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "discover" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Discover Petitions</h2>
                  <p className="text-slate-300">Find and support causes that matter to you.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingPetitions.map((petition) => (
                  <Card
                    key={petition.id}
                    className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {petition.category}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-yellow-400">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-white text-lg">{petition.title}</CardTitle>
                      <CardDescription className="text-slate-300">by {petition.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{petition.signatures.toLocaleString()} signatures</span>
                          <span className="text-slate-400">Goal: {petition.target.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                            style={{ width: `${(petition.signatures / petition.target) * 100}%` }}
                          ></div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                          Sign Petition
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
