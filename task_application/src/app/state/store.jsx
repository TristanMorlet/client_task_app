import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./tasks/taskListSlice";
import taskReducer from "./tasks/taskSlice";
import tagListReducer from "./tasks/tagListSlice"
import tagReducer from "./tasks/tagSlice"
import staffReducer from "./staff/staffSlice"


export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        tasks: taskReducer,
        tagList: tagListReducer,
        tags: tagReducer,
        staff: staffReducer
    },
});