import styles from './TimerModes.module.css'
import { TimerMode, Settings as SettingsType, ButtonText } from '../../types'

import clickSfx from '/sounds/slide.mp3'
import useSound from 'use-sound'
import { useCallback } from 'react'
import { getDurationFromSettings, TIMER_MODES } from '../../constants'

interface TimerModesProps {
  timerMode: TimerMode
  setTimerMode: React.Dispatch<React.SetStateAction<TimerMode>>
  volume: number
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
  setButtonText: React.Dispatch<React.SetStateAction<ButtonText>>
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

  const handleChangeTimerMode = useCallback(
    (newTimerMode: TimerMode) => {
      playSfx()
      setTimerMode(newTimerMode)
      setIsTimerRunning(false)
      setButtonText(ButtonText.START)
      setSecondsLeft(getDurationFromSettings(newTimerMode, settings) * 60)
    },
    [playSfx, setButtonText, setIsTimerRunning, setSecondsLeft, setTimerMode, settings]
  )

  const getButtonClassName = (mode: TimerMode) => `${styles.modeButton} ${timerMode === mode ? styles.active : ''}`

  return (
    <div className={styles.container}>
      {TIMER_MODES.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => handleChangeTimerMode(mode)}
          className={getButtonClassName(mode)}
          aria-pressed={timerMode === mode}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default TimerModes
