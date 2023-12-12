import prisma from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getMemoData = async (year: number, month: number) => {
  const date = new Date(year, month, 1)
  const user = await getCurrentUser()
  if (!user?.email) {
    return []
  }
  try {
    const memoData = await prisma.memo.findMany({
      where: {
        AND: {
          user: {
            email: user?.email
          },
          createdAt: date
        }
      }
    })
    if (!memoData) {
      return []
    }
    return memoData
  }
  catch {
    return []
  }
}


export default getMemoData