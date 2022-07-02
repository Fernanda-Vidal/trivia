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
      <div>
        <span data-testid="header-player-name">{ userName }</span>
        <img
          data-testid="header-profile-picture"
          src={ this.getImgGravatar() }
          alt="avatar do usuário"
        />
        <br />
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
