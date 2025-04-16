import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }

// Create a custom auth function that works with Next.js 14
export async function auth() {
  const session = await handler.auth()
  return session
}

export const signIn = handler.signIn
export const signOut = handler.signOut 