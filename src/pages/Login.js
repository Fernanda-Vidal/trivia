import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as listActions from '../redux/actions';
import { getToken } from '../redux/actions';

class Login extends React.Component {
    state = {
      userName: '',
      userEmail: '',
      isDisable: true,
    }

    handleChangeLogin = ({ target: { name, value } }) => {
      this.setState({ [name]: value });

      this.setState(() => ({
        isDisable: true,
      }), this.validateButton);
    }

    validateButton = () => {
      const { userEmail, userName } = this.state;
      if (userEmail && userName) {
        this.setState({
          isDisable: false,
        });
      }
    }

    buttonHandleClick = () => {
      const { userName, userEmail } = this.state;
      const { addUserName, addUserEmail, getTokenProps, history } = this.props;

      addUserName(userName);
      addUserEmail(userEmail);
      getTokenProps();
      history.push('/trivia');
    }

    render() {
      const { userName, userEmail, isDisable } = this.state;
      return (
        <div>
          <h1 data-testid="settings-title">Trivia</h1>
          <form>
            <label htmlFor="userName">
              Digite seu Nome:
              <input
                type="text"
                name="userName"
                value={ userName }
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                onChange={ this.handleChangeLogin }
              />
            </label>

            <label htmlFor="userEmail">
              Digite seu Email:
              <input
                type="email"
                name="userEmail"
                value={ userEmail }
                data-testid="input-gravatar-email"
                placeholder="Digite seu Email"
                onChange={ this.handleChangeLogin }
              />
            </label>

            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisable }
              onClick={ this.buttonHandleClick }
            >
              Play
            </button>
            <button data-testid="btn-settings" type="button">Configurações</button>

          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  addUserName: (user) => dispatch(listActions.addUserName(user)),
  addUserEmail: (email) => dispatch(listActions.addUserEmail(email)),
  getTokenProps: () => dispatch(getToken()),
});

Login.propTypes = {
  addUserName: PropTypes.func.isRequired,
  addUserEmail: PropTypes.func.isRequired,
  getTokenProps: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
