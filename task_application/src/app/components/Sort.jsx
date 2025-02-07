'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../state/staff/staffSlice';

export default function Sort() {
  
    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff)
    

    const [dropDownOpen, setDropDownOpen] = useState({sort: false})

    function handleSortChange(sortType) {
        let sortedStaff = [...staff];
        console.log(sortedStaff)

        switch (sortType) {
            case 'firstName':
                sortedStaff.sort((a,b) => a.name.split(' ')[0].localeCompare(b.name.split(" ")[0]))
                break;
            case 'lastName':
                sortedStaff.sort((a,b) => a.name.split(' ')[1].localeCompare(b.name.split(" ")[1]))
                break;
            case 'dateAddedNewest':
                sortedStaff.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                break;
            case 'dateAddedOldest':
                sortedStaff.sort((a,b) => new Date(a.dateAdded) - new Date(b.dateAdded))
                break;
        }
        console.log(sortedStaff)
        dispatch(setSort(sortedStaff))
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
                    <div className="px-4 py-2">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleSortChange('firstName')}
                        >
                            First Name (A-Z)
                        </button>
                    </div>
                    <div className="px-4 py-2">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleSortChange('lastName')}
                        >
                            Last Name (A-Z)
                        </button>
                    </div>
                    <div className="px-4 py-2">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleSortChange('dateAddedNewest')}
                        >
                            Date Added (Newest)
                        </button>
                    </div>
                    <div className="px-4 py-2">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={() => handleSortChange('dateAddedOldest')}
                        >
                            Date Added (Oldest)
                        </button>
                    </div>
                </div>
            )}
        </div>
    
  )
}
