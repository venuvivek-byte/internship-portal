"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Internship Portal
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/internships"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Internships
                </Link>
                <Link
                  href="/applications"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Applications
                </Link>
                <Link
                  href="/saved"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Saved
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Profile
                </Link>
                <Button variant="outline" asChild>
                  <Link href="/api/auth/signout">Sign Out</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 