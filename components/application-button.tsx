'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ApplicationButtonProps {
  id: string
}

export function ApplicationButton({ id }: ApplicationButtonProps) {
  return (
    <Button asChild>
      <Link href={`/internships/${id}/apply`}>
        Apply Now
      </Link>
    </Button>
  )
} 