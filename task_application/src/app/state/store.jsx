import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./tasks/taskListSlice";
import taskReducer from "./tasks/taskSlice";


export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        tasks: taskReducer,
    },
});