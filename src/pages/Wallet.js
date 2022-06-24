import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActionfeth, walletExpense } from '../actions';

class Wallet extends React.Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: '',
  };

  currenciesFeth = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const dados = await fetch(URL).then((response) => response.json());
    delete dados.USDT;
    const listaMoedas = Object.keys(dados);
    const { dispatch } = this.props;
    await dispatch(walletActionfeth(listaMoedas));
  };

  recuperaFeth = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const dados = await fetch(URL).then((response) => response.json());
    delete dados.USDT;
    this.setState({ exchangeRates: dados });
  };

  // somaTotal = () => {
  //   const { elementosExpense } = this.props;
  //   const total = elementosExpense.reducer((acc, item) => {
  //     const { currency, value, exchangeRates } = item;
  //     const conver = exchangeRates[currency].ask;
  //     return acc + (value * conver);
  //   }, 0);
  // };

  salvaStore = async () => {
    const { id } = this.state;
    const MAGIC_NUMBER = id + 1;
    this.setState({ id: MAGIC_NUMBER }, await this.recuperaFeth());
    const { dispatch } = this.props;
    dispatch(walletExpense(this.state));
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
    });
    // this.somaTotal();
  };

  handleChange = ({ target }) => {
    if (target.id === 'moeda') {
      return this.setState({ currency: target.value });
    }
    this.setState({
      [target.id]: target.value,
    });
  };

  componentDidMount = () => {
    this.currenciesFeth();
  };

  render() {
    const { userEmail, moedaState, elementosExpense } = this.props;
    const total = elementosExpense.reduce((acc, item) => {
      const { currency, value, exchangeRates } = item;
      const conver = exchangeRates[currency].ask;
      return acc + (value * conver);
    }, 0);
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <header>
          <h3 data-testid="email-field">{userEmail.email}</h3>
          <h5 data-testid="total-field">{ total.toFixed(2) }</h5>
          <h5 data-testid="header-currency-field">BRL</h5>
        </header>
        <div>
          <form>
            <label htmlFor="value">
              <input
                id="value"
                value={ value }
                onChange={ this.handleChange }
                type="number"
                data-testid="value-input"
                placeholder="Despesas"
              />
            </label>
            <label htmlFor="description">
              <input
                id="description"
                value={ description }
                onChange={ this.handleChange }
                type="text"
                data-testid="description-input"
                placeholder="Descrição de gastos"
              />
            </label>
            <label htmlFor="moeda">
              Moeda
              <select id="moeda" value={ currency } onChange={ this.handleChange }>
                {moedaState && moedaState.map((elemento, index) => (
                  <option value={ elemento } key={ index }>
                    {elemento}
                  </option>
                ))}
              </select>
            </label>
            <select
              data-testid="method-input"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select
              data-testid="tag-input"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button type="button" onClick={ this.salvaStore }>
              Adicionar despesa
            </button>
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
  elementosExpense: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user,
  moedaState: state.wallet.currencies,
  elementosExpense: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
