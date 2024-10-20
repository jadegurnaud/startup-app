import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage pour le web
import { combineReducers } from 'redux';

// crée un slice pour l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Configuration de redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Crée un reducer qui combine les reducers de chaque slice
const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

// Crée un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crée un store Redux avec le reducer persistant   
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
});

// Crée un persistor Redux
const persistor = persistStore(store);

export const { setToken, removeToken, setUser } = authSlice.actions;
export { store, persistor, authSlice };