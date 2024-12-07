import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreatePostDTO } from "src/DTO/post";



export const postListsService = createAsyncThunk(
    "post-lists",
    async (thunkApi) => {
        const url = process.env.REACT_APP_URL as string;

        try {
            const data = await axios.get(`${url}/post/lists`);
            return data?.data?.data ?? [];
        } catch (error) {
            throw error;
        }
    }
);


export const createPostService = createAsyncThunk(
    "create-comment",
    async (postData: CreatePostDTO, thunkApi) => {
        const url = process.env.REACT_APP_URL as string;

        try {
            const response = await axios.post(`${url}/post/create`, postData);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }
);


