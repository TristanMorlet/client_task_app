import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4"
]

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.push(action.payload);
        },

        removeTag: (state, action) => {
            state.tags = state.tags.filter(tag => tag !== action.payload)
        },
    }
})

export const { addTag, removeTag } = tagSlice.actions
export default tagSlice.reducer;