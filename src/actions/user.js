import actionTypes from './types';

const authStart = () => ({
  type: actionTypes.AUTHENTICATE,
});

const authSuccess = ({ email }) => ({
  type: actionTypes.AUTHENTICATE_SUCCESS,
  payload: {
    email,
  },
});

const authError = ({ error }) => ({
  type: actionTypes.AUTHENTICATE_FAILED,
  payload: {
    error,
  },
});

export const authenticate = ({ email }) => (dispatch) => {
  try {
    dispatch(authStart());
    dispatch(authSuccess({ email }));
  } catch (error) {
    dispatch(authError({ error }));
  }
};
