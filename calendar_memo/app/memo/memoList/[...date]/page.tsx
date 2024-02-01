import getMemosData from "@/app/actions/getMemosData"
import MonthMemoList from "./components/MonthMemoList"

const MemoPage = async ({ params }: { params: { date: number[] } }) => {
  const [year, month] = params.date
  const memosData = await getMemosData(year, month)
  return <MonthMemoList memosData={memosData} year={year} month={month} />
}

export default MemoPage