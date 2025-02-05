import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagList: {}
};

const tagListSlice = createSlice({
    name: "tagList",
    initialState,
    reducers: {
        toggleListView: (state, action) => {
            const title = action.payload;
            state.tagList[title] = !state.tagList[title];
        },
    },
});

export const { toggleListView } = tagListSlice.actions;
export default tagListSlice.reducer;