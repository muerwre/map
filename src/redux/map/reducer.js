import { createReducer } from 'reduxsauce';
import { MAP_ACTIONS } from "$redux/map/constants";

const updatePolyCoords = (state, { payload: { latlngs } }) => ({
  ...state,
  poly: latlngs,
});

const HANDLERS = {
  // [AUTH_ACTIONS.SET_USER]: setUserHandler,
  [MAP_ACTIONS.UPDATE_POLY_CORDS]: updatePolyCoords
};

export const INITIAL_STATE = {
  poly: [],
};

export default createReducer(INITIAL_STATE, HANDLERS);
