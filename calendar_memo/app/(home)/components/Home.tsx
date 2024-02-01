"use client"
import { useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { CiCalendarDate, CiViewList, CiMedicalClipboard, CiLock } from "react-icons/ci";


const Home = () => {
  const session = useSession()
  const isLogin = session.status === "authenticated"
  const router = useRouter()
  const { y, m, d } = useMemo(() => {
    const current = new Date()
    const y = current.getFullYear()
    const m = current.getMonth() + 1
    const d = current.getDate()
    return { y, m, d }
  }, [])

  return <>
    <div className="text-center max-w-5xl mx-auto overflow-hidden">

      <h1 className=" mt-10 text-5xl">
        Calendar Memo
      </h1>

      <div className="flex justify-center mt-10">
        <div
          className={clsx(
            " mx-3 relative",
            isLogin ? "" : "text-gray-50"
          )}
        >
          {!isLogin && (
            <CiLock size={100} className="absolute top-6 left-6 text-gray-500" />
          )}
          <CiCalendarDate size={150} onClick={() => isLogin && router.push(`/memo/calendar`)} className="border rounded-xl hover:cursor-pointer" />
          <p>CALENDAR</p>
        </div>

        <div
          className={clsx(
            " mx-3 relative",
            isLogin ? "" : "text-gray-50"
          )}
        >
          {!isLogin && (
            <CiLock size={100} className="absolute top-6 left-6 text-gray-500" />
          )}
          <CiViewList size={150} onClick={() => isLogin && router.push(`/memo/memoList/${y}/${m}`)} className="border rounded-xl hover:cursor-pointer" />
          <p>MEMO LIST</p>
        </div>

        <div
          className={clsx(
            " mx-3 relative",
            isLogin ? "" : "text-gray-50"
          )}
        >
          {!isLogin && (
            <CiLock size={100} className="absolute top-6 left-6 text-gray-500" />
          )}
          <CiMedicalClipboard size={150} onClick={() => isLogin && router.push(`/memo/${y}/${m}/${d}`)} className="border rounded-xl hover:cursor-pointer" />
          <p>MEMO</p>
        </div>
      </div>

      {!isLogin &&
        <div>
          <p>アカウントの作成、ログインして使用する</p>
          <Link href="auth" className="text-2xl">Login</Link>
        </div>
      }

      <div className="mt-10">
        <p>カレンダー、メモリストから選択し、メモを作成、編集</p>

      </div>

    </div >
  </>
}

export default Home