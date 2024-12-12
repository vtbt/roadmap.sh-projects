import { FC, useEffect, useRef, useState } from 'react'
import styles from './Settings.module.css'
import { CloseIcon } from './CloseIcon'
import { useLocalStorage } from '../hooks'
import { Settings as SettingsType } from '../types/index'
import { DEFAULT_SETTINGS } from '../constants'

interface SettingsProps {
  settings: SettingsType
  setSettings(value: SettingsType): void
  setIsDisplayedSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings: FC<SettingsProps> = ({ settings, setSettings, setIsDisplayedSettings }) => {
  // Create a ref for the settings container
  const settingsRef = useRef<HTMLDivElement>(null)

  //   const [settings, setSettings] = useLocalStorage<SettingsType>(
  //     'pomodoroSettings',
  //     DEFAULT_SETTINGS
  //   );

  const [localSettings, setLocalSettings] = useState(settings)

  useEffect(() => {
    // Handler to call on mouse click
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the settings container exists and the click is outside of it
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsDisplayedSettings(false)
      }
    }

    // Handler to call on keydown
    const handleKeydown = (event: KeyboardEvent) => {
      // Check if key is ESC
      if (event.key === 'Escape') {
        setIsDisplayedSettings(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [setIsDisplayedSettings]) // Add dependency to prevent stale closures

  const handleSave = () => {
    setSettings(localSettings)
    alert('Settings saved!')
    setIsDisplayedSettings(false)
  }

  return (
    <div className={styles.settings}>
      <div ref={settingsRef} className={styles.wrapper}>
        <div className={styles.header}>
          Settings
          <button onClick={() => setIsDisplayedSettings(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.timeUnit}>Time (minutes)</div>
          <div className={styles.timeConfig}>
            <div className={styles.timeInput}>
              <label className={styles.timeLabel}>Pomodoro</label>
              <input
                type='number'
                min='0'
                step='1'
                className={styles.timeValue}
                value={localSettings.workDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    workDuration: +e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.timeInput}>
              <label className={styles.timeLabel}>Short Break</label>
              <input
                type='number'
                min='0'
                step='1'
                className={styles.timeValue}
                value={localSettings.shortBreakDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    shortBreakDuration: +e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.timeInput}>
              <label className={styles.timeLabel}>Long Break</label>
              <input
                type='number'
                min='0'
                step='1'
                className={styles.timeValue}
                value={localSettings.longBreakDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreakDuration: +e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.longBreakInterval}>
            <label className={styles.timeLabel}>Long Break interval</label>
            <input type='number' min='0' step='1' className={styles.timeValue} value='26' onChange={() => {}} />
          </div>
        </div>
        <div>
          <button disabled={localSettings.workDuration === 0} onClick={handleSave}>
            Save settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
