import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
const handler = NextAuth({
  debug: true,
  providers: [
    // OAuth authentication providers...
    GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      }),
    GoogleProvider({
      clientId : process.env.AUTH_GOOGLE_ID || "",
      clientSecret : process.env.AUTH_GOOGLE_SECRET || ""
    })
  ]
})

export {handler as GET, handler as POST}


