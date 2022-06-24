// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_ACTION_FETH, WALLET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION_FETH:
    return {
      ...state,
      currencies: action.walletFeth,
    };
  case WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
