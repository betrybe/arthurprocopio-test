import actionTypes from '../actions/types';

const initialState = {
  currencies: {},
  expenses: [],
  state: 'idle', // loading or error
  error: null,
  idIncrement: 0,
  totalExpensesReal: 0,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.START_WALLET_FETCH:
    return { ...state, state: 'loading' };
  case actionTypes.ADD_EXPENSE_SUCCESS: {
    const newExpense = action.payload.expense;
    newExpense.id = state.idIncrement + 1;
    const currentExpenses = state.expenses;
    currentExpenses.push(newExpense);
    return {
      ...state,
      expenses: currentExpenses,
      state: 'success',
      idIncrement: state.idIncrement + 1,
      totalExpensesReal: Number(currentExpenses.reduce((acumulator, actual) => {
        const exchangeRate = actual.exchangeRates[actual.currency].ask;
        return acumulator + (actual.value * exchangeRate);
      }, 0)).toFixed(2),
    };
  }
  case actionTypes.ADD_EXPENSE_FAILED:
    return {
      ...state,
      state: 'error',
      error: action.payload.error,
    };
  case actionTypes.LOAD_CURRENCIES_SUCCESS:
    return {
      ...state,
      state: 'success',
      currencies: action.payload.currencies,
    };
  case actionTypes.LOAD_CURRENCIES_FAILED:
    return {
      ...state,
      state: 'error',
      error: action.payload.error,
      currencies: [],
    };
  default:
    return state;
  }
}

export default Reducer;
