import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: "None", dateAdded: null, email: null}
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
        }
    },
});

export const { addStaff, deleteStaff, setSort } = staffSlice.actions
export default staffSlice.reducer;