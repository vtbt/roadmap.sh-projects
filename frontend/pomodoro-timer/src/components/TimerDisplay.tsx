import { useEffect, useState } from 'react'
import styles from './TimerDisplay.module.css'

interface TimerDisplayProps {
  duration: number // Duration in minutes
  onSessionEnd: () => void
  isTimerRunning: boolean
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ duration, onSessionEnd, isTimerRunning }) => {
  console.log({ duration }, { isTimerRunning })

  const [timeLeft, setTimeLeft] = useState(duration * 60)
  console.log({ timeLeft })

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      onSessionEnd()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, onSessionEnd, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h1 className={styles.timer}>{formatTime(timeLeft)}</h1>
    </div>
  )
}

export default TimerDisplay
