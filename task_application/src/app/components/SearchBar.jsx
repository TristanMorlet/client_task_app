'use client'
import React from 'react'

export default function SearchBar( {setSearch} ) {

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  
  return (
    <div className="mr-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded px-2 py-1 mr-2 w-11/12 md:w-auto"
          onChange={handleChange}
        />
    </div>
  )
}
