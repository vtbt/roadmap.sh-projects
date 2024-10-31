import PropTypes from 'prop-types';

export function FlashCardControls({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  isHiddenAnswer,
  setIsHiddenAnswer,
  totalQuestions,
}) {
  return (
    <div className="flash-card-controls">
      <button
        disabled={currentQuestionIndex === 0}
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
          setIsHiddenAnswer(true);
        }}
      >
        Previous
      </button>

      {currentQuestionIndex === totalQuestions ? (
        <button
          disabled={currentQuestionIndex === totalQuestions}
          onClick={() => {
            setCurrentQuestionIndex(totalQuestions);
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
              setIsHiddenAnswer(true);
            }}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

FlashCardControls.propTypes = {
  currentQuestionIndex: PropTypes.number.isRequired,
  setCurrentQuestionIndex: PropTypes.func.isRequired,
  isHiddenAnswer: PropTypes.bool.isRequired,
  setIsHiddenAnswer: PropTypes.func.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
