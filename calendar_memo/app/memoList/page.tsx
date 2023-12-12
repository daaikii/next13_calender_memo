import getMemoData from "../actions/getMemoData"
import useSettingDate from "@/app/hooks/useSettingDate"
import MonthMemoList from "./components/MonthMemoList"

const MemoPage = async () => {
  const { start } = useSettingDate()
  const year = start.getFullYear()
  const month = start.getMonth() + 1
  const memoData = await getMemoData(year, month)
  return <MonthMemoList memoData={memoData} year={year} month={month} />
}

export default MemoPage