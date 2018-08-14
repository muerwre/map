import { createReducer } from 'reduxsauce';

const HANDLERS = {
  // [AUTH_ACTIONS.SET_USER]: setUserHandler,
};

export const INITIAL_STATE = {
  token: '',
};

export default createReducer(INITIAL_STATE, HANDLERS);
