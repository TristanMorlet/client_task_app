import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./tasks/taskListSlice";
import taskReducer from "./tasks/taskSlice";
import tagListReducer from "./tasks/tagListSlice"
import tagReducer from "./tasks/tagSlice"


export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        tasks: taskReducer,
        tagList: tagListReducer,
        tags: tagReducer
    },
});