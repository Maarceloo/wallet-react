// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION_FETH = 'WALLET_ACTION_FETH';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  email,
});

export const walletActionfeth = (walletFeth) => ({
  type: WALLET_ACTION_FETH,
  walletFeth,
});
