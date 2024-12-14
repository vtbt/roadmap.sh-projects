import styles from './TimerModes.module.css'
import { TimerMode, Settings as SettingsType } from '../../types'

import clickSfx from '/sounds/slide.mp3'
import useSound from 'use-sound'

interface TimerModesProps {
  timerMode: TimerMode
  setTimerMode: React.Dispatch<React.SetStateAction<TimerMode>>
  volume: number
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
  setButtonText: React.Dispatch<React.SetStateAction<string>>
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>
  settings: SettingsType
}

const TimerModes: React.FC<TimerModesProps> = ({
  timerMode,
  setTimerMode,
  volume,
  setIsTimerRunning,
  setButtonText,
  setSecondsLeft,
  settings,
}) => {
  const [playSfx] = useSound(clickSfx, { volume })

  const handleChangeTimerMode = (timerMode: TimerMode) => {
    playSfx()
    setTimerMode(timerMode)
    setIsTimerRunning(false)
    setButtonText('Start')
    switch (timerMode) {
      case 'Pomodoro':
        setSecondsLeft(settings.pomodoroDuration * 60)
        break
      case 'Short Break':
        setSecondsLeft(settings.shortBreakDuration * 60)
        break
      case 'Long Break':
        setSecondsLeft(settings.longBreakDuration * 60)
        break
    }
  }

  return (
    <div className={styles.buttonGroup}>
      <button
        className={timerMode === 'Pomodoro' ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode('Pomodoro')}
      >
        Pomodoro
      </button>
      <button
        className={timerMode === 'Short Break' ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode('Short Break')}
      >
        Short break
      </button>
      <button
        className={timerMode === 'Long Break' ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode('Long Break')}
      >
        Long break
      </button>
    </div>
  )
}

export default TimerModes
