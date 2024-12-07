import { createSlice } from "@reduxjs/toolkit";
import { createPostService, postListsService } from "src/services/post-service";

const initialState = {
    data: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    isPostPopUpOpen: false,
    isPostSaving: false
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        openPostPopUp: (state) => {
            state.isPostPopUpOpen = true;
        },
        closePostPopUp: (state) => {
            state.isPostPopUpOpen = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(postListsService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postListsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(postListsService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

        builder
            .addCase(createPostService.pending, (state) => {
                state.isPostSaving = true;
            })
            .addCase(createPostService.fulfilled, (state, action) => {
                state.isPostSaving = false;
            })
            .addCase(createPostService.rejected, (state, action) => {
                state.isPostSaving = false;
            });

    },
});

export const { openPostPopUp, closePostPopUp } = postSlice.actions;

export default postSlice.reducer;
