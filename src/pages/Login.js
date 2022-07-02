import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as listActions from '../redux/actions';
import { getToken } from '../redux/actions';
import '../css/Login.css';

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

    buttonHandleClick = async () => {
      const { userName, userEmail } = this.state;
      const { addUserName, addUserEmail, getTokenProps, history } = this.props;

      addUserName(userName);
      addUserEmail(userEmail);
      await getTokenProps();
      history.push('/game');
    }

    render() {
      const { userName, userEmail, isDisable } = this.state;
      return (
        <div id="login-container">
          <div id="tittle-container">
            <h1 data-testid="settings-title" id="tittle">Trivia</h1>
          </div>
          <form id="form-login">
            <label htmlFor="userName" className="label-login">
              Nome:
              <input
                type="text"
                name="userName"
                value={ userName }
                className="input-login"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                onChange={ this.handleChangeLogin }
              />
            </label>

            <label htmlFor="userEmail" className="label-login">
              Email:
              <input
                type="email"
                name="userEmail"
                value={ userEmail }
                className="input-login"
                data-testid="input-gravatar-email"
                placeholder="Digite seu Email"
                onChange={ this.handleChangeLogin }
              />
            </label>
            <div id="button-container">
              <button
                type="button"
                data-testid="btn-play"
                id="button-login"
                disabled={ isDisable }
                onClick={ this.buttonHandleClick }
              >
                Play
              </button>
              <button
                data-testid="btn-settings"
                type="button"
                id="button-config"
              >
                Configurações
              </button>
            </div>

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
