import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActionfeth } from '../actions';

class Wallet extends React.Component {
  state = {
    moedas: [],
  }

  currenciesFeth = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const dados = await fetch(URL).then((response) => response.json());
    delete dados.USDT;
    const listaMoedas = Object.keys(dados);
    this.setState({ moedas: [dados] });
    const { dispatch } = this.props;
    dispatch(walletActionfeth(listaMoedas));
  };

  render() {
    const { moedas } = this.state;
    if (moedas.length === 0) {
      this.currenciesFeth();
    }
    const { userEmail } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ userEmail.email }</h3>
        <h5 data-testid="total-field">0</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user,
});

export default connect(mapStateToProps)(Wallet);
