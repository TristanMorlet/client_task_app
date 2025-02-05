import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staff: [],
}

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