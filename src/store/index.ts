// import { selectedCategorySlice } from './features/selectedCategorySlice';
import { emptySplitApi } from './apis/emptySplitApi';
import { menuApi } from './apis/menuApi';
// import { userApi } from './apis/userApi';
import { configureStore } from '@reduxjs/toolkit';
// import usersReducer, { checkTokenExpirationMiddleware } from './features/usersSlice'; 
import basketReducer from './features/basketSlice';

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(emptySplitApi.middleware)
    ,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch