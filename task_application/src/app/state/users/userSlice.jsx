import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        useremail: "tm@gmail.com", 
        role: "worklead"
    },
    {
        useremail: "jm@gmail.com",
        role: "staff"
    }
]


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        newStaff: (state, action) => {
            state.push(action.payload)
        },
    }
})

export const {newStaff} = userSlice.actions;
export default userSlice.reducer;