import actionTypes from '../actions/types';
import getTotalFromExpenses from '../helpers/expense';

const initialState = {
  currencies: [],
  expenses: [],
  state: 'idle', // loading or error
  error: null,
  idIncrement: 0,
  totalExpensesReal: '0',
};

function Reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.START_WALLET_FETCH:
    return { ...state, state: 'loading' };
  case actionTypes.ADD_EXPENSE: {
    const newExpense = action.payload.expense;
    newExpense.id = state.idIncrement;
    const currentExpenses = state.expenses;
    currentExpenses.push(newExpense);
    return {
      ...state,
      expenses: currentExpenses,
      state: 'success',
      idIncrement: state.idIncrement + 1,
      totalExpensesReal: getTotalFromExpenses(currentExpenses),
    };
  }
  case actionTypes.LOAD_CURRENCIES:
    return {
      ...state,
      state: 'success',
      currencies: action.payload.currencies,
    };
  case actionTypes.DELETE_EXPENSE: {
    const currentExpenses = state.expenses.filter((expense) => (
      expense.id !== action.payload.id
    ));
    return {
      ...state,
      expenses: currentExpenses,
      totalExpensesReal: getTotalFromExpenses(currentExpenses),
    };
  }
  case actionTypes.EDIT_EXPENSE: {
    const replaceExpenses = state.expenses.map((expense) => (
      (expense.id === action.payload.id)
        ? {
          ...action.payload.expense,
          exchangeRates: expense.exchangeRates,
        } : expense
    ));
    return {
      ...state,
      expenses: replaceExpenses,
      totalExpensesReal: getTotalFromExpenses(replaceExpenses),
    };
  }
  default:
    return state;
  }
}

export default Reducer;
