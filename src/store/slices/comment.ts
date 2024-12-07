import { createSlice } from "@reduxjs/toolkit";
import { commentListsService, createCommentService } from "src/services/comment-service";


const initialState = {
    data: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    isCommentPopUpOpen: false,
    isCommentSaving: false,
    selectedPost: null
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        openCommentPopUp: (state, action) => {
            state.selectedPost = action.payload;
            state.isCommentPopUpOpen = true;
        },
        closeCommentPopUp: (state) => {
            state.isCommentPopUpOpen = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(commentListsService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(commentListsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(commentListsService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

        builder
            .addCase(createCommentService.pending, (state) => {
                state.isCommentSaving = true;
            })
            .addCase(createCommentService.fulfilled, (state, action) => {
                state.isCommentSaving = false;
            })
            .addCase(createCommentService.rejected, (state, action) => {
                state.isCommentSaving = false;
            });

    },
});

export const { openCommentPopUp, closeCommentPopUp } = commentSlice.actions;

export default commentSlice.reducer;
