'use client'
import React from 'react'
import MoreInfoButton from './Buttons/MoreInfoButton'
import { useState } from 'react'
export default function Task( {task, role}) {
  
  const [infoOpen, setInfoOpen] = useState(false);

  function handleToggleInfo() {
    setInfoOpen(!infoOpen);
  }
  
  
  
  
  return (
    <div className="p-3 mb-2 rounded shadow-md bg-white border border-gray-300">
      <div className="flex justify-between items-center">

        <p className={`font-semibold text-xs md:text-lg ${task.overdue ? "text-red-500" : "text-black"}`}>{task.name}</p>
        <button 
            className="font-bold text-sm md:text-lg mb-1 px-2 md:px-4"
            onClick={handleToggleInfo}>
                ...
            </button>
      </div>
      {infoOpen && <MoreInfoButton task={task} role={role} />}
    </div>
  );
}
