// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  email,
});

export const walletAction = (wallet) => ({
  type: WALLET_ACTION,
  wallet,
});
