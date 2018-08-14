import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import authReducer from '$redux/auth/reducer';
import mapReducer from '$redux/map/reducer';

// import authSagas from '$redux/auth/sagas';
//

// import modalSagas from '$redux/modal/sagas';
//
// import chatReducer from '$redux/chat/reducer';
// import chatSagas from '$redux/chat/sagas';
//
// import gameReducer from '$redux/game/reducer';
// import gameSagas from '$redux/game/sagas';

// import { ROOM_STRUCTURE, ROOMS, TABS } from '$redux/chat/constants';

export const keys = {
  auth: 'auth',
  map: 'map',
  // game: 'game',
};
//
//
const authPersistConfig = {
  key: keys.auth,
  storage,
};

const mapPersistConfig = {
  key: keys.map,
  storage,
};

//
// const chatPersistConfig = {
//   key: keys.chat,
//   transforms: [blacklistTransform],
//   storage,
// };
//
// const gamePersistConfig = {
//   key: keys.game,
//   whitelist: ['mode', 'pending'],
//   storage,
// };

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

// redux extension composer
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable no-underscore-dangle */

export const history = createHistory();

export const store = createStore(
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    map: persistReducer(mapPersistConfig, mapReducer),
    // chat: persistReducer(chatPersistConfig, chatReducer),
    // game: persistReducer(gamePersistConfig, gameReducer),
    // modal: modalReducer,
    routing: routerReducer
  }),
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

export default function configureStore() {
  // run sagas
  // sagaMiddleware.run(authSagas);
  // sagaMiddleware.run(modalSagas);
  // sagaMiddleware.run(chatSagas);
  // sagaMiddleware.run(gameSagas);

  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
}
