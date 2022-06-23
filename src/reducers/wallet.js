// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_ACTION_FETH } from '../actions';

const INITIAL_STATE = {
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION_FETH:
    return {
      ...state,
      currencies: action.walletFeth,
    };
  default:
    return state;
  }
};

export default wallet;
