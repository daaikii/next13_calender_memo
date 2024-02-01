const getSettingStartEnd = (year?: number, month?: number) => {
  const newDate = { start: new Date(), end: new Date() }
  if (year && month) {        //指定月
    const start = new Date(year, month - 1, 1)      //指定月の初日を取得
    const end = new Date(year, month, 0)            //指定月の月末を取得
    newDate.start = start
    newDate.end = end
    return { start, end }
  }
  const date = new Date()      //実行時
  const start = new Date(date.getFullYear(), date.getMonth(), 1)      //月の初日を取得
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)    //月末を取得
  newDate.start = start
  newDate.end = end
  return { start, end }
}

export default getSettingStartEnd