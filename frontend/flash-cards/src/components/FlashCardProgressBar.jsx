import PropTypes from 'prop-types';

export function FlashCardProgressBar({ currentQuestionIndex, totalQuestions }) {
  return (
    <div className="progress-bar">
      <div
        className="percentage"
        style={{ width: `${(currentQuestionIndex * 100) / totalQuestions}%` }}
      >
        {(currentQuestionIndex * 100) / totalQuestions}%
      </div>

      <span className="quantity">
        {currentQuestionIndex} of {totalQuestions}
      </span>
    </div>
  );
}

FlashCardProgressBar.propTypes = {
  currentQuestionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
