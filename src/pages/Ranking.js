import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  // state = {
  //   ranking: [],
  // }

  // componentDidMount() {
  //   const getRanking = JSON.parse(localStorage.getItem('player'));
  //   console.log(getRanking[0]);
  //   const ranking = getRanking.sort((a, b) => b.score - a.score);
  //   console.log(ranking);
  //   this.setState({ ranking });
  // }

  getImgGravatar = () => {
    const { email } = this.props;
    const gravatar = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${gravatar}`;
    return url;
  }

  render() {
    // const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking:</h1>
        <ol>
          {JSON.parse(localStorage.getItem('player'))
            .sort((a, b) => b.score - a.score)
            .map((player, i) => (
              <li key={ i + 1 }>
                <img
                  src={ this.getImgGravatar(player.email) }
                  alt="gravatar"
                />
                <p data-testid={ `player-name-${player.user}` }>
                  {player.user}
                </p>
                <p data-testid={ `player-score-${player.score}` }>{player.score}</p>
              </li>
            ))}
        </ol>
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
