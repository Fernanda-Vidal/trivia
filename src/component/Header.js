import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../css/Header.css';

class Header extends React.Component {
  getImgGravatar = () => {
    const { userEmail } = this.props;
    const email = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${email}`;
    return url;
  }

  render() {
    const { userName, score } = this.props;
    return (

      <header className="header-container">
        <div className="info-container">
          <div className="info-container-tex">
            <span
              data-testid="header-player-name"
              className="header-info"
            >
              { userName }

            </span>
          </div>
          <img
            data-testid="header-profile-picture"
            src={ this.getImgGravatar() }
            alt="avatar do usuário"
            className="avatar"
          />
          <br />
          <div className="info-container-text">
            <span className="header-info">Pontuação: </span>
            <span data-testid="header-score" className="header-info">
              { score }
            </span>
          </div>
        </div>
      </header>

      <div>
        <span data-testid="header-player-name">{ userName }</span>
        <img
          data-testid="header-profile-picture"
          src={ this.getImgGravatar() }
          alt="avatar do usuário"
        />
        <br />
        <span>Placar: </span>
        <span data-testid="header-score">
          { score }
        </span>
      </div>

    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.loginReducer.userEmail,
  userName: state.loginReducer.userName,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
