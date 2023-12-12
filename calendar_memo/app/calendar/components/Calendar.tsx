"use client"
import { useState, useEffect } from "react"
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import useSettingDate from "@/app/hooks/useSettingDate"

type CalendarProps = {
  yearProps?: number,
  monthProps?: number
}

const Calendar = ({ yearProps, monthProps }: CalendarProps) => {
  const [year, setYear] = useState<number>(0)
  const [month, setMonth] = useState<number>(0)

  const [calendarData, setCalendarData] = useState<Date[][]>([])

  useEffect(() => {
    const { start } = useSettingDate(yearProps, monthProps)
    setYear(start.getFullYear())
    setMonth(start.getMonth() + 1)
    changeCalendar(start.getFullYear(), start.getMonth() + 1) //カレンダー用のデータを作成
  }, [])

  //カレンダー用データの作成
  const changeCalendar = (y: number, m: number) => {
    const { start } = useSettingDate(y, m)  //指定月の1日を取得
    const startOfThisMonth = start.getDay() //月の初日の曜日を取得
    let currentMonthCount = -startOfThisMonth;  //初日が月曜ではない場合、前の月の月末を取得する為に使用する
    const daysMatrix = new Array(startOfThisMonth >= 5 ? 6 : 5).fill([]).map(() => {  //カレンダー６行はArray(6)、５行はArray(5)
      return new Array(7).fill(null).map(() => {  //7日分繰り返し
        currentMonthCount++;
        return new Date(y, m - 1, currentMonthCount);
      });
    });
    setCalendarData(daysMatrix)
  }

  const prevMonth = () => {
    if (month === 1) {  //1月の場合,年を-1、月を12月に変更
      setYear(year - 1)
      setMonth(12)
      changeCalendar(year - 1, 12)
    } else {  //通常の処理、月を-1
      setMonth(month - 1)
      changeCalendar(year, month - 1)
    }
  }
  const nextMonth = () => {
    if (month === 12) { //12月の場合の処理,年を+1、月を1月に変更
      setYear(year + 1)
      setMonth(1)
      changeCalendar(year + 1, 1)
    } else {  //通常の処理、月を+1
      setMonth(month + 1)
      changeCalendar(year, month + 1)
    }
  }




  return (
    <table>
      <thead>
        <tr>
          <th>
            <BsCaretLeftFill onClick={() => prevMonth()} />
            <p>{year}</p>
            <p>{month}</p>
            <BsCaretRightFill onClick={() => nextMonth()} />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            calendarData.map((week) => {
              return week.map((day, index) => {
                return <td key={index}>{day.getDate()}</td>
              })
            })
          }
        </tr>
      </tbody>
    </table>
  )
}
export default Calendar
