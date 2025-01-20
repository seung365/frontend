import ReactCalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import '../../../styles/profileHeatMap.css'

interface ProfileHeatMapProps {
  boardStatistics: { date: string; board_count: number }[]
}

const ProfileHeatMap = ({ boardStatistics }: ProfileHeatMapProps) => {
  // 오늘 날짜 가져오기
  const today = new Date()

  // 이번 달의 첫 번째 날짜 계산
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  // 이번 달의 마지막 날짜 계산
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  // Heatmap에 사용할 스타일 옵션
  const getClassForValue = (value) => {
    if (!value || value.board_count === 0) return 'color-empty'
    if (value.board_count <= 2) return 'color-scale-1'
    if (value.board_count <= 5) return 'color-scale-2'
    if (value.board_count <= 8) return 'color-scale-3'
    return 'color-scale-4'
  }

  return (
    <ReactCalendarHeatmap
      startDate={firstDayOfMonth}
      endDate={lastDayOfMonth}
      values={boardStatistics}
      classForValue={getClassForValue}
      // tooltipDataAttrs={(value) => ({
      //   'data-tip': value.date
      //     ? `${value.date}: ${value.board_count} posts`
      //     : 'No data',
      // })}
    />
  )
}

export default ProfileHeatMap
