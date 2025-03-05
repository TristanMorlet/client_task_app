import { createSlice } from "@reduxjs/toolkit";

const initialState = [
]


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        setUsers: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return state.filter(user => user.id !== action.payload )
        }
    }
})

export const {addUser, removeUser, setUsers} = userSlice.actions;
export default userSlice.reducer;