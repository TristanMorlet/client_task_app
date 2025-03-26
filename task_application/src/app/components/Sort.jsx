'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../state/staff/staffSlice';

export default function Sort( {listOfOptions} ) {
  
    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks.tasks);


    const [dropDownOpen, setDropDownOpen] = useState({sort: false})

    function getStaffMetrics(staffMember) {
        const assignedTasks = tasks.filter(task => task.assignedTo === staffMember.id);
        const completedTasks = assignedTasks.filter(task => task.status === "Finished");

        return {
            tasksAssigned: assignedTasks.length,
            tasksCompleted: completedTasks.length,
            completionRate: assignedTasks.length > 0 ? completedTasks.length / assignedTasks.length : 0
        };
    }

    function handleSortChange(sortType) {
        let sortedStaff = staff.filter(member => member.name !== "None");
        console.log("List of Staff Sorted", sortedStaff)

        switch (sortType) {
            case 'firstName':
                sortedStaff.sort((a,b) => a.name.split(' ')[0].localeCompare(b.name.split(" ")[0]))
                break;
            case 'lastName':
                sortedStaff.sort((a,b) => a.name.split(' ')[1].localeCompare(b.name.split(" ")[1]))
                break;
            case 'dateNewest':
                sortedStaff.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                break;
            case 'dateOldest':
                sortedStaff.sort((a,b) => new Date(a.dateAdded) - new Date(b.dateAdded))
                break;
            case 'leastTasks':
                sortedStaff.sort((a,b) => getStaffMetrics(a).tasksAssigned - getStaffMetrics(b).tasksAssigned)
                break;
            case 'mostTasks':
                sortedStaff.sort((a,b) => getStaffMetrics(b).tasksAssigned - getStaffMetrics(a).tasksAssigned)
                break;
            case 'leastCompleted':
                sortedStaff.sort((a,b) => getStaffMetrics(a).tasksCompleted - getStaffMetrics(b).tasksCompleted)
                break;
            case 'mostCompleted':
                sortedStaff.sort((a,b) => getStaffMetrics(b).tasksCompleted - getStaffMetrics(a).tasksCompleted)
                break;
            case 'lowCompletedRate':
                sortedStaff.sort((a,b) => getStaffMetrics(a).completionRate - getStaffMetrics(b).completionRate)
                break;
            case 'highCompletedRate':
                sortedStaff.sort((a,b) => getStaffMetrics(b).completionRate - getStaffMetrics(a).completionRate)
                break;
        }
        dispatch(setSort(sortedStaff));
    }
    function toggleDropDown(name) {

        setDropDownOpen(prev => ({...prev, [name]: !prev[name]}))
    }


    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={() => toggleDropDown('sort')}
                >
                    Sort
                </button>
            </div>

            {dropDownOpen.sort && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {listOfOptions.map((option) => (
                        <div 
                        key={option.name}
                        className="px-4 py-2">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleSortChange(option.name)}
                        >
                            {option.displayName}
                        </button>
                    </div>
                    )
                    )}
                </div>
            )}
        </div>
    
  )
}
