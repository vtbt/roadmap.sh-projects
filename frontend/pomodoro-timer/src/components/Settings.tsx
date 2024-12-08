import { FC, useEffect, useRef } from 'react';
import styles from './Settings.module.css';
import { CloseIcon } from './CloseIcon';

interface SettingsProps {
  setIsDisplayedSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: FC<SettingsProps> = ({ setIsDisplayedSettings }) => {
  // Create a ref for the settings container
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handler to call on mouse click
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the settings container exists and the click is outside of it
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsDisplayedSettings(false);
      }
    };

    // Handler to call on keydown
    const handleKeydown = (event: KeyboardEvent) => {
      // Check if key is ESC
      if (event.key === 'Escape') {
        setIsDisplayedSettings(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [setIsDisplayedSettings]); // Add dependency to prevent stale closures

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
                type="number"
                min="0"
                step="1"
                className={styles.timeValue}
                value="26"
                onChange={() => {}}
              />
            </div>
            <div className={styles.timeInput}>
              <label className={styles.timeLabel}>Short Break</label>
              <input
                type="number"
                min="0"
                step="1"
                className={styles.timeValue}
                value="5"
                onChange={() => {}}
              />
            </div>
            <div className={styles.timeInput}>
              <label className={styles.timeLabel}>Long Break</label>
              <input
                type="number"
                min="0"
                step="1"
                className={styles.timeValue}
                value="15"
                onChange={() => {}}
              />
            </div>
          </div>

          <div className={styles.longBreakInterval}>
            <label className={styles.timeLabel}>Long Break interval</label>
            <input
              type="number"
              min="0"
              step="1"
              className={styles.timeValue}
              value="26"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
