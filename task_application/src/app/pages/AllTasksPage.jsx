'use client'

import React from 'react'
import { useState } from 'react'
import Tabs from '../components/Tabs'
import TaskList from '../components/TaskList'
import Filter from '../components/Filter'
import TagsList from '../components/TagsList'
export default function AllTasksPage() {



    return (
    <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Tasks</h1>
                </div>
                <Filter/>
            </div>
            <TaskList />
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <h1 className="font-bold text-4xl">Tags</h1>
            </div>
            <TagsList />
        </div>
  )
}
