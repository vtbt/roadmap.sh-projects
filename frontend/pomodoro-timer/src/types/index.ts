export interface Settings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  longBreakInterval: number
}

export type TimerMode = 'Pomodoro' | 'Short Break' | 'Long Break'
