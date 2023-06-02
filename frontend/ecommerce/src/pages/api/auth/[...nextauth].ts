import NextAuth from "next-auth"
import Providers from "next-auth/providers"
// import GoogleProviders from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      // GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      // clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
}

export default NextAuth(authOptions)