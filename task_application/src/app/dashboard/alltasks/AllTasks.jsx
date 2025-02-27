'use client';
import "client-only";

import React from 'react'
import { useState } from 'react'
import Tabs from '../../components/Tabs'
import TaskList from '../../components/TaskList'
import Filter from '../../components/Filter'
import TagsList from '../../components/TagsList'
import ProgressBar from '../../components/ProgressBar'
import { useSelector } from 'react-redux'


export default function AllTasksPageComponent() {
    const [searchText, setSearchText] = useState('');
    const { user } = useSelector((state) => state.auth)
    console.log(user)

    return (
    <div>
        <Tabs setSearch={setSearchText} role={user.role} />
        <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Tasks</h1>
                </div>
                <Filter/>
            </div>
            <TaskList searchText={searchText} role={user.role}/>
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <h1 className="font-bold text-4xl">Tags</h1>
            </div>
            <TagsList role={user.role} />
            <ProgressBar page="alltasks" role={user.role}/>
        </div>
    </div>
  )
}