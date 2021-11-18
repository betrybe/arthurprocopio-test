import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { email, totalExpenses } = props;
  const emailText = <span data-testid="email-field">{ email }</span>;
  const debtText = <span data-testid="total-field">{ totalExpenses }</span>;

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={ `${process.env.PUBLIC_URL}/logo192.png` }
            height="24"
            alt="brand-symbol"
          />
        </a>
        <div className="row justify-content-end">
          <div className="text-end">
            Email:
            {' '}
            {emailText}
          </div>
          {' '}
          <div className="text-end">
            Despesa Total: R$
            {' '}
            { debtText }
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  totalExpenses: '0',
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string,
};

export default Header;
