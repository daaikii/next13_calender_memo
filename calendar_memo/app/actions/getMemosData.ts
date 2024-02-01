import prisma from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getMemosData = async (year: number, month: number) => {
  const date = new Date(year, month, 1)
  const user = await getCurrentUser()
  if (!user?.email) {
    return []
  }
  try {
    const memoData = await prisma.memo.findMany({
      where: {
        AND: [
          {
            user: {
              email: user?.email
            },
          },
          {
            createdAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 0)
            }
          }
        ]
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


export default getMemosData