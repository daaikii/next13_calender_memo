import { authOption } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import prisma from "../libs/prismadb"

const getCurrentUser = async () => {
  const session = await getServerSession(authOption)
  if (!session?.user?.email) {
    return null
  }
  try {
    const currentUser = prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (!currentUser) {
      return null
    }
    return currentUser
  } catch {
    return null
  }
}

export default getCurrentUser