import PropTypes from 'prop-types';

export function FlashCard({ question, answer, isHiddenAnswer }) {
  return (
    <div className="flash-card">
      {isHiddenAnswer ? (
        <p className="question">{question}</p>
      ) : (
        <p className="answer">{answer}</p>
      )}
    </div>
  );
}

FlashCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isHiddenAnswer: PropTypes.bool.isRequired,
};
