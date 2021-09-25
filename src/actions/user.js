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
  dispatch(authStart());
  axios
    .post(`${process.env.REACT_APP_API_URL_PREFIX}/login`, { email })
    .then(() => {
      dispatch(authSuccess({ email }));
    })
    .catch((err) => {
      dispatch(authError({ error: err }));
    });
};
