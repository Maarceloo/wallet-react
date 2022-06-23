import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActionfeth } from '../actions';

class Wallet extends React.Component {
  state = {
    moedas: [],
  };

  currenciesFeth = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const dados = await fetch(URL).then((response) => response.json());
    delete dados.USDT;
    const listaMoedas = Object.keys(dados);
    this.setState({ moedas: listaMoedas });
    const { dispatch } = this.props;
    await dispatch(walletActionfeth(listaMoedas));
  };

  render() {
    const { moedas } = this.state;
    if (moedas.length === 0) {
      this.currenciesFeth();
    }
    const { userEmail, moedaState } = this.props;
    return (
      <>
        <header>
          <h3 data-testid="email-field">{userEmail.email}</h3>
          <h5 data-testid="total-field">0</h5>
          <h5 data-testid="header-currency-field">BRL</h5>
        </header>
        <div>
          <form>
            <label htmlFor="despesa">
              <input
                id="despesa"
                type="number"
                data-testid="value-input"
                placeholder="Despesas"
              />
            </label>
            <label htmlFor="descricaoDespesa">
              <input
                id="descricaoDespesa"
                type="text"
                data-testid="description-input"
                placeholder="Descrição de gastos"
              />
            </label>
            <label htmlFor="Moeda">
              Moeda
              {console.log(moedaState)}
              <select id="Moeda">
                {moedaState && moedaState.map((elemento, index) => (
                  <option value={ elemento } key={ index }>{elemento}</option>
                ))}
              </select>
            </label>
            <select data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </form>
        </div>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  moedaState: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user,
  moedaState: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
