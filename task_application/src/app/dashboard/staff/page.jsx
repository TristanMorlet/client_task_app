import React from 'react'
import Tabs from '../../components/Tabs'
import Filter from '../../components/Filter'
import StaffList from '@/app/components/StaffList'
import AddStaff from '@/app/components/AddStaff'



export default function StaffPage() {
  return (
    <div>
        <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Staff</h1>
                </div>
                <Filter/>
            </div>
            <div className="flex content-center justify-end mx-8 text-sm">
              <div>
                <AddStaff />
              </div>
            </div>
            <StaffList />
        </div>
    </div>
  )
}
