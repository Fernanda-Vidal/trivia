import React from 'react';

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
            >
              Play
            </button>
            <button data-testid="btn-settings" type="button">Configurações</button>

          </form>
        </div>
      );
    }
}

export default Login;
