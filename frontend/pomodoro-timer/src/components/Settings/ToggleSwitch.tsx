import React, { useState } from 'react'
import styles from './ToggleSwitch.module.css'

// Define props interface for the ToggleSwitch component
interface ToggleSwitchProps {
  /**
   * Initial state of the toggle
   * @default false
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

  /**
   * Disabled state of the toggle
   * @default false
   */
  disabled?: boolean

  /**
   * Custom color for the toggle switch
   * @default blue
   */
  color?: string
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  onToggle,
  label,
  disabled = false,
}) => {
  // State to manage toggle
  const [isToggled, setIsToggled] = useState<boolean>(initialState)

  // Handle toggle change
  const handleToggle = () => {
    if (disabled) return

    const newToggleState = !isToggled
    setIsToggled(newToggleState)

    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(newToggleState)
    }
  }

  return (
    <div className={`${styles.container}`}>
      {label && <span className={styles.label}>{label}</span>}

      <label className={styles.switch}>
        <input type='checkbox' />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  )
}
