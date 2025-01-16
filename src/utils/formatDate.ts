const formatDateString = (isoString: string) => {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth()는 0부터 시작
  const day = date.getDate()

  return `${year}년 ${month}월 ${day}일`
}

export default formatDateString
