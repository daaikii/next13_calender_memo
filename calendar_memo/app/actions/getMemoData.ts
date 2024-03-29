import prisma from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getMemoData = async (year: number, month: number, day: number) => {
  const date = new Date(`${year}-${month}-${day}`)
  const user = await getCurrentUser()
  if (!user?.email) {
    return null
  }
  try {
    const memoData = await prisma.memo.findFirst({
      where: {
        AND: [
          {
            user: {
              email: user?.email
            }
          },
          {
            createdAt: {
              equals: new Date(year, month - 1, day),
            }
          }
        ]
      }
    })
    if (!memoData) {
      return null
    }
    return memoData
  }
  catch {
    return null
  }
}


export default getMemoData