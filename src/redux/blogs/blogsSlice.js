import {createSlice} from "@reduxjs/toolkit";
import {addBlogs, deleteBlogs, editBlogs, getBlogs, getBlogsById} from "../../service/blogsService";


const initialState = {
    blogs: []
}
const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
        });
        builder.addCase(getBlogsById.fulfilled, (state, action) => {
            state.blogs = action.payload;
        });
        builder.addCase(addBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
        });
        builder.addCase(deleteBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
        });
        builder.addCase(editBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;

        });
    }
})
export default blogsSlice.reducer;