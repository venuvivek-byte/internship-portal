import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function InternshipFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search internships..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(
              `?${createQueryString("search", e.target.value)}`,
              { scroll: false }
            )
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select
          defaultValue={searchParams.get("location") ?? ""}
          onValueChange={(value) => {
            router.push(
              `?${createQueryString("location", value)}`,
              { scroll: false }
            )
          }}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">On-site</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <Select
          defaultValue={searchParams.get("duration") ?? ""}
          onValueChange={(value) => {
            router.push(
              `?${createQueryString("duration", value)}`,
              { scroll: false }
            )
          }}
        >
          <SelectTrigger id="duration">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Durations</SelectItem>
            <SelectItem value="1-3 months">1-3 months</SelectItem>
            <SelectItem value="3-6 months">3-6 months</SelectItem>
            <SelectItem value="6+ months">6+ months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          defaultValue={searchParams.get("type") ?? ""}
          onValueChange={(value) => {
            router.push(
              `?${createQueryString("type", value)}`,
              { scroll: false }
            )
          }}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 