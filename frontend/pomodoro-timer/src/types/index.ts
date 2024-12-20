export interface Settings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  longBreakInterval: number
}

export enum TimerMode {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}
