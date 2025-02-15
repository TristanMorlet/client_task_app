import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assignTask, unassignTask, completeTask } from "../staff/staffSlice";
const initialState = {
    tasks: [],
    filters: {
        assignedTo: "",
        dateAdded: null,
        tags: [],
        overdue: false,
        dateRange: null,
    }
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        updateTask: (state, action) => {
            const { taskId, property, value } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
              task[property] = value;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        },
        resetFilter: (state) => {
            state.filters = initialState.filters
        }
    },
    
});

export const { addTask, updateTask, deleteTask, setFilter, resetFilter } = taskSlice.actions;
export default taskSlice.reducer;