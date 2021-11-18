import actionTypes from '../actions/types';

const initialState = {
  email: '',
  state: 'idle', // loading or error
  isAuthenticated: false,
  error: null,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.AUTHENTICATE:
    return { ...state, state: 'loading' };
  case actionTypes.AUTHENTICATE_SUCCESS:
    return {
      ...state,
      email: action.payload.email,
      state: 'success',
      isAuthenticated: true,
    };
  case actionTypes.AUTHENTICATE_FAILED:
    return {
      ...state,
      state: 'error',
      isAuthenticated: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
}

export default Reducer;
