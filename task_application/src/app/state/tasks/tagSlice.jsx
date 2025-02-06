import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.push(action.payload);
        },

        deleteTag: (state, action) => {
            console.log(state)
            return state.filter(tag => tag !== action.payload)
        },
    }
})

export const { addTag, deleteTag } = tagSlice.actions
export default tagSlice.reducer;