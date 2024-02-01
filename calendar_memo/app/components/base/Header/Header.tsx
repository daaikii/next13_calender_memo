"use client"
import { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CiHome, CiCalendarDate, CiViewList } from "react-icons/ci";

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { y, m } = useMemo(() => {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    return { y, m }
  }, [])

  return <div className="flex justify-between">
    {pathname !== "/" &&
      <button className="p-3 hover:border-b-2 hover:mb-[-2px]" onClick={() => router.push("/")}>
        <CiHome size={30} />
      </button>
    }
    <div>
      {pathname !== "/memo/calendar" &&
        <button className="p-3  hover:border-b-2 hover:mb-[-2px]" onClick={() => router.push("/memo/calendar")}>
          <CiCalendarDate size={30} />
        </button>
      }
      {!pathname.includes("/memo/memoList") &&
        <button className=" p-3   ml-2  hover:border-b-2  hover:mb-[-2px]" onClick={() => router.push(`/memo/memoList/${y}/${m}`)}>
          <CiViewList size={30} />
        </button>
      }
    </div>
  </div>
}

export default Header