import { createSlice } from "@reduxjs/toolkit";
import { verifyToken } from "@/app/utils/authHelper";

const token = typeof window !== "undefined" ? localStorage.getItem("jwt"): null;
let initialUser = null;
let initialIsAuth = false;

if (token) {
    const userData = verifyToken(token);
    if (userData) {
        console.log("setting initial user", userData.email, userData.role)
        initialUser = { email: userData.email, role: userData.role }
        initialIsAuth = true; 
    } else {
        localStorage.removeItem("jwt")
    }
}





const initialState = {
    user: initialUser,
    token: token,
    isAuthenticated: initialIsAuth
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, role, token } = action.payload
            state.user = { email, role}
            state.token = token
            state.isAuthenticated = true;
            localStorage.setItem("jwt", token)
            console.log(token)
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("jwt")
        },
        checkAuth: (state) => {
            console.log("running checkAuth")
            const token = localStorage.getItem("jwt")
            console.log("Token from localstorage", token)
            if (!token) return;

            const userData = verifyToken(token);

            console.log("decoded userdata", userData)
            if (userData) {
                state.user = {email: userData.email, role: userData.role }
                state.token = token
                state.isAuthenticated = true
                console.log("auth restored", state.user, state.token, state.isAuthenticated)
            } else {
                localStorage.removeItem("jwt")
                state.user = null
                state.token = null
                state.isAuthenticated = false
                console.log("invalid token, clearing state.")
            }
        }
    }
})


export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;