import actionTypes from './types';
import CurrencyService from '../services/CurrencyService';

const actionStartFetch = () => ({
  type: actionTypes.START_WALLET_FETCH,
});

const addExpenseSuccess = (expense) => ({
  type: actionTypes.ADD_EXPENSE,
  payload: {
    expense,
  },
});

const loadCurrenciesSuccess = (currencies) => ({
  type: actionTypes.LOAD_CURRENCIES,
  payload: {
    currencies,
  },
});

export const addExpense = (expense) => async (dispatch) => {
  dispatch(actionStartFetch());
  const { data } = await CurrencyService.getAll();
  const newExpense = {
    ...expense,
    exchangeRates: data,
  };
  dispatch(addExpenseSuccess(newExpense));
};

export const editExpense = (expense) => (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_EXPENSE,
    payload: {
      expense,
      id: expense.id,
    },
  });
};

export const loadCurrencies = () => async (dispatch) => {
  dispatch(actionStartFetch());
  const { data } = await CurrencyService.getAll();
  const currenciesArray = Object.keys(data);
  dispatch(loadCurrenciesSuccess(currenciesArray));
};

export const deleteExpense = (id) => (
  {
    type: actionTypes.DELETE_EXPENSE,
    payload: {
      id,
    },
  }
);
