import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    
]

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.push(action.payload)
        },
        deleteStaff: (state, action) => {
            return state.filter(staff => staff.id !== action.payload)
        },

        setStaff: (state, action) => {
            return action.payload
        },

        setSort: (state, action) => {
            return action.payload
        },

        assignTask: (state, action) => {
           const {staffId, taskId} = action.payload
           console.log(taskId)
           const staffMember = state.find(staff => {
            return staff.id == staffId})
           console.log(staffMember)

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
           const {staffId, taskId} = action.payload
           const staffMember = state.find(staff => staff.id == staffId)

           if (staffMember) {
             
             staffMember.taskList = staffMember.taskList.filter(id => id !== taskId)
             staffMember.tasksAssigned = staffMember.taskList.length + staffMember.completeList.length
           }

        },

        completeTask: (state, action) => {
            const {staffId, taskId} = action.payload
            const staffMember = state.find(staff => staff.id == staffId)

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

export const { addStaff, deleteStaff, setSort, assignTask, unassignTask, completeTask, setStaff} = staffSlice.actions
export default staffSlice.reducer;