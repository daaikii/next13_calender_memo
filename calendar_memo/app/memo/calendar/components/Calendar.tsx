"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import getSettingStartEnd from "@/app/util/getSettingStartEnd"
import YearCalendarModal from "../../../components/modals/YearCalendarModal";
import clsx from "clsx";

type CalendarProps = {
  yearProps?: number,
  monthProps?: number
}

type OptionData = {
  year?: number,
  month?: number,
}

const Calendar = ({ yearProps, monthProps }: CalendarProps) => {
  const [optionData, setOptionData] = useState<OptionData>()
  const [calendarData, setCalendarData] = useState<Date[][]>([])
  const router = useRouter()




  useEffect(() => {
    const { start } = getSettingStartEnd(yearProps, monthProps)
    setOptionData(optionData => ({ ...optionData, year: start.getFullYear() }))
    setOptionData(optionData => ({ ...optionData, month: start.getMonth() + 1 }))
    changeCalendar(start.getFullYear(), start.getMonth() + 1) //カレンダー用のデータを作成
  }, [])

  //カレンダー用データの作成
  const changeCalendar = (y: number, m: number) => {
    const { start } = getSettingStartEnd(y, m)  //指定月の1日を取得
    const startOfThisMonth = start.getDay() //初日の曜日を取得
    let currentMonthCount = -startOfThisMonth;  //初日が月曜ではない場合、前の月の月末を取得する為に使用する
    const weeksNumber = startOfThisMonth >= 5 ? 6 : 5  //カレンダーの１か月の週を判断
    const daysMatrix = new Array(weeksNumber).fill([]).map(() => {  //カレンダーが６週の場合、Array(6)、５週の場合、Array(5)
      return new Array(7).fill(null).map(() => {  //7日分繰り返し
        currentMonthCount++;
        return new Date(y, m - 1, currentMonthCount);
      });
    });
    setCalendarData(daysMatrix)
  }


  const prevMonth = () => {
    if (optionData?.month === 1) {  //1月の場合,年を-1、月を12月に変更
      setOptionData(optionData => ({ ...optionData, year: optionData?.year! - 1 }))
      setOptionData(optionData => ({ ...optionData, month: 12 }))
      changeCalendar(optionData?.year! - 1, 12)
    } else {  //通常の処理、月を-1
      setOptionData(optionData => ({ ...optionData, month: optionData?.month! - 1 }))
      changeCalendar(optionData?.year!, optionData?.month! - 1)
    }
  }

  const nextMonth = () => {
    if (optionData?.month === 12) { //12月の場合の処理,年を+1、月を1月に変更
      setOptionData(optionData => ({ ...optionData, year: optionData?.year! + 1 }))
      setOptionData(optionData => ({ ...optionData, month: 1 }))
      changeCalendar(optionData?.year! + 1, 1)
    } else {  //通常の処理、月を+1
      setOptionData(optionData => ({ ...optionData, month: optionData?.month! + 1 }))
      changeCalendar(optionData?.year!, optionData?.month! + 1)
    }
  }




  return (
    <>
      <div className="border mt-2">
        <div className="flex items-center">
          <BsCaretLeftFill className="ml-auto" onClick={() => prevMonth()} />
          <p>
            <span>{optionData?.year},</span>
            <span>{optionData?.month}</span>
          </p>
          <BsCaretRightFill className="mr-auto" onClick={() => nextMonth()} />
        </div>
        <div className="grid grid-cols-7">
          {
            calendarData.map((week, i) => {
              return week.map((day, index) => {
                return (
                  <p key={index} className={
                    clsx(
                      `text-center border p-9 cursor-pointer hover:shadow-xl`,
                      day.getMonth() + 1 === optionData?.month ? "" : "text-gray-200",
                      day.getMonth() + 1 === optionData?.month && day.getDay() === 0 ? "text-red-400" : "",
                      day.getMonth() + 1 === optionData?.month && day.getDay() === 6 ? "text-blue-400" : "",
                    )
                  }
                    onClick={() => router.push(`/memo/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`)}
                  >
                    {day.getDate()}
                  </p>
                )
              })
            })
          }
        </div>
      </div >
    </>
  )
}
export default Calendar
