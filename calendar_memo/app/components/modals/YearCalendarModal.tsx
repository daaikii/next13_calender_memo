import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs"

const YearCalendarModal = () => {
  const [year, setYear] = useState(0)
  const yearData = [...Array(12)].map((_, i) => i + 1)
  const router = useRouter()

  const prevYear = () => {
    setYear(year - 1)
  }
  const nextYear = () => {
    setYear(Number(year) + 1)
  }

  useEffect(() => {
    const date = new Date()
    setYear(date.getFullYear())
  }, [])

  return (
    <div className="absolute ">
      <div className="flex">
        <BsCaretLeftFill onClick={() => prevYear()} />
        <p>{year}</p>
        <BsCaretRightFill onClick={() => nextYear()} />
      </div>
      <div className="flex">
        {yearData.map((i) => {
          return <p key={i} onClick={() => router.push(`/memo/memoList/${year}/${i}`)}>{i}</p>
        })}
      </div>
    </div>
  )
}

export default YearCalendarModal