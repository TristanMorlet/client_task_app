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
    console.log(user.role)

    return (
    <div>
        <div className="flex flex-col h-screen">
            <Tabs setSearch={setSearchText} role={user.role} />
            <div className="flex-grow overflow-auto">
                <div className="flex justify-between items-center px-5 py-3 m-3">
                    <div>
                        <h1 className="font-bold text-2xl md:text-4xl">Tasks</h1>
                    </div>
                    <Filter/>
                </div>
                <TaskList searchText={searchText} role={user.role}/>
                <div className="flex justify-between items-center px-5 py-3 m-3">
                    <h1 className="font-bold text-2xl md:text-4xl">Tags</h1>
                </div>
                <div className="mb-20">
                    <TagsList role={user.role} />
                </div>
                <div className='mt-auto'>
                    <ProgressBar page="alltasks" user={user}/>
                </div>
            </div>
        </div>
    </div>
  )
}
