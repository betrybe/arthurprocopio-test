import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from '../helpers/validate';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import { addExpense, loadCurrencies } from '../actions';

const schema = {
  value: {
    presence: { allowEmpty: false, message: 'Por favor, insira um valor' },
    numericality: {
      message: 'Por favor, insira um número',
    },
  },
  currency: {
    presence: { allowEmpty: false, message: 'Por favor, escolha uma moeda' },
  },
  method: {
    presence: { allowEmpty: false, message: 'Por favor, escolha um método de pagamento' },
  },
  tag: {
    presence: { allowEmpty: false, message: 'Por favor, escolha uma tag' },
  },
  description: {
    presence: { allowEmpty: true },
  },
};
class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
      touched: {},
      errors: {},
      isLoading: true,
    };

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { loadCurrencies: loadCurrenciesAction } = this.props;
    loadCurrenciesAction();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { values } = this.state;
    const { onAddExpense } = this.props;
    onAddExpense(values);
  }

  handleChangeForm(event) {
    event.preventDefault();
    const { values, touched } = this.state;
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    const newTouched = {
      ...touched,
      [event.target.name]: true,
    };
    const errors = validate(newValues, schema, { fullMessages: false });
    this.setState({
      isValid: !errors,
      values: {
        ...newValues,
      },
      touched: {
        ...newTouched,
      },
      errors: errors || {},
    });
  }

  render() {
    const { values, touched, errors, isValid, isLoading } = this.state;
    const { currencies, email, totalExpenses } = this.props;
    return (
      <div>
        <Header
          email={ email }
          totalExpenses={ totalExpenses }
        />
        <AddExpenseForm
          handleSubmit={ this.handleSubmit }
          handleChange={ this.handleChangeForm }
          formState={ {
            isValid,
            values,
            touched,
            errors,
          } }
          currencies={ currencies }
          isLoading={ isLoading }
        />
        <ExpensesTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddExpense: (expense) => {
    dispatch(addExpense(expense));
  },
  loadCurrencies: () => {
    dispatch(loadCurrencies());
  },
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  totalExpenses: state.wallet.totalExpensesReal,
  email: state.user.email,
});

Wallet.defaultProps = {
  totalExpenses: '0',
};

Wallet.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalExpenses: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
