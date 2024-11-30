import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { userSlice, userGuidesSlice, recommendedGuidesSlice, favoritesGuidesUserSlice, guideSlice } from "./slices";

const persistConfig = {
    key: 'root',
    storage,

};
const rootReducer = combineReducers(    
    {
        user: userSlice.reducer,
        userGuides: userGuidesSlice.reducer,
        recommendedGuides: recommendedGuidesSlice.reducer,
        favoritesGuidesUser: favoritesGuidesUserSlice.reducer,
        guide: guideSlice.reducer,
    });
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
}); 

const store = configureStore({
    reducer:persistedReducer,
    middleware:middleware ,
});
const persistor = persistStore(store);

export { store, persistor };
