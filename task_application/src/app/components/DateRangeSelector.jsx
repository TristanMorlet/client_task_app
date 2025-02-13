import React from 'react'
import { DateRangePicker } from 'rsuite'
export default function DateRangeSelector({handleSelect}) {
    
  return (
    <div>
        <DateRangePicker 
        showOneCalendar 
        placeholder="Select Date Range"
        onChange={handleSelect} 
        />
    </div>
  )
}
