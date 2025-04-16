import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Mock user for testing
const MOCK_USER = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  password: "password123" // In a real app, this would be hashed
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check against mock user
        if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
          return {
            id: MOCK_USER.id,
            email: MOCK_USER.email,
            name: MOCK_USER.name,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }

      return token
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig 