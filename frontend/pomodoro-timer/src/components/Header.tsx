import { FC } from 'react'
import styles from './Header.module.css'

interface HeaderProps {
  setIsDisplayedSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({ setIsDisplayedSettings }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src='/eye.png' alt='' />
        <span>OnFocusMode</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.settingsBtn} type='button' onClick={() => setIsDisplayedSettings(true)}>
          <img src='/settings.png' alt='' />
          Settings
        </button>
      </div>
    </div>
  )
}

export default Header
