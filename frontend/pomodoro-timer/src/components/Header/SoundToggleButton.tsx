import styles from './Header.module.css'
import useSound from 'use-sound'

import disableSound from '/sounds/disable-sound.mp3'
import enableSound from '/sounds/enable-sound.mp3'

interface SoundToggleButtonProps {
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
}
const SoundToggleButton: React.FC<SoundToggleButtonProps> = ({ volume, setVolume }) => {
  const toggleSound = () => {
    if (volume) {
      disable()
      setVolume(0)
    } else {
      enable()
      setVolume(1)
    }
  }

  const [enable] = useSound(enableSound, {
    interrupt: true,
    volume: 0.1,
  })

  const [disable] = useSound(disableSound, {
    interrupt: true,
    volume: 0.1,
  })

  return (
    <button
      className={styles.soundToggleBtn}
      onClick={toggleSound}
      aria-label={volume ? 'Disable sounds' : 'Enable sounds'}
    >
      <svg
        width='1.25rem'
        height='1.25rem'
        viewBox='0 0 24 24'
        fill='none'
        className='transition-all duration-300 group-hover:scale-110'
      >
        {/* Volume Base Icon */}
        <path
          d='M12.0133 4.60757C11.9149 4.2957 11.5463 4.19331 11.2861 4.39151L5.93425 8.46914C5.84716 8.5355 5.74071 8.57143 5.63123 8.57143H1.5C1.22386 8.57143 1 8.79529 1 9.07143V14.9286C1 15.2047 1.22386 15.4286 1.5 15.4286H5.63123C5.74071 15.4286 5.84716 15.4645 5.93425 15.5309L11.2861 19.6085C11.5463 19.8067 11.9149 19.7043 12.0133 19.3924C12.3582 18.2999 13 15.7612 13 12C13 8.2388 12.3582 5.70014 12.0133 4.60757Z'
          stroke={volume ? 'currentColor' : 'currentColor'}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`transition-all duration-300 ${volume ? 'text-blue-500 opacity-100' : 'text-gray-500 opacity-70'}`}
        />

        {/* First Sound Wave */}
        {volume && (
          <path
            d='M 17.54 8.46002 C 18.4774 9.39766 19.004 10.6692 19.004 11.995 C 19.004 13.3208 18.4774 14.5924 17.54 15.53'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-blue-500 opacity-70 animate-pulse'
          />
        )}

        {/* Second Sound Wave */}
        {volume && (
          <path
            d='M 20.0703 4.92999 C 21.945 6.80527 22.9982 9.34835 22.9982 12 C 22.9982 14.6516 21.945 17.1947 20.0703 19.07'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-blue-500 opacity-50 animate-pulse delay-150'
          />
        )}
      </svg>
    </button>
  )
}

export default SoundToggleButton
