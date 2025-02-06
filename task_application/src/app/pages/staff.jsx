import React from 'react'
import Tabs from '../components/Tabs'
import Filter from '../components/Filter'

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
        </div>
    </div>
  )
}
