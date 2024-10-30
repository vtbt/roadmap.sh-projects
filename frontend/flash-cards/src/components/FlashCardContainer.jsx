import { useState } from 'react';
import jsData from '../data/javascript.json';
import { FlashCard } from './FlashCard';
export function FlashCardContainer() {
  console.log({ jsData });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isHiddenAnswer, setIsHiddenAnswer] = useState(true);

  return (
    <div className="flash-cards-container">
      <h1>Flash Cards</h1>

      <div className="progress-bar">
        <div
          className="percentage"
          style={{ width: `${(currentQuestionIndex * 100) / jsData.length}%` }}
        >
          {(currentQuestionIndex * 100) / jsData.length}%
        </div>

        <span className="quantity">
          {currentQuestionIndex} of {jsData.length}
        </span>
      </div>

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

        <div className="function-bar">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => {
              setCurrentQuestionIndex(currentQuestionIndex - 1);
            }}
          >
            Previous
          </button>

          {currentQuestionIndex === jsData.length ? (
            <button
              disabled={currentQuestionIndex === jsData.length}
              onClick={() => {
                setCurrentQuestionIndex(jsData.length);
              }}
            >
              Finish
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsHiddenAnswer(!isHiddenAnswer);
                }}
              >
                {isHiddenAnswer ? 'Show Answer' : 'Hide Answer'}
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
