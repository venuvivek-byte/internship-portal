'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Internship } from '@/lib/mock-data';

async function getInternship(id: string) {
  const response = await fetch(`/api/internships/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch internship');
  }
  return response.json();
}

export default function EditInternshipPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    getInternship(id)
      .then(setInternship)
      .catch(() => {
        toast.error('Failed to load internship');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`/api/internships/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error('Failed to update internship');
      }

      toast.success('Internship updated successfully');
      router.push('/admin/internships');
    } catch (error) {
      toast.error('Failed to update internship');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Internship not found</h1>
        <p className="text-gray-600 mb-4">The internship you're trying to edit doesn't exist.</p>
        <Link href="/admin/internships" className="text-blue-500 hover:underline">
          <ArrowLeft className="inline-block mr-2" />
          Back to internships
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/internships" className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="mr-2" />
          Back to internships
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={internship.title}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            defaultValue={internship.description}
            required
            className="mt-1"
            rows={6}
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <Input
            type="text"
            id="requirements"
            name="requirements"
            defaultValue={internship.requirements}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            defaultValue={internship.location}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <Input
            type="text"
            id="type"
            name="type"
            defaultValue={internship.type}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <Input
            type="text"
            id="duration"
            name="duration"
            defaultValue={internship.duration}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
            Stipend
          </label>
          <Input
            type="text"
            id="stipend"
            name="stipend"
            defaultValue={internship.stipend}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
            Mode
          </label>
          <Input
            type="text"
            id="mode"
            name="mode"
            defaultValue={internship.mode}
            required
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
} 