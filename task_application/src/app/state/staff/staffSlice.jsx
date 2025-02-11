import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: "None", dateAdded: null, email: null, tasksAssigned: null, tasksCompleted: null}
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

        incrementTaskAssigned: (state, action) => {
           const staffMember = state.find(staff => staff.name === action.payload)
           console.log(staffMember)
           if (staffMember) {
            staffMember.tasksAssigned += 1
           }
           console.log(staffMember.tasksAssigned)
        },

        decrementTaskAssigned: (state, action) => {
           const staffMember = state.find(staff => staff.name === action.payload)
           if (staffMember) {
             staffMember.tasksAssigned -= 1
           }
        },

        incrementTaskCompleted: (state, action) => {
            const staffMember = state.find(staff => staff.name === action.payload)
            console.log(staffMember)
            if (staffMember) {
             staffMember.tasksCompleted += 1
            }
            console.log(staffMember.tasksCompleted)
         },
         decrementTaskCompleted: (state, action) => {
            const staffMember = state.find(staff => staff.name === action.payload)
            if (staffMember) {
              staffMember.tasksCompleted -= 1
            }
         },
    },
});

export const { addStaff, deleteStaff, setSort, addTaskAssigned, incrementTaskCompleted, decrementTaskAssigned, incrementTaskAssigned, decrementTaskCompleted } = staffSlice.actions
export default staffSlice.reducer;