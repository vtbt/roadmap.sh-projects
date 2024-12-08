import { useState } from 'react';
import './App.css';
import { Header, Pomodoro, Settings } from './components';

function App() {
  const [isDisplayedSettings, setIsDisplayedSettings] = useState(false);
  return (
    <div className="container">
      <Header setIsDisplayedSettings={setIsDisplayedSettings} />
      <Pomodoro />
      {isDisplayedSettings && (
        <Settings setIsDisplayedSettings={setIsDisplayedSettings} />
      )}
    </div>
  );
}

export default App;
