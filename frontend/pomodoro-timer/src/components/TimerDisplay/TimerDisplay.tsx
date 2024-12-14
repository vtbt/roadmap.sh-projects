import styles from './TimerDisplay.module.css'

interface TimerDisplayProps {
  timeLeft: string
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  return (
    <div>
      <h1 className={styles.timer}>{timeLeft}</h1>
    </div>
  )
}

export default TimerDisplay
