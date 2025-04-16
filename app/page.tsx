"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Code2, Brain, LineChart, Globe, Cpu, Palette, Shield, Database } from "lucide-react"

const growingProfessions = [
  {
    id: 1,
    title: "Software Development",
    description: "Build the future of technology through code",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    illustration: "https://illustrations.popsy.co/blue/developer.svg",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    description: "Shape the future of artificial intelligence",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    illustration: "https://illustrations.popsy.co/blue/artificial-intelligence.svg",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Data Science",
    description: "Transform data into actionable insights",
    icon: LineChart,
    color: "from-green-500 to-emerald-500",
    illustration: "https://illustrations.popsy.co/blue/data-science.svg",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Drive growth in the digital landscape",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    illustration: "https://illustrations.popsy.co/blue/marketing.svg",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Cloud Computing",
    description: "Build and manage cloud infrastructure",
    icon: Database,
    color: "from-blue-600 to-indigo-600",
    illustration: "https://illustrations.popsy.co/blue/cloud-computing.svg",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "Create beautiful and intuitive experiences",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    illustration: "https://illustrations.popsy.co/blue/product-design.svg",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    title: "Cybersecurity",
    description: "Protect digital assets and information",
    icon: Shield,
    color: "from-gray-700 to-gray-900",
    illustration: "https://illustrations.popsy.co/blue/security.svg",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    title: "IoT Development",
    description: "Connect the physical and digital worlds",
    icon: Cpu,
    color: "from-teal-500 to-cyan-500",
    illustration: "https://illustrations.popsy.co/blue/iot.svg",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <motion.div
          className="text-center space-y-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="space-y-4">
            <h1 className="space-y-2">
              <span className="block font-['Brush_Script_MT'] italic text-2xl text-gray-600">Welcome to</span>
              <span className="block font-['Calibri'] text-4xl font-bold text-gray-900">
                internCONNECT
              </span>
            </h1>
            <p className="text-2xl text-gray-800">
              Your Gateway to Professional Success
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with leading companies and discover opportunities that shape your future career path
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/user/internships">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                Browse All Internships
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Growing Professions Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Explore Career Paths</h2>
          <p className="text-lg text-gray-600">
            Find internships in these high-demand fields and start your professional journey
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {growingProfessions.map((profession, index) => (
            <motion.div
              key={profession.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              whileHover={{ y: -5 }}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={profession.image}
                  alt={profession.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm bg-gradient-to-r ${profession.color}`}>
                    <profession.icon className="w-4 h-4 mr-2" />
                    <span>Trending</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {profession.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {profession.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-6">
                  <Link href={`/user/internships?category=${profession.title}`} className="block">
                    <Button 
                      className={`w-full bg-gradient-to-r ${profession.color} text-white hover:opacity-90 transition-all duration-300`}
                    >
                      View Internships
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

