import {createSlice, current} from "@reduxjs/toolkit";
import {loginUser} from "../../service/userService";


const initialState = {
    currentUser:  JSON.parse(localStorage.getItem('currentUser'))
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.data;
            localStorage.setItem('currentUser', JSON.stringify(action.payload.data))
        })
    }
})
export default userSlice.reducer
