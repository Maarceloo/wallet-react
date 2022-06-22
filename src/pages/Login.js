import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    btn: true,
  };

  handleChange = ({ target }) => {
    this.setState(
      {
        [target.id]: target.value,
      },
      () => this.validadeForm(),
    );
  };

  // habilitaBtn = () => {
  //   const { email, senha } = this.state;
  //   const re = /\S+@\S+\.\S+/;
  //   const MIN_SENHA = 5;
  //   if (re.test(email) && senha.length > MIN_SENHA) {
  //     this.setState({ btn: false });
  //   }
  // };

  validadeForm = () => {
    const SIX = 6;
    const { email, senha } = this.state;
    const mailFormat = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const emailValid = email.match(mailFormat);
    const passwordValid = senha.length >= SIX;
    this.setState({ btn: !(emailValid && passwordValid) });
  };

  walletPage = async () => {
    const { history, userEmail } = this.props;
    const { email } = this.state;
    userEmail(email);
    history.push('/carteira');
  };

  render() {
    const { btn } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">
            <input
              id="email"
              data-testid="email-input"
              type="email"
              placeholder="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            <input
              id="senha"
              data-testid="password-input"
              type="password"
              placeholder="senha"
              minLength="6"
              onChange={ this.handleChange }
            />
          </label>
          <button type="button" disabled={ btn } onClick={ this.walletPage }>
            {' '}
            Entrar
            {' '}
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
