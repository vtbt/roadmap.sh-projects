import { useState } from 'react';
import jsData from '../data/javascript.json';
import { FlashCard } from './FlashCard';
import { FlashCardControls } from './FlashCardControls';
import { FlashCardProgressBar } from './FlashCardProgressBar';

export function FlashCardContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isHiddenAnswer, setIsHiddenAnswer] = useState(true);

  return (
    <div className="flash-cards-container">
      <h1>Flash Cards</h1>
      <FlashCardProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={jsData.length}
      />
      <div className="flash-card-content">
        {currentQuestionIndex === jsData.length ? (
          <div className="flash-card finished">Well done!!!</div>
        ) : (
          <FlashCard
            key={jsData[currentQuestionIndex].id}
            answer={jsData[currentQuestionIndex].answer}
            question={jsData[currentQuestionIndex].question}
            isHiddenAnswer={isHiddenAnswer}
          />
        )}
        <FlashCardControls
          isHiddenAnswer={isHiddenAnswer}
          setIsHiddenAnswer={setIsHiddenAnswer}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          totalQuestions={jsData.length}
        />
      </div>
    </div>
  );
}
