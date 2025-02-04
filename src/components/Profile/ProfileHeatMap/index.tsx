import ReactCalendarHeatmap, { TooltipDataAttrs } from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import '../../../styles/profileHeatMap.css'

type HeatMapValue = {
  date: string
  boardCount: number
}

type CustomTooltipDataAttrs = TooltipDataAttrs & {
  'data-tooltip-content': string
  'data-tooltip-id': string
}

interface ProfileHeatMapProps {
  boardStatistics: HeatMapValue[]
}

const ProfileHeatMap = ({ boardStatistics }: ProfileHeatMapProps) => {
  const today = new Date()

  const firstDayOfYear = new Date(today.getFullYear(), 0, 1)

  const lastDayOfYear = new Date(today.getFullYear(), 11, 31)

  const getClassForValue = (
    value: ReactCalendarHeatmap.ReactCalendarHeatmapValue<string> | undefined,
  ) => {
    if (!value || value.board_count === 0) return 'color-empty'
    if (value.board_count <= 2) return 'color-scale-1'
    if (value.board_count <= 5) return 'color-scale-2'
    if (value.board_count <= 8) return 'color-scale-3'
    return 'color-scale-4'
  }

  return (
    <>
      <ReactCalendarHeatmap
        startDate={firstDayOfYear}
        endDate={lastDayOfYear}
        values={boardStatistics || []}
        classForValue={getClassForValue}
        tooltipDataAttrs={(
          value:
            | ReactCalendarHeatmap.ReactCalendarHeatmapValue<string>
            | undefined,
        ): CustomTooltipDataAttrs => {
          const tooltip = value?.date
            ? `${value.date}: ${value.boardCount} posts`
            : '작성한 포스트가 없습니다.'

          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': tooltip,
          }
        }}
      />
      <Tooltip id='heatmap-tooltip' />
    </>
  )
}

export default ProfileHeatMap
