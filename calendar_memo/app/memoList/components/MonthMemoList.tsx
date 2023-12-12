"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import { Memo } from "@prisma/client";
import useSettingDate from "@/app/hooks/useSettingDate"
import Calendar from "@/app/calendar/components/Calendar";


const MonthMemoList = ({ memoData, year, month }: { memoData: Memo[], year: number, month: number }) => {
  const [modal, setModal] = useState("CLOSE")
  const { end } = useSettingDate(year, month)
  const router = useRouter()

  //先月のデータに変更
  const prevMonth = () => {
    if (month == 1) {
      router.push(`/memoList/${year - 1}/12`)
    }
    if (month != 1) {
      router.push(`/memoList/${year}/${month - 1}`)
    }
  }
  //翌月のデータに変更
  const nextMonth = () => {
    if (month == 12) {
      router.push(`/memoList/${Number(year) + 1}/1`)
    }
    if (month != 12)
      router.push(`/memoList/${year}/${Number(month) + 1}`)
  }

  //モーダルでカレンダーの表示
  const toggleModal = useCallback(() => {
    if (modal === "CLOSE") {
      setModal("OPEN")
    }
    if (modal === "OPEN") {
      setModal("CLOSE")
    }
  }, [modal])


  return (
    <div className=" bg-gray-100 h-full">
      <div className="max-w-5xl  mx-auto ">
        <div className="bg-white  h-screen p-6">

          <div className="">
            {/* 日付けと変更 */}
            <div className="flex justify-center  text-xl">
              <button onClick={() => prevMonth()}>
                <BsCaretLeftFill />
              </button>
              <h2
                className="text-center text-3xl"
                onClick={() => toggleModal()}
              >
                {year}.{month}
              </h2>
              <button onClick={() => nextMonth()}>
                <BsCaretRightFill />
              </button>
            </div>

            {/* カレンダーモーダル */}
            <div className={
              modal === "OPEN"
                ? "block"
                : "hidden"
            }>
              <Calendar yearProps={year} monthProps={month} />
            </div>
          </div>

          <ul>
            {
              memoData && Array(end.getDate()).map((_, i) => {
                const byDateMemo = memoData.find((memo) => memo.createdAt.getDate() === i + 1)
                return (
                  <li key={i}>
                    <dl>
                      <dt>
                        <h2>
                          {byDateMemo?.createdAt.getDate()}
                        </h2>
                      </dt>
                      <dd>
                        <p>
                          {byDateMemo?.content}
                        </p>
                      </dd>
                    </dl>
                  </li>
                )
              })
            }
          </ul>

        </div>
      </div>
    </div>
  )
}

export default MonthMemoList