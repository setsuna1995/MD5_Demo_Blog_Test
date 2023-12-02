import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async () => {
        const res = await axios.get('http://localhost:8000/blogs');
        return res.data;
    }
)
export const getBlogsById = createAsyncThunk(
    'blogs/getBlogsId',
    async (id) => {
        const res = await axios.get('http://localhost:8000/blogs/' + id);
        return res.data;
    }
)
export const addBlogs = createAsyncThunk(
    'blogs/addBlog',
    async (data) => {
        const res = await axios.post('http://localhost:8000/blogs', data);
        console.log(res.data)
        return res.data;
    }
)
export const editBlogs = createAsyncThunk(
    'blogs/editBlog',
    async (data) => {
        await axios.put('http://localhost:8000/blogs/' + data.id, data.data);
        const res = await axios.get('http://localhost:8000/blogs');
        return res.data;
    }
)
export const deleteBlogs = createAsyncThunk(
    'blogs/deleteBlogs',
    async (id) => {
        await axios.delete('http://localhost:8000/blogs/' + id);
        const res = await axios.get('http://localhost:8000/blogs');
        return res.data;
    }
)