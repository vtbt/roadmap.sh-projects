import { Settings, Settings as SettingsType, TimerMode } from '../types/index'

export const DEFAULT_SETTINGS: SettingsType = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: true,
  longBreakInterval: 4,
}

export const TIMER_MODES = [
  { mode: TimerMode.POMODORO, label: 'Pomodoro' },
  { mode: TimerMode.SHORT_BREAK, label: 'Short break' },
  { mode: TimerMode.LONG_BREAK, label: 'Long break' },
] as const

export const getDurationFromSettings = (mode: TimerMode, settings: Settings) => {
  const DURATION_MAP = {
    [TimerMode.POMODORO]: settings.pomodoroDuration,
    [TimerMode.SHORT_BREAK]: settings.shortBreakDuration,
    [TimerMode.LONG_BREAK]: settings.longBreakDuration,
  } as const

  return DURATION_MAP[mode]
}
