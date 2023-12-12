import getMemoData from "@/app/actions/getMemoData"
import MonthMemoList from "../components/MonthMemoList"

const MemoPage = async ({ params }: { params: { date: number[] } }) => {
  //指定月のメモ情報を取得
  const year = params.date[0]
  const month = params.date[1]
  const memoData = await getMemoData(year, month)
  return <MonthMemoList memoData={memoData} year={year} month={month} />
}

export default MemoPage