import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreatePostDTO } from "src/DTO/post";


export const commentListsService = createAsyncThunk(
    "comment-lists",
    async (id: string, thunkApi) => {
        const url = process.env.REACT_APP_URL as string;

        try {
            const data = await axios.get(`${url}/comment/lists/${id}`);
            return data?.data?.data ?? {};
        } catch (error) {
            throw error;
        }
    }
);


export const createCommentService = createAsyncThunk(
    "create-comment",
    async (postData: any, thunkApi) => {
        const url = process.env.REACT_APP_URL as string;

        try {
            const response = await axios.post(`${url}/comment/create`, postData);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }
);


