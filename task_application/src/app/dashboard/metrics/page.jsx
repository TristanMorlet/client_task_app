import React from 'react'
import Sort from '@/app/components/Sort'
import StaffList from '@/app/components/StaffList'

export default function MetricsPage() {
  return (
    <div>
      <div className="flex flex-col h-screen"> 
            <div className="flex justify-between items-center px-5 py-3 m-3">
                <div>
                    <h1 className="font-bold text-4xl">Metrics</h1>
                </div>
                <Sort page="metrics" />
                
              </div>
              <StaffList page="metrics"/>
            </div>
    </div>
  )
}
