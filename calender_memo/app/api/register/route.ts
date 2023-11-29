import bcrypt from "bcrypt"
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export const Post = async (req: Request) => {
  const { email, name, password } = await req.json()
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email: email,
      id: name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
