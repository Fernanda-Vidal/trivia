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
        </form>
      </div>
    );
  }
}

export default Login;
