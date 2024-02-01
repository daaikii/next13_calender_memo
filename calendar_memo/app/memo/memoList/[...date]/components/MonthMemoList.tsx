"use client"
import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Memo } from "@prisma/client";
import clsx from "clsx";

import useSettingDate from "@/app/util/getSettingStartEnd"
import YearCalendar from "@/app/components/modals/YearCalendarModal";
import styles from "./MonthMemoList.module.scss"


const MonthMemoList = ({ memosData, year, month }: { memosData: Memo[], year: number, month: number }) => {
  const [modal, setModal] = useState("CLOSE")
  const [dateArray, setDateArray] = useState<number[]>()
  const { end } = useSettingDate(year, month)
  const router = useRouter()
  const slideRef = useRef(null)

  //先月のデータに変更
  const prevMonth = () => {
    if (month == 1) {
      router.push(`/memo/memoList/${year - 1}/12`)
    }
    if (month != 1) {
      router.push(`/memo/memoList/${year}/${month - 1}`)
    }
  }
  //翌月のデータに変更
  const nextMonth = () => {
    if (month == 12) {
      router.push(`/memo/memoList/${Number(year) + 1}/1`)
    }
    if (month != 12)
      router.push(`/memo/memoList/${year}/${Number(month) + 1}`)
  }

  //スライドショー用(メモリストの最後の要素を最初に移動させる)
  const prevDay = () => {
    let items: any = document.querySelectorAll(".item")
    slideRef.current.prepend(items[items.length - 1])
  }
  //スライドショー用(メモリストの最初の要素を最後に移動させる)
  const nextDay = () => {
    let items: any = document.querySelectorAll(".item")
    slideRef.current.append(items[0])
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

  const onWheel = (e: any) => {
    console.log("wheel event called")
    if (e.deltaY > 0) {
      nextDay()
    } else {
      prevDay()
    }
  }

  useEffect(() => {
    const dateArray = [...Array(end.getDate())].map((_, i) => i + 1)
    dateArray.unshift(dateArray.pop()!)
    dateArray.unshift(dateArray.pop()!)
    setDateArray(dateArray)
  }, [])


  return (
    <>
      <div onWheel={(e) => onWheel(e)} className="absolute w-full h-[calc(100%-8rem)] top-0 left-0 mt-32"></div>
      <div>
        {/* 日付けと変更 */}
        <div className="flex justify-center  text-xl ">
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
        <div className={modal === "OPEN"
          ? "block"
          : "hidden"
        }>
          <YearCalendar />
        </div>
      </div>

      <div className={styles.container} onWheel={(e) => onWheel(e)}>
        <ul className={styles.slide} ref={slideRef}>
          {
            memosData && dateArray?.map((i) => {
              const byDateMemo = memosData.find((memo) => memo.createdAt.getDate() === i)
              return (
                <li onClick={() => router.push(`/memo/${year}/${month}/${i}`)} key={i} className={clsx('item', styles.item)} >
                  <p>
                    {i}
                  </p>
                  <p className={styles.content}>
                    {byDateMemo?.content}
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div >
    </>
  )
}

export default MonthMemoList