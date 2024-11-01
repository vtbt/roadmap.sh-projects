import PropTypes from 'prop-types';

export function FlashCard({ question, answer, isHiddenAnswer }) {
  return (
    <div className={`flash-card ${isHiddenAnswer ? '' : 'flipped'}`}>
      <div className="flash-card-inner">
        <div className="card-front">
          <p className="question">{question}</p>
        </div>
        <div className="card-back">
          <p className="answer">{answer}</p>
        </div>
      </div>
    </div>
  );
}

FlashCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isHiddenAnswer: PropTypes.bool.isRequired,
};
