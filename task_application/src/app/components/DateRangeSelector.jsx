import React from 'react'
import { DateRangePicker } from 'rsuite'
export default function DateRangeSelector({handleSelect, placement}) {
    
  return (
    <div className="flex justify-end md:w-auto">
        <DateRangePicker 
        showOneCalendar 
        placeholder="Select Date Range"
        onChange={handleSelect} 
        placement = {placement}
        size = 'md'
        preventOverflow
        />
    </div>
  )
}
