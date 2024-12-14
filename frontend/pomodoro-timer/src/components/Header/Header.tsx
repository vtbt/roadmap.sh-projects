import { FC } from 'react'
import styles from './Header.module.css'
import SoundToggleButton from './SoundToggleButton'

interface HeaderProps {
  setIsDisplayedSettings: React.Dispatch<React.SetStateAction<boolean>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
}

const Header: FC<HeaderProps> = ({ setIsDisplayedSettings, volume, setVolume }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src='/eye.png' alt='Eyes with love' />
        <span>OnFocusMode</span>
      </div>
      <div className={styles.actions}>
        <SoundToggleButton volume={volume} setVolume={setVolume} />
        <button className={styles.settingsBtn} onClick={() => setIsDisplayedSettings(true)}>
          <img src='/settings.png' alt='Settings icon' />
          Settings
        </button>
      </div>
    </div>
  )
}

export default Header
