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
      case TimerMode.POMODORO:
        setSecondsLeft(settings.pomodoroDuration * 60)
        break
      case TimerMode.SHORT_BREAK:
        setSecondsLeft(settings.shortBreakDuration * 60)
        break
      case TimerMode.LONG_BREAK:
        setSecondsLeft(settings.longBreakDuration * 60)
        break
    }
  }

  return (
    <div className={styles.buttonGroup}>
      <button
        className={timerMode === TimerMode.POMODORO ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode(TimerMode.POMODORO)}
      >
        Pomodoro
      </button>
      <button
        className={timerMode === TimerMode.SHORT_BREAK ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode(TimerMode.SHORT_BREAK)}
      >
        Short break
      </button>
      <button
        className={timerMode === TimerMode.LONG_BREAK ? styles.activeButton : ''}
        onClick={() => handleChangeTimerMode(TimerMode.LONG_BREAK)}
      >
        Long break
      </button>
    </div>
  )
}

export default TimerModes
