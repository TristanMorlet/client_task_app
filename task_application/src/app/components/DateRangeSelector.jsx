import React from 'react'
import { DateRangePicker } from 'rsuite'
export default function DateRangeSelector({handleSelect, placement}) {
    
  return (
    <div className="flex justify-end w-1/3 md:w-auto">
        <DateRangePicker 
        showOneCalendar 
        placeholder="Select Date Range"
        onChange={handleSelect} 
        placement = {placement}
        />
    </div>
  )
}
