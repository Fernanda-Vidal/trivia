import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
      <header id="Header">
        <div id="info-container">
          <span
            data-testid="header-player-name"
            className="header-info"
          >
            { userName }

          </span>
          <img
            data-testid="header-profile-picture"
            src={ this.getImgGravatar() }
            alt="avatar do usuário"
            id="avatar"
          />
          <br />
          <span data-testid="header-score" className="header-info">
            { score }
          </span>
        </div>
      </header>
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
