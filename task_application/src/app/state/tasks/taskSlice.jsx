import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    filters: {
        assignedTo: "",
        dateAdded: null,
        tags: [],
        overdue: false
    }
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        updateTaskProperty: (state, action) => {
            const {taskId, property, value} = action.payload;
            const task = state.tasks.find(task => task.id === taskId)
            if (task) {
                task[property] = value;
            }
        },

        deleteTask: (state, action) => {
            console.log(state.tasks)
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },

        setFilter: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        },
        resetFilter: (state) => {
            state.filters = initialState.filters
        }
    }
});

export const { addTask, updateTask, deleteTask, updateTaskProperty, setFilter, resetFilter } = taskSlice.actions;
export default taskSlice.reducer;