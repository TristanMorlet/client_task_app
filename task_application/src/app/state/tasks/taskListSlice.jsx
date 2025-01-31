import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskLists: {
        "To-Do": false,
        "Started": false,
        "Finished": false,
    }
}

const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {
        toggleListView: (state, action) => {
            const title = action.payload;
            state.taskLists[title] = !state.taskLists[title];
        },
    },
});

export const { toggleListView } = taskListSlice.actions;
export default taskListSlice.reducer;