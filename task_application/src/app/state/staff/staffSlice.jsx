import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: "Staff 1", dateAdded: Date.now(), email: "staff1@gmail.com"},
    {name: "Staff 2", dateAdded: Date.now(), email: "staff2@gmail.com"},
    {name: "Staff 3", dateAdded: Date.now(), email: "staff3@gmail.com"}
]

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.push(action.payload)
        },
        deleteStaff: (state, action) => {
            state.staff = state.staff.filter(staff => staff !== action.payload)
        },
    },
});

export const { addStaff, deleteStaff } = staffSlice.actions
export default staffSlice.reducer;