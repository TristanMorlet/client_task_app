'use client'

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilter } from '../state/tasks/taskSlice'
import DateRangeSelector from './DateRangeSelector'
import { setStaff } from '../state/staff/staffSlice'
export default function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);

  const [dropDownOpen, setDropDownOpen] = useState({
    assignedTo: false,
    overdue: false,
    tags: false,
    filter: false
  })



  console.log("Current State of Filters", filters);
  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;

    let updatedFilters = {...filters}

    if (type === 'checkbox' && name === "tags") {
        updatedFilters.tags = [...filters.tags]

        if (checked) {
            updatedFilters.tags.push(Number(value))
        } else {
            updatedFilters.tags = updatedFilters.tags.filter(tag => tag !== Number(value));
        }
    } else if (type === "checkbox") {
            updatedFilters[name] = checked
    } else {
        updatedFilters[name] = value
    }
    dispatch(setFilter(updatedFilters));
  }

  function handleDateRangeSelect(range) {
    if (range) {
        const formattedRange = range.map(date => new Date(date).toISOString())
        console.log(formattedRange)
        dispatch(setFilter({ dateRange: formattedRange}))
    } else {
        dispatch(setFilter({ dateRange: null }))
    }

  }


  function toggleDropdown(name) {
    setDropDownOpen(prev => ({ ...prev, [name]: !prev[name] }));
  }
  function handleReset(){
    dispatch(resetFilter())
  }

    const tags = useSelector((state) => state.tags.tags)
    useEffect(() => {
        async function fetchStaff() {
        try {
            const res = await fetch("/api/staffAPIs/getStaff");
            const data = await res.json()
            console.log("Staff retrieved", data)
            dispatch(setStaff(data))
        } catch (err) {
            console.error("Failed to Fetch Staff", err)
        }
        }
        fetchStaff();
    }, [dispatch])

    const staff = useSelector((state) => state.staff)  
    console.log("List of Staff Available to Filter", staff)
    return (
    <div className="relative inline-block text-left">
        <div>
            <button
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleDropdown('filter')}
            >
                Filter
            </button>
        </div>



        {dropDownOpen.filter && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                
                <div className='px-4 py-2'>
                    <button
                        type="button"
                        className="w-full text-left"
                        onClick={()=> toggleDropdown('assignedTo')}
                    >
                        Assigned To:
                    </button>
                    {dropDownOpen.assignedTo && (
                        <div 
                            className="mt-2 space-y-2"
                        >
                            <select
                                name="assignedTo"
                                className="border border-gray-300 rounded px-2 py-1"
                                onChange={handleFilterChange}
                            >
                                {staff.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                    )}
                </div>

                <div className='px-4 py-2'>
                    <button
                        type="button"
                        className="w-full text-left"
                        onClick={()=> toggleDropdown('tags')}
                    >
                        Tags
                    </button>
                    {dropDownOpen.tags && (
                        <div 
                            className="mt-2 space-y-2"
                        >
                        {tags.map((tag) => (
                            <div key={tag.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="tags"
                                    value={tag.id}
                                    checked={filters.tags.includes(tag.id)}
                                    onChange={handleFilterChange}
                                    className="cursor-pointer"
                                />
                                <label>{tag.tagName}</label>
                            </div>

                        ))}
                        </div>
                    )}
                </div>
                <div className="px-4 py-2">
                    <button
                        type="button"
                        className="w-full text-left"
                        onClick={()=> toggleDropdown('overdue')}
                    >
                        Overdue
                    </button>
                    {dropDownOpen.overdue && (
                      <div
                        className="mt-2 space-y-2"
                      > 
                        <input
                            type="checkbox"
                            name="overdue"
                            checked={filters.overdue}
                            className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            onChange={handleFilterChange}
                        />
                      </div>
                    )}
                </div>

                <div className="px-4 py-2">
                    <DateRangeSelector handleSelect={handleDateRangeSelect} placement="bottomEnd" />
                </div>

                <div className="px-4 py-2 flex justify-center">
                    <button 
                        className="text-white rounded-md px-4 py-2 bg-blue-500 text-center text-bold hover:bg-blue-300 transition text-sm flex justify-center content-center"
                        onClick={handleReset}
                        >
                            Clear
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}
