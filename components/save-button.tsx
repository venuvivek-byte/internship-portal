'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

interface SaveButtonProps {
  id: string;
  initialSaved?: boolean;
}

export function SaveButton({ id, initialSaved = false }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/internships/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save internship');
      }

      setIsSaved(!isSaved);
      toast.success(isSaved ? 'Internship removed from saved' : 'Internship saved successfully');
    } catch (error) {
      toast.error('Failed to save internship');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isSaved ? 'secondary' : 'outline'}
      size="icon"
      onClick={handleSave}
      disabled={isLoading}
    >
      <Bookmark className={isSaved ? 'fill-current' : ''} />
    </Button>
  );
} 