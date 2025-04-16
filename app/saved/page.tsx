'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { db } from "@/lib/db";
import Link from "next/link";

export default async function SavedInternshipsPage() {
  // For now, we'll show all internships since we don't have a saved system yet
  // In a real app, you would filter for saved internships only
  const internships = await db.internship.findMany();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Saved Internships</h1>
          <Button asChild variant="outline">
            <Link href="/">Back to All Internships</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={internship.company.logo_url}
                  alt={internship.company.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{internship.title}</h2>
                  <p className="text-gray-600">{internship.company.name}</p>
                </div>
                <Button asChild>
                  <Link href={`/internships/${internship.id}`}>View Details</Link>
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><span className="font-medium">Location:</span> {internship.location}</p>
                  <p><span className="font-medium">Duration:</span> {internship.duration}</p>
                </div>
                <div>
                  <p><span className="font-medium">Stipend:</span> {internship.stipend}</p>
                  <p><span className="font-medium">Type:</span> {internship.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 