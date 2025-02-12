import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: "None", dateAdded: null, email: null, tasksAssigned: null, tasksCompleted: null, taskList: []}
]

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.push(action.payload)
        },
        deleteStaff: (state, action) => {

            console.log(state)
            return state.filter(staff => staff.name !== action.payload)
           
        },
        setSort: (state, action) => {
            console.log(state)
            console.log(action.payload)
            return action.payload
        },

        assignTask: (state, action) => {
           const {staffName, taskId} = action.payload
           const staffMember = state.find(staff => staff.name === staffName)
           console.log(staffMember)
           if (staffMember) {
            staffMember.taskList.push(taskId)
            staffMember.tasksAssigned += 1
           }
           console.log(staffMember.tasksAssigned)
        },

        unassignTask: (state, action) => {
           const {staffName, taskId} = action.payload
           const staffMember = state.find(staff => staff.name === staffName)
           if (staffMember) {
             staffMember.taskList = staffMember.taskList.filter(id => id !== taskId)
             staffMember.tasksAssigned -= 1
           }
        },

        completeTask: (state, action) => {
            const {staffName, taskId} = action.payload
            const staffMember = state.find(staff => staff.name === staffName)
            console.log(staffMember)
            if (staffMember) {
             staffMember.taskList = staffMember.taskList.filter(id => id !== taskId)
             staffMember.tasksCompleted += 1
            }
            console.log(staffMember.tasksCompleted)
         },
    },
});

export const { addStaff, deleteStaff, setSort, assignTask, unassignTask, completeTask, } = staffSlice.actions
export default staffSlice.reducer;