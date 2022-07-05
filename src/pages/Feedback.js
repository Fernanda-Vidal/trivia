import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { clearScore } from '../redux/actions';
import '../css/Feedback.css';

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

  handleClick = ({ target }) => {
    console.log(target.textContent);
    const { history, clearScorePlayer } = this.props;
    if (target.textContent === 'Play Again') {
      history.push('/');
      clearScorePlayer();
    } else if (target.textContent === 'Ranking') {
      history.push('/ranking');
      clearScorePlayer();
    }
  }

  render() {
    const { assertions, score } = this.props;
    const n = 3;
    return (
      <div className="feedback-container">
        <h1 className="feedback-tittle">FeedBack</h1>
        <Header />
        <section className="text-feedback-container">
          <span>Pontuação: </span>
          <span data-testid="feedback-total-question">{ assertions }</span>
          <br />
          <span>Placar total:</span>
          <span data-testid="feedback-total-score">
            { score }
          </span>

          <p className="feedback-text">
            {assertions >= n
              ? <p data-testid="feedback-text" className="well-done">Well Done!</p>
              : <p data-testid="feedback-text" className="better">Could be better...</p>}
          </p>
        </section>
        <section className="buttons-feedback-cotainer">

          <button
            type="button"
            className="buttons-feedback"
            onClick={ this.handleClick }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
          <button
            className="buttons-feedback"
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </section>
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

const mapDispatchToProps = (dispatch) => ({
  clearScorePlayer: () => dispatch(clearScore()),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  clearScorePlayer: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
