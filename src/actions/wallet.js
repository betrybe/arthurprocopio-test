import actionTypes from './types';
import CurrencyService from '../services/CurrencyService';

const actionStartFetch = () => ({
  type: actionTypes.START_WALLET_FETCH,
});

const addExpenseSuccess = (expense) => ({
  type: actionTypes.ADD_EXPENSE_SUCCESS,
  payload: {
    expense,
  },
});

const loadCurrenciesSuccess = (currencies) => ({
  type: actionTypes.LOAD_CURRENCIES_SUCCESS,
  payload: {
    currencies,
  },
});

const loadCurrenciesError = ({ error }) => ({
  type: actionTypes.LOAD_CURRENCIES_FAILED,
  payload: {
    error,
  },
});

const addExpenseError = ({ error }) => ({
  type: actionTypes.ADD_EXPENSE_FAILED,
  payload: {
    error,
  },
});

export const addExpense = (expense) => async (dispatch) => {
  try {
    dispatch(actionStartFetch());
    const { data } = await CurrencyService.getAll();
    const newExpense = {
      ...expense,
      exchangeRates: data,
    };
    dispatch(addExpenseSuccess(newExpense));
  } catch (error) {
    dispatch(addExpenseError({ error }));
  }
};

export const loadCurrencies = () => async (dispatch) => {
  try {
    dispatch(actionStartFetch());
    const { data } = await CurrencyService.getAll();
    const currenciesArray = Object.keys(data);
    dispatch(loadCurrenciesSuccess(currenciesArray));
  } catch (error) {
    dispatch(loadCurrenciesError({ error }));
  }
};

export const deleteExpense = (id) => (
  {
    type: actionTypes.DELETE_EXPENSE,
    payload: {
      id,
    },
  }
);
