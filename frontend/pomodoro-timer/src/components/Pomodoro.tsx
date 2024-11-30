import styles from './Pomodoro.module.css';

const Pomodoro = () => {
  return (
    <div className={styles.pomodoro}>
      <div className={styles.wrapper}>
        <div className={styles.buttonGroup}>
          <button>Pomodoro</button>
          <button>Short break</button>
          <button>Long break</button>
        </div>
        <p className={styles.timer}>25:00</p>
        <button>Start</button>
      </div>
    </div>
  );
};

export default Pomodoro;
