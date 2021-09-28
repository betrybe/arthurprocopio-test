import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export const Main = (props) => {
  const { email, children, isAuthenticated, totalExpenses } = props;
  const emailText = <span data-testid="email-field">{ email }</span>;
  const debtText = <span data-testid="total-field">{ totalExpenses }</span>;

  return (
    <>
      {/* {!isAuthenticated && <Redirect to="/" />} */}
      <nav className="navbar navbar-light bg-light" aria-label="Fourth navbar example">
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
            <div className="text-end">
              Despesa Total: R$
              {' '}
              { debtText }
              {' '}
              BRL
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

Main.defaultProps = {
  totalExpenses: 0,
};

Main.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number,
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpensesReal,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, null)(Main);
