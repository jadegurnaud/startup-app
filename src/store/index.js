import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { userSlice, userGuidesSlice, guidesSlice, favoritesGuidesUserSlice, guideSlice, myGuidesSlice, newGuideSlice, otherUserSlice, userFollowersSlice, otherUserGuidesSlice, userFollowingSlice, categoriesSlice, myTravelsSlice } from "./slices";

const persistConfig = {
    key: 'root',
    storage,

};
const rootReducer = combineReducers(    
    {
        user: userSlice.reducer,
        userGuides: userGuidesSlice.reducer,
        guides: guidesSlice.reducer,
        myGuides: myGuidesSlice.reducer,
        myTravels: myTravelsSlice.reducer,
        otherUserGuides: otherUserGuidesSlice.reducer,
        favoritesGuidesUser: favoritesGuidesUserSlice.reducer,
        guide: guideSlice.reducer,
        newGuide: newGuideSlice.reducer,
        otherUser: otherUserSlice.reducer,
        userFollowers: userFollowersSlice.reducer,
        userFollowing: userFollowingSlice.reducer,
        categories : categoriesSlice.reducer,
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
