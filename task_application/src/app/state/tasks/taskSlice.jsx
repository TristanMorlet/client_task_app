import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { incrementTaskAssigned, incrementTaskCompleted, decrementTaskAssigned, decrementTaskCompleted } from "../staff/staffSlice";
import { act } from "react";
const initialState = {
    tasks: [],
    filters: {
        assignedTo: "",
        dateAdded: null,
        tags: [],
        overdue: false
    }
}

export const addTaskThunk = createAsyncThunk(
    "tasks/addTask", 
    async (task, {dispatch} ) => {
        if (["To-Do", "Started", "Finished"].includes(task.status)) {
            dispatch(incrementTaskAssigned(task.assignedTo));
            console.log(task.assignedTo)
        } 
        if (task.status === "Finished") {
            dispatch(incrementTaskCompleted(task.assignedTo))
        }
        return task
    }
)

export const updateTaskThunk = createAsyncThunk(
    "tasks/updateTask",
    async ({taskId, property, value}, {dispatch, getState}) => {
        const state = getState();
        const task = state.tasks.tasks.find(task => task.id === taskId)
        if (task) {
            if (property === "status") {
                if (["To-Do", "Started", "Finished"].includes(task.status)) {
                    dispatch(decrementTaskAssigned(task.assignedTo))
                } if (task.status === "Finished") {
                    dispatch(decrementTaskCompleted(task.assignedTo))
                }

                if (["To-Do", "Started", "Finished"].includes(value)){
                    dispatch(incrementTaskAssigned(task.assignedTo))
                } if (value === "Finished"){
                    dispatch(incrementTaskCompleted(task.assignedTo))
                }
            } else if (property === "assignedTo") {
                if (["To-Do", "Started", "Finished"].includes(task.status)){
                    dispatch(decrementTaskAssigned(task.assignedTo))
                    dispatch(incrementTaskAssigned(value))
                } if (task.status === "Finished") {
                    dispatch(decrementTaskCompleted(task.assignedTo))
                   dispatch(incrementTaskCompleted(value))
                }
            }
        }
        return { taskId, property, value }
    }
)

export const deleteTaskThunk = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, {dispatch, getState }) => {
        const state = getState();
        const task = state.tasks.tasks.find(task => task.id === taskId)
        if (task) {
            if (["To-Do", "Started", "Finished"].includes(task.status)) {
                dispatch(decrementTaskAssigned(task.assignedTo))
            } if (task.status === "Finished") {
                dispatch(decrementTaskCompleted(task.assignedTo))
            }
        }
        return taskId
    }
)
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

        setFilter: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        },
        resetFilter: (state) => {
            state.filters = initialState.filters
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTaskThunk.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                const { taskId, property, value } = action.payload;
                const task = state.tasks.find(task => task.id === taskId);
                if (task) {
                  task[property] = value;
                }
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
    }
});

export const { setFilter, resetFilter } = taskSlice.actions;
export default taskSlice.reducer;