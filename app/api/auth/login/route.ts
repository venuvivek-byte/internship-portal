import { NextResponse } from "next/server"
import { signIn } from "next-auth/react"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!result?.ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 