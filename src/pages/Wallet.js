import React from 'react';
import validate from 'validate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
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
class Wallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {
        value: '',
        currency: '',
        method: '',
        tag: '',
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
    let newValue = event.target.value;
    if (event.target.name === 'value') {
      newValue = Number.parseFloat(newValue);
    }
    const newValues = {
      ...values,
      [event.target.name]: newValue,
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
    const { values, touched, errors, isValid, isLoading, currencies } = this.state;
    return (
      <div>
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
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
