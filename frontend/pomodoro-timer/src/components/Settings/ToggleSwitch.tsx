import { KeyboardEvent, useState } from 'react'
import styles from './ToggleSwitch.module.css'

// Define props interface for the ToggleSwitch component
interface ToggleSwitchProps {
  /**
   * Initial state of the toggle
   * @default true
   */
  initialState?: boolean

  /**
   * Callback function triggered when toggle state changes
   */
  onToggle?: (checked: boolean) => void

  /**
   * Custom label for the toggle switch
   */
  label?: string
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialState = true, onToggle, label }) => {
  // State to manage toggle
  const [isToggled, setIsToggled] = useState<boolean>(initialState)

  // Handle toggle change
  const handleToggle = () => {
    const newToggleState = !isToggled
    setIsToggled(newToggleState)

    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(newToggleState)
    }
  }

  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}

      <label className={styles.switch}>
        <input
          type='checkbox'
          checked={isToggled}
          onChange={handleToggle}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Space') {
              handleToggle()
            }
          }}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}
