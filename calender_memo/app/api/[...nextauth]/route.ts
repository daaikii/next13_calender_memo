import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import TwitterProvider from 'next-auth/providers/twitter'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from "bcrypt"

import prisma from "@/app/lib/prismadb"

export const authOption = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: "",
      clientSecret: ""
    }),
    GoogleProvider({
      clientId: "",
      clientSecret: ""
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error()
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || !user.hashedPassword) {
          throw new Error()
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!isCorrectPassword) {
          throw new Error()
        }
        return user
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOption)