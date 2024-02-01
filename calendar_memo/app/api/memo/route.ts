import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { year, month, day, content, title } = await req.json()
  const currentUser = await getCurrentUser()
  const date = new Date(year, month, day)
  try {
    const memo = await prisma.memo.upsert({
      where: {
        userId: currentUser?.id,
        createdAt: date
      },
      update: {
        title: title,
        content: content
      },
      create: {
        title: title,
        content: content,
        userId: currentUser?.id!
      },
    })
    return NextResponse.json(memo)
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}