"use client"

import { MOCK_INTERNSHIPS } from '@/lib/mock-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Building2, CalendarDays, MapPin, Search, Briefcase, BookmarkIcon, Send, Bookmark, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function InternshipsPage() {
  const router = useRouter()
  const [filteredInternships, setFilteredInternships] = useState(MOCK_INTERNSHIPS)
  const [savedInternships, setSavedInternships] = useState<Set<string>>(new Set())
  const [appliedInternships, setAppliedInternships] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    stipendRange: "all"
  })
  const [mounted, setMounted] = useState(false)

  // Get unique locations for the filter dropdown
  const locations = Array.from(new Set(MOCK_INTERNSHIPS.map(intern => intern.location)))
  
  const stipendRanges = [
    "0-10000",
    "10000-20000",
    "20000-30000",
    "30000+"
  ]

  useEffect(() => {
    // Load saved internships from localStorage
    const saved = localStorage.getItem('savedInternships')
    if (saved) {
      setSavedInternships(new Set(JSON.parse(saved)))
    }

    // Load applied internships from localStorage
    const applied = localStorage.getItem('appliedInternships')
    if (applied) {
      setAppliedInternships(new Set(JSON.parse(applied)))
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const filtered = MOCK_INTERNSHIPS.filter(internship => {
      const matchesSearch = filters.search === "" || 
        internship.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        internship.company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        internship.requirements.toLowerCase().includes(filters.search.toLowerCase())

      const matchesLocation = filters.location === "all" || 
        internship.location === filters.location

      const stipendValue = parseInt(internship.stipend.replace(/[^0-9]/g, ""))
      let matchesStipend = true
      if (filters.stipendRange !== "all") {
        const [min, max] = filters.stipendRange.split("-").map(Number)
        if (max) {
          matchesStipend = stipendValue >= min && stipendValue <= max
        } else {
          matchesStipend = stipendValue >= min
        }
      }

      return matchesSearch && matchesLocation && matchesStipend
    })

    setFilteredInternships(filtered)
  }, [filters, mounted])

  const handleSaveInternship = (internshipId: string) => {
    setSavedInternships(prev => {
      const newSaved = new Set(prev)
      if (newSaved.has(internshipId)) {
        newSaved.delete(internshipId)
        toast.info("Internship removed from saved list")
      } else {
        newSaved.add(internshipId)
        toast.success("Internship saved successfully")
      }
      localStorage.setItem('savedInternships', JSON.stringify(Array.from(newSaved)))
      return newSaved
    })
  }

  const handleApplyInternship = (internshipId: string) => {
    if (appliedInternships.has(internshipId)) {
      toast.info("You have already applied to this internship")
      return
    }
    router.push(`/user/internships/apply/${internshipId}`)
  }

  const getSavedInternships = () => {
    return MOCK_INTERNSHIPS.filter(internship => savedInternships.has(internship.id))
  }

  const getAppliedInternships = () => {
    return MOCK_INTERNSHIPS.filter(internship => appliedInternships.has(internship.id))
  }

  const renderInternshipRow = (internship: any, showActions: boolean = true) => (
    <TableRow 
      key={internship.id}
      className="group hover:bg-gray-50/50"
    >
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span className="font-semibold text-lg mb-2 text-blue-900">{internship.title}</span>
          <div className="flex gap-2 flex-wrap">
            {internship.requirements.split(", ").map((skill: string) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-xs bg-blue-100/80 text-blue-800 hover:bg-blue-100 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">{internship.company.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">{internship.location}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">{internship.duration}</span>
        </div>
      </TableCell>
      {showActions && (
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                savedInternships.has(internship.id) 
                  ? 'text-yellow-600 hover:text-yellow-700' 
                  : 'text-gray-600 hover:text-gray-700'
              }`}
              onClick={() => handleSaveInternship(internship.id)}
            >
              <BookmarkIcon className={`w-4 h-4 ${
                savedInternships.has(internship.id) ? 'fill-yellow-600' : ''
              }`} />
              {savedInternships.has(internship.id) ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant={appliedInternships.has(internship.id) ? "outline" : "default"}
              size="sm"
              className={`flex items-center gap-1 ${
                appliedInternships.has(internship.id)
                  ? 'text-green-600 hover:text-green-700 border-green-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } hover:scale-105 transition-all duration-200`}
              onClick={() => handleApplyInternship(internship.id)}
              disabled={appliedInternships.has(internship.id)}
            >
              {appliedInternships.has(internship.id) ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Applied
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Apply
                </>
              )}
            </Button>
          </div>
        </TableCell>
      )}
    </TableRow>
  )

  if (!mounted) {
    return null
  }

  const savedInternshipsList = getSavedInternships()
  const appliedInternshipsList = getAppliedInternships()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap gap-4 mb-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Internships</CardTitle>
            <CardDescription>Number of available positions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{filteredInternships.length}</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Saved Internships</CardTitle>
            <CardDescription>Positions you've bookmarked</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{savedInternships.size}</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Applied Internships</CardTitle>
            <CardDescription>Positions you've applied to</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{appliedInternships.size}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available Internships
          </h1>
          <p className="text-gray-600 text-lg">Find your perfect internship opportunity</p>
        </div>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="saved">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">
                  Saved Internships ({savedInternshipsList.length})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              {savedInternshipsList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[35%] font-semibold">Position</TableHead>
                      <TableHead className="w-[20%] font-semibold">Company</TableHead>
                      <TableHead className="w-[15%] font-semibold">Location</TableHead>
                      <TableHead className="w-[15%] font-semibold">Duration</TableHead>
                      <TableHead className="w-[15%] font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedInternshipsList.map(internship => renderInternshipRow(internship))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 py-4">No saved internships yet.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="applied">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">
                  Applied Internships ({appliedInternshipsList.length})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              {appliedInternshipsList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%] font-semibold">Position</TableHead>
                      <TableHead className="w-[20%] font-semibold">Company</TableHead>
                      <TableHead className="w-[20%] font-semibold">Location</TableHead>
                      <TableHead className="w-[20%] font-semibold">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appliedInternshipsList.map(internship => renderInternshipRow(internship, false))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 py-4">No applications submitted yet.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col md:flex-row gap-4 p-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search by position or company..."
                className="pl-10 w-full"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-[200px]">
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-[200px]">
              <Select
                value={filters.stipendRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, stipendRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by stipend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stipends</SelectItem>
                  {stipendRanges.map(range => (
                    <SelectItem key={range} value={range}>₹{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 text-sm text-gray-500">
          Showing {filteredInternships.length} internships
        </div>

        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[35%] font-semibold">Position</TableHead>
                <TableHead className="w-[20%] font-semibold">Company</TableHead>
                <TableHead className="w-[15%] font-semibold">Location</TableHead>
                <TableHead className="w-[15%] font-semibold">Duration</TableHead>
                <TableHead className="w-[15%] font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map(internship => renderInternshipRow(internship, true))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}