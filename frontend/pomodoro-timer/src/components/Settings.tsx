import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Settings
          <img src="/close.png"></img>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
