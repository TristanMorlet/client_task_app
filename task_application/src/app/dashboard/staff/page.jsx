'use client'
import React, {useState} from 'react'
import Tabs from '../../components/Tabs'
import Sort from '../../components/Sort'
import StaffList from '@/app/components/StaffList'
import AddStaff from '@/app/components/Buttons/AddStaff'



export default function StaffPage() {
  const [searchText, setSearchText] = useState('');
  const sortOptions = [
    {name: "firstName", displayName: "First Name (A-Z)"}, 
    {name: "lastName", displayName: "Last Name (A-Z)"}, 
    {name: "dateNewest", displayName: "Date Added (Newest)"}, 
    {name:"dateOldest", displayName: "Date Added (Oldest)"}
  ]
  return (
    <div>
      <Tabs setSearch={setSearchText} />
        <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Staff</h1>
                </div>
                <Sort listOfOptions={sortOptions} />
            </div>
            <div className="flex content-center justify-end mx-8 text-sm">
              <div>
                <AddStaff />
              </div>
            </div>
            <StaffList page="staff" searchText={searchText} />
        </div>
    </div>
  )
}
