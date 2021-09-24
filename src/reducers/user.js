import actions from '../actions';

const initialState = {
  email: null,
  state: 'idle', // loading or error
  isAuthenticated: false,
  error: null,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
  case actions.AUTHENTICATE:
    return { ...state, state: 'loading' };
  case actions.AUTHENTICATE_SUCCESS:
    return {
      ...state,
      email: action.payload.data,
      state: 'success',
      isAuthenticated: true,
    };
  case actions.AUTHENTICATE_FAILED:
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
