import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
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
};

const mapStateToProps = (state) => ({
  userEmail: state.user,
});

export default connect(mapStateToProps)(Wallet);
