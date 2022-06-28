import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="userName">
            Digite seu Nome:
            <input
              type="text"
              name="userName"
              data-testid="input-player-name"
              placeholder="Digite seu nome"
            />
          </label>

          <label htmlFor="userEmail">
            Digite seu Email:
            <input
              type="email"
              name="userEmail"
              data-testid="input-gravatar-email"
              placeholder="Digite seu Email"
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
          >
            Play
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
