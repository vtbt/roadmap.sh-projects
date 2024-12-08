import { FC, useEffect, useState } from 'react';
import styles from './Pomodoro.module.css';

const Pomodoro: FC = () => {
  const [timerValue, setTimerValue] = useState(25);
  const [timeLeft, setTimeLeft] = useState(timerValue * 60);
  const [isRunning, setIsRunning] = useState(false);

  //   get values from settings

  useEffect(() => {
    setTimeLeft(timerValue * 60);
  }, [timerValue]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    // Determine next mode
    // switch (mode) {
    //   case 'work':
    //     setCompletedCycles(prev => prev + 1);
    //     if (completedCycles + 1 === settings.cyclesBeforeLongBreak) {
    //       setMode('longBreak');
    //       setTimeLeft(settings.longBreakDuration * 60);
    //     } else {
    //       setMode('break');
    //       setTimeLeft(settings.shortBreakDuration * 60);
    //     }
    //     break;
    //   case 'break':
    //     setMode('work');
    //     setTimeLeft(settings.workDuration * 60);
    //     break;
    //   case 'longBreak':
    //     setMode('work');
    //     setTimeLeft(settings.workDuration * 60);
    //     setCompletedCycles(0);
    //     break;
    // }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className={styles.pomodoro}>
      <div className={styles.wrapper}>
        <div className={styles.buttonGroup}>
          <button onClick={() => setTimerValue(25)}>Pomodoro</button>
          <button onClick={() => setTimerValue(5)}>Short break</button>
          <button onClick={() => setTimerValue(15)}>Long break</button>
        </div>
        <p className={styles.timer}> {formatTime(timeLeft)}</p>
        {isRunning ? (
          <button onClick={() => setIsRunning(false)}>Stop</button>
        ) : (
          <button onClick={() => setIsRunning(true)}>Start</button>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
