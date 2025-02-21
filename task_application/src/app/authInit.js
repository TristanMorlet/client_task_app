"use client"

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './state/users/authSlice'

export default function AuthInit() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Running authinit")
        dispatch(checkAuth())
    }, [dispatch]);
    
    return null;
}
