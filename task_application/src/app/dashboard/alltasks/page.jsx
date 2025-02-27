'use client'
import dynamic from "next/dynamic"

const AllTasksPage = dynamic(() => import ('./AllTasks'), {
    ssr: false,
})

export default function AllTasks() {
    return (
        <AllTasksPage/>
    )
}