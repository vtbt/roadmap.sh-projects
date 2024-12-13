import { FC, useState } from 'react'
import styles from './Pomodoro.module.css'
import TimerDisplay from './TimerDisplay'
import { SessionType, Settings as SettingsType } from '../types/index'

interface PomodoroProps {
  settings: SettingsType
}

const Pomodoro: FC<PomodoroProps> = ({ settings }) => {
  const [audio] = useState(() => new Audio('/sounds/timesUp.mp3'))

  const [sessionType, setSessionType] = useState<SessionType>('Work')

  const [completedSessions, setCompletedSessions] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const handleSessionEnd = () => {
    if (sessionType === 'Work') {
      setCompletedSessions((prev) => prev + 1)
      setSessionType(completedSessions % 4 === 3 ? 'Long Break' : 'Short Break')
    } else {
      setSessionType('Work')
    }
    audio.play().catch((error) => {
      console.error('Error playing the audio:', error)
    })
    setIsTimerRunning(false)
  }

  const changeTimerMode = (timerMode: SessionType) => {
    setSessionType(timerMode)
    setIsTimerRunning(false)
  }
  return (
    <div className={styles.pomodoro}>
      <div className={styles.wrapper}>
        <div className={styles.buttonGroup}>
          <button className={sessionType === 'Work' ? styles.activeButton : ''} onClick={() => changeTimerMode('Work')}>
            Pomodoro
          </button>
          <button
            className={sessionType === 'Short Break' ? styles.activeButton : ''}
            onClick={() => changeTimerMode('Short Break')}
          >
            Short break
          </button>
          <button
            className={sessionType === 'Long Break' ? styles.activeButton : ''}
            onClick={() => changeTimerMode('Long Break')}
          >
            Long break
          </button>
        </div>
        <TimerDisplay
          duration={
            sessionType === 'Work'
              ? settings.workDuration
              : sessionType === 'Short Break'
                ? settings.shortBreakDuration
                : settings.longBreakDuration
          }
          onSessionEnd={handleSessionEnd}
          isTimerRunning={isTimerRunning}
        />
        {isTimerRunning ? (
          <button onClick={() => setIsTimerRunning(false)}>Stop</button>
        ) : (
          <button onClick={() => setIsTimerRunning(true)}>Start</button>
        )}
      </div>
    </div>
  )
}

export default Pomodoro
