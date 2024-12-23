import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Header, Settings, TimerControls, TimerDisplay, TimerModes } from './components'
import { useLocalStorage, useNotification } from './hooks'
import { ButtonText, Settings as SettingsType, TimerMode } from './types/index'
import { DEFAULT_SETTINGS } from './constants'
import useSound from 'use-sound'
import timesUpSfx from '/sounds/timesUp.mp3'

function App() {
  const { permission, sendNotification } = useNotification()

  const triggerNotification = useCallback(
    (body: string) => {
      if (permission === 'granted') {
        sendNotification({
          title: 'On Focus Mode',
          body,
          icon: '/logo.png',
        })
      }
    },
    [permission, sendNotification]
  )

  const [settings, setSettings] = useLocalStorage<SettingsType>('pomodoroSettings', DEFAULT_SETTINGS)

  const [isDisplayedSettings, setIsDisplayedSettings] = useState(false)

  const [timerMode, setTimerMode] = useState<TimerMode>(TimerMode.POMODORO)

  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const [volume, setVolume] = useState(1)

  const [secondsLeft, setSecondsLeft] = useState(settings.pomodoroDuration * 60)

  const [buttonText, setButtonText] = useState<ButtonText>(ButtonText.START)

  const [pomodoroCounter, setPomodoroCounter] = useState(0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const [timesUp] = useSound(timesUpSfx, {
    volume,
  })

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1)
      }, 1000)

      if (secondsLeft === 0) {
        clearInterval(interval)
        setIsTimerRunning(false)

        timesUp()

        switch (timerMode) {
          case TimerMode.POMODORO: {
            const newCompletedPomodoros = pomodoroCounter + 1
            setPomodoroCounter(newCompletedPomodoros)
            if (settings.autoStartBreaks) {
              setButtonText(ButtonText.PAUSE)

              if (newCompletedPomodoros && newCompletedPomodoros % settings.longBreakInterval === 0) {
                setTimerMode(TimerMode.LONG_BREAK)
                setSecondsLeft(settings.longBreakDuration * 60)
              } else {
                setTimerMode(TimerMode.SHORT_BREAK)
                setSecondsLeft(settings.shortBreakDuration * 60)
              }
              setIsTimerRunning(true)
            } else {
              setSecondsLeft(settings.pomodoroDuration * 60)
              setButtonText(ButtonText.START)
            }
            triggerNotification('Finish pomodoro session!!!')
            break
          }
          case TimerMode.SHORT_BREAK:
            if (settings.autoStartBreaks) {
              setButtonText(ButtonText.PAUSE)

              setTimerMode(TimerMode.POMODORO)
              setSecondsLeft(settings.pomodoroDuration * 60)
              setIsTimerRunning(true)
            } else {
              setSecondsLeft(settings.shortBreakDuration * 60)
              setButtonText(ButtonText.START)
            }
            triggerNotification('Finish short break!!!')
            break
          case TimerMode.LONG_BREAK:
            if (settings.autoStartBreaks) {
              setButtonText(ButtonText.PAUSE)

              setTimerMode(TimerMode.POMODORO)
              setSecondsLeft(settings.pomodoroDuration * 60)
              setIsTimerRunning(true)
            } else {
              setSecondsLeft(settings.longBreakDuration * 60)
              setButtonText(ButtonText.START)
            }
            triggerNotification('Finish long break!!!')
            break
        }
      }

      return () => clearInterval(interval)
    }
  }, [
    isTimerRunning,
    secondsLeft,
    settings.longBreakDuration,
    settings.shortBreakDuration,
    settings.pomodoroDuration,
    timerMode,
    timesUp,
    permission,
    triggerNotification,
    settings.autoStartBreaks,
    settings.longBreakInterval,
    pomodoroCounter,
  ])

  useEffect(() => {
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
  }, [settings.longBreakDuration, settings.pomodoroDuration, settings.shortBreakDuration, timerMode])

  return (
    <div className='container'>
      <Header setIsDisplayedSettings={setIsDisplayedSettings} volume={volume} setVolume={setVolume} />
      <div className='content'>
        <div className='pomodoro'>
          <TimerModes
            timerMode={timerMode}
            setTimerMode={setTimerMode}
            volume={volume}
            setIsTimerRunning={setIsTimerRunning}
            setButtonText={setButtonText}
            setSecondsLeft={setSecondsLeft}
            settings={settings}
          />
          <TimerDisplay timeLeft={formatTime(secondsLeft)} />
          <TimerControls
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            volume={volume}
            secondsLeft={secondsLeft}
            buttonText={buttonText}
            setButtonText={setButtonText}
          />
        </div>
      </div>

      {isDisplayedSettings && (
        <Settings settings={settings} setSettings={setSettings} setIsDisplayedSettings={setIsDisplayedSettings} />
      )}
    </div>
  )
}

export default App
