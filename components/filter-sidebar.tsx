"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function FilterSidebar({ className = "" }) {
  const [openCategories, setOpenCategories] = useState(true)
  const [openLocation, setOpenLocation] = useState(true)
  const [openDuration, setOpenDuration] = useState(true)
  const [openStipend, setOpenStipend] = useState(true)

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Filters</h3>
        <p className="text-sm text-muted-foreground">Narrow down your search results</p>
      </div>

      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Field / Category
            <ChevronDown className={`h-4 w-4 transition-transform ${openCategories ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="software" />
              <Label htmlFor="software" className="font-normal">
                Software Development
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="data" />
              <Label htmlFor="data" className="font-normal">
                Data Science
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="design" />
              <Label htmlFor="design" className="font-normal">
                Design
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="font-normal">
                Marketing
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="business" />
              <Label htmlFor="business" className="font-normal">
                Business
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="engineering" />
              <Label htmlFor="engineering" className="font-normal">
                Engineering
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openLocation} onOpenChange={setOpenLocation}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Location
            <ChevronDown className={`h-4 w-4 transition-transform ${openLocation ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="remote" />
              <Label htmlFor="remote" className="font-normal">
                Remote
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="onsite" />
              <Label htmlFor="onsite" className="font-normal">
                On-site
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hybrid" />
              <Label htmlFor="hybrid" className="font-normal">
                Hybrid
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openDuration} onOpenChange={setOpenDuration}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Duration
            <ChevronDown className={`h-4 w-4 transition-transform ${openDuration ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="1-3" />
              <Label htmlFor="1-3" className="font-normal">
                1-3 months
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="3-6" />
              <Label htmlFor="3-6" className="font-normal">
                3-6 months
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="6+" />
              <Label htmlFor="6+" className="font-normal">
                6+ months
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openStipend} onOpenChange={setOpenStipend}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Stipend
            <ChevronDown className={`h-4 w-4 transition-transform ${openStipend ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">$0</span>
              <span className="text-sm">$5000+</span>
            </div>
            <Slider defaultValue={[1500]} max={5000} step={100} />
            <div className="text-center text-sm text-muted-foreground">Min. $1500 per month</div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

