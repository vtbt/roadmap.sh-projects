import { useState } from 'react'
import './App.css'
import { Header, Pomodoro, Settings } from './components'
import { useLocalStorage } from './hooks'
import { Settings as SettingsType } from './types/index'
import { DEFAULT_SETTINGS } from './constants'

function App() {
  const [isDisplayedSettings, setIsDisplayedSettings] = useState(false)

  const [settings, setSettings] = useLocalStorage<SettingsType>('pomodoroSettings', DEFAULT_SETTINGS)

  return (
    <div className='container'>
      <Header setIsDisplayedSettings={setIsDisplayedSettings} />
      <Pomodoro settings={settings} />
      {isDisplayedSettings && (
        <Settings settings={settings} setSettings={setSettings} setIsDisplayedSettings={setIsDisplayedSettings} />
      )}
    </div>
  )
}

export default App
