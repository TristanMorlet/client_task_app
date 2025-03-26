'use client'
import React, {useState} from 'react'
import Sort from '@/app/components/Sort'
import StaffList from '@/app/components/StaffList'
import Tabs from '@/app/components/Tabs'
import DateRangeSelector from '@/app/components/DateRangeSelector'
import { useSelector } from 'react-redux'

export default function MetricsPage() {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const { user } = useSelector((state) => state.auth)
  const sortOptions = [
    {name: "mostTasks", displayName: "Most Tasks Assigned"}, 
    {name: "leastTasks", displayName: "Least Tasks Assigned"}, 
    {name: "mostCompleted", displayName: "Most Tasks Completed"}, 
    {name: "leastCompleted", displayName: "Least Tasks Completed"}, 
    {name: "highCompletedRate", displayName: "Highest Completion Rate"}, 
    {name: "lowCompletedRate", displayName: "Lowest Completion Rate"}
  ]

  function handleSelect(range) {
    console.log("Date Range before formatting", range)
    if (range) {
        const formatRange = range.map(date => {
            return new Date(date).toLocaleDateString()
        });
        console.log("New Date Range set and formatted", formatRange)
        setDateRange(formatRange)
        
        } else {
            console.log("Date Cleared")
            setDateRange(null)
        }
  }



  return (
    <div>
      <Tabs setSearch={setSearchText} role={user.role}/>
      <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-2xl md:text-4xl">Metrics</h1>
                </div>
                <div className="w-1/3 md:w-auto">
                <DateRangeSelector handleSelect={handleSelect}  />
                </div>
                
                <Sort listOfOptions={sortOptions} />
                
              </div>
              <StaffList searchText={searchText} page="metrics" dateRange={dateRange} user={user}/>
            </div>
    </div>
  )
}
