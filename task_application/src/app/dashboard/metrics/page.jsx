'use client'
import React, {useState} from 'react'
import Sort from '@/app/components/Sort'
import StaffList from '@/app/components/StaffList'
import Tabs from '@/app/components/Tabs'

export default function MetricsPage() {
  const [searchText, setSearchText] = useState('');
  const sortOptions = [{name: "mostTasks", displayName: "Most Tasks Assigned"}, {name: "leastTasks", displayName: "Least Tasks Assigned"}, {name: "mostCompleted", displayName: "Most Tasks Completed"}, {name: "leastCompleted", displayName: "Least Tasks Completed"}, {name: "highCompletedRate", displayName: "Highest Completion Rate"}, {name: "lowCompletedRate", displayName: "Lowest Completion Rate"}]
  return (
    <div>
      <Tabs setSearch={setSearchText} />
      <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Metrics</h1>
                </div>
                <Sort listOfOptions={sortOptions} />
                
              </div>
              <StaffList searchText={searchText}page="metrics"/>
            </div>
    </div>
  )
}
