"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Building, Briefcase } from "lucide-react"
import { prisma } from "@/lib/db"

// Define types for our data
interface Company {
  id: string
  name: string
  logo: string | null
}

interface Internship {
  id: string
  title: string
  description: string
  location: string
  type: string
  duration: string
  salary: string | null
  requirements: string[]
  company: Company
}

// Function to get featured internships
async function getFeaturedInternships() {
  const internships = await prisma.internship.findMany({
    where: {
      isActive: true,
    },
    include: {
      company: true,
    },
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return internships
}

export async function FeaturedInternships() {
  const internships = await getFeaturedInternships()

  return (
    <div className="py-8">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Internships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship: Internship) => (
            <Card key={internship.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  {internship.company.logo && (
                    <img
                      src={internship.company.logo}
                      alt={internship.company.name}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                  )}
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {internship.title}
                    </CardTitle>
                    <CardDescription>{internship.company.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {internship.duration}
                    </div>
                    {internship.salary && (
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {internship.salary}
                      </div>
                    )}
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {internship.type}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {internship.requirements.map((requirement: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {requirement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

