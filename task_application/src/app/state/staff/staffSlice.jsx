import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staff: [],
}

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            
        },
        deleteStaff: (state, action) => {
            
        },
    },
});