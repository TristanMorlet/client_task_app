import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagList: {
        "Tag 1": false,
        "Tag 2": false,
        "Tag 3": false,
        "Tag 4": false
    },
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