"use client"

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './state/users/authSlice'
import { setTasks } from './state/tasks/taskSlice';

export default function AuthInit() {
    const dispatch = useDispatch();
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHydrated(true)
            dispatch(checkAuth())
            console.log("Running authinit")

        }
    }, [dispatch]);
    
    if (!hydrated) return null;
    
    return null;
}
