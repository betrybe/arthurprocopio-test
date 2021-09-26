import axios from 'axios';
import actionTypes from './types';

export const authStart = () => ({
  type: actionTypes.AUTHENTICATE,
});

export const authSuccess = ({ email }) => ({
  type: actionTypes.AUTHENTICATE_SUCCESS,
  payload: {
    email,
  },
});

export const authError = ({ error }) => ({
  type: actionTypes.AUTHENTICATE_FAILED,
  payload: {
    error,
  },
});

export const authenticate = ({ email }) => (dispatch) => {
  try {
    // dispatch(authStart());
    dispatch(authSuccess({ email }));
  } catch (error) {
    dispatch(authError({ error }));
  }
};
