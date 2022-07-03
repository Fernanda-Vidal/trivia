import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { user, email, score } = this.props;
    const player = { user, email, score };
    const playerList = localStorage.getItem('player');
    if (localStorage.player !== undefined) {
      localStorage.setItem('player', JSON.stringify([...JSON.parse(playerList), player]));
    } else {
      localStorage.setItem('player', JSON.stringify([player]));
    }
  }

  render() {
    const { assertions, history, score } = this.props;
    const n = 3;
    return (
      <div>
        <h1>FeedBack</h1>
        <Header />
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">
          { score }
        </p>

        <p>
          {assertions >= n
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>}
        </p>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player.name,
  email: state.player.gravatar,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
