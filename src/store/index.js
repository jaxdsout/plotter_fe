import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import timeoutWare from './middleware/timeout';
import agentReducer from './reducers/agent';
import authReducer from './reducers/auth';
import listmakerReducer from './reducers/listmaker';
import uiReducer from './reducers/ui';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "agent", "listmaker", "ui"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  agent: agentReducer,
  listmaker: listmakerReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(timeoutWare),
  preloadedState: {},
});

export const persistor = persistStore(store);
