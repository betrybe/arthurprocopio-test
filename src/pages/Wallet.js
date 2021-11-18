import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from '../helpers/validate';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import { addExpense, loadCurrencies, editExpense } from '../actions';

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

const initialValues = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
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
      isEditing: false,
      editingId: 0,
    };

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startEditing = this.startEditing.bind(this);
  }

  componentDidMount() {
    const { loadCurrencies: loadCurrenciesAction } = this.props;
    loadCurrenciesAction();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { values, isEditing, editingId } = this.state;
    const { onAddExpense, onEditExpense } = this.props;
    if (isEditing) {
      onEditExpense({ ...values, id: editingId });
    } else {
      onAddExpense(values);
    }
    this.resetForm();
  }

  resetForm() {
    this.setState({
      values: initialValues,
      isEditing: false,
    });
  }

  startEditing(expenseId) {
    const { expenses } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    this.setState({
      isEditing: true,
      values: {
        value: expenseToEdit.value,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
        description: expenseToEdit.description,
      },
      editingId: expenseId,
    });
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
    const { values, touched, errors, isValid, isLoading, isEditing } = this.state;
    const { currencies, email, totalExpenses } = this.props;
    return (
      <div>
        <Header
          email={ email }
          totalExpenses={ totalExpenses }
        />
        <ExpenseForm
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
          isEditing={ isEditing }
        />
        <ExpensesTable
          handleStartEditing={ this.startEditing }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddExpense: (expense) => {
    dispatch(addExpense(expense));
  },
  onEditExpense: (expense) => {
    dispatch(editExpense(expense));
  },
  loadCurrencies: () => {
    dispatch(loadCurrencies());
  },
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpensesReal,
  email: state.user.email,
});

Wallet.defaultProps = {
  totalExpenses: '0',
};

Wallet.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  onEditExpense: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalExpenses: PropTypes.string,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
