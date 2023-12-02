import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/login',
    async (data) => {
        return await axios.post('http://localhost:8000/login', data)
    }
)