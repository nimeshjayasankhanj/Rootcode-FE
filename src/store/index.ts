import { configureStore } from "@reduxjs/toolkit";
import postSlice from 'src/store/slices/post'
import commentSlice from 'src/store/slices/comment'

export const store = configureStore({
    reducer: {
        posts: postSlice,
        comments: commentSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
