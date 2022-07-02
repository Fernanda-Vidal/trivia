import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  componentDidMount() {
    const { user, email, score } = this.props;
    const player = { user, email, score };
    localStorage.setItem('player', JSON.stringify([player]));
  }
  // () {
  //   return JSON.parse(localStorage.getItem('ranking'));
  // }

  render() {
    const { history } = this.props;
    return (
      <div>
        {/* <h1 data-testid="ranking-title">Ranking:</h1>
        <ol>
          {
            this.().map((player, index) => index < y && (
              <li key={ index }>
                <img
                  src={ player.picture }
                  alt="gravatar"
                />

                <p data-testid={ `player-name-${index}` }>
                  {player.name}
                </p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>
            ))
          }
        </ol> */}

        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Início
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player.name,
  email: state.player.gravatar,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Ranking);
