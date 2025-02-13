import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: "None", dateAdded: null, email: null, tasksAssigned: null, tasksCompleted: null, taskList: [], completeList: [],}
]

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.push(action.payload)
        },
        deleteStaff: (state, action) => {
            return state.filter(staff => staff.name !== action.payload)
        },
        setSort: (state, action) => {
            return action.payload
        },

        assignTask: (state, action) => {
           const {staffName, taskId} = action.payload
           const staffMember = state.find(staff => staff.name === staffName)

           console.log("Staff Member being Assigned a Task", staffMember.name)

           if (staffMember) {

                if (!staffMember.taskList.includes(taskId)) {
                staffMember.taskList.push(taskId)
                }

            staffMember.tasksAssigned = (staffMember.taskList.length + staffMember.completeList.length)
           }

           console.log("Number of Tasks Assigned to Staff Member", staffMember.tasksAssigned)
        },

        unassignTask: (state, action) => {
           const {staffName, taskId} = action.payload
           const staffMember = state.find(staff => staff.name === staffName)

           if (staffMember) {
             
             staffMember.taskList = staffMember.taskList.filter(id => id !== taskId)
             staffMember.tasksAssigned = staffMember.taskList.length + staffMember.completeList.length
           }

        },

        completeTask: (state, action) => {
            const {staffName, taskId} = action.payload
            const staffMember = state.find(staff => staff.name === staffName)

            console.log("Staff Member completing a Task", staffMember.name)

            if (staffMember) {

             staffMember.taskList = staffMember.taskList.filter(id => id !== taskId)

             if (!staffMember.completeList.includes(taskId)) {
                staffMember.completeList.push(taskId)
            }

             staffMember.tasksCompleted = staffMember.completeList.length
            }
            
            console.log("Number of Tasks Assigned to Staff Member", staffMember.tasksAssigned)
            console.log("Number of Tasks Completed by Staff Member", staffMember.tasksCompleted)
         },
    },
});

export const { addStaff, deleteStaff, setSort, assignTask, unassignTask, completeTask, } = staffSlice.actions
export default staffSlice.reducer;