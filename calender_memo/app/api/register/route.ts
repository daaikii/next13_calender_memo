import bcrypt from "bcrypt"
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server"

export const Post = async (req: Request) => {
  const { data } = await req.json()
  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      id: data.id,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
