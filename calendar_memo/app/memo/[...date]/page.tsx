import getMemoData from "@/app/actions/getMemoData"
import Memo from "./components/Memo"

type MemoProps = {
  params: {
    date: number[]
  }
}

const MemoPage = async ({ params }: MemoProps) => {
  const [year, month, day] = params.date
  const memoData = await getMemoData(year, month, day)
  return <Memo memoData={memoData!} year={year} month={month} day={day} />
}

export default MemoPage