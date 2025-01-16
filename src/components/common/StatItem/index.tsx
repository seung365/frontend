interface StatItemProps {
  label?: string
  value?: number
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <span>
      {label} {value}
    </span>
  )
}

export default StatItem
