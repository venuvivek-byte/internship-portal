import Link from "next/link"
import { UserButton } from "@/components/auth/user-button"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold">
              Internship Portal
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/user"
                className="transition-colors hover:text-primary"
              >
                Account
              </Link>
              <Link
                href="/user/search"
                className="transition-colors hover:text-primary"
              >
                Browse Internships
              </Link>
              <Link
                href="/user/applications"
                className="transition-colors hover:text-primary"
              >
                My Applications
              </Link>
              <Link
                href="/user/profile"
                className="transition-colors hover:text-primary"
              >
                Profile
              </Link>
            </nav>
          </div>
          <UserButton />
        </div>
      </header>
      {children}
    </div>
  )
} 