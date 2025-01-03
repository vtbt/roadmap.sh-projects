import useSound from 'use-sound'
import startSfx from '/sounds/startTimer.mp3'
import pauseSfx from '/sounds/pauseTimer.mp3'
import { ButtonText } from '../../types'

interface TimerControlsProps {
  isTimerRunning: boolean
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
  secondsLeft: number
  volume: number
  buttonText: ButtonText
  setButtonText: React.Dispatch<React.SetStateAction<ButtonText>>
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isTimerRunning,
  setIsTimerRunning,
  secondsLeft,
  volume,
  buttonText,
  setButtonText,
}) => {
  const [play] = useSound(startSfx, {
    interrupt: true,
    volume,
  })

  const [pause] = useSound(pauseSfx, {
    interrupt: true,
    volume,
  })
  const handleClick = () => {
    if (secondsLeft === 0) {
      return
    }

    if (isTimerRunning) {
      pause()
    } else {
      play()
    }
    setIsTimerRunning(!isTimerRunning)
    setButtonText([ButtonText.START, ButtonText.PAUSE].includes(buttonText) ? ButtonText.PAUSE : ButtonText.RESUME)
  }

  return <button onClick={handleClick}>{buttonText}</button>
}

export default TimerControls
