import Link from "next/link"
import { UserButton } from "@/components/auth/user-button"

export default function AdminLayout({
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
                href="/admin/dashboard"
                className="transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/internships"
                className="transition-colors hover:text-primary"
              >
                Internships
              </Link>
              <Link
                href="/admin/applications"
                className="transition-colors hover:text-primary"
              >
                Applications
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