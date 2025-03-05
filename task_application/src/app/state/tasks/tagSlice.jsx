import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: []
}

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.tags.push(action.payload);
        },

        deleteTag: (state, action) => {
            state.tags = state.tags.filter(tag => tag.id !== action.payload)
        },
        setTags: (state, action) => {
            state.tags = action.payload
        },
    }
})

export const { addTag, deleteTag, setTags } = tagSlice.actions
export default tagSlice.reducer;