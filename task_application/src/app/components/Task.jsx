import React from 'react'
import MoreInfoButton from './MoreInfoButton'
import { useState } from 'react'
export default function Task( {task}) {
  
  const [infoOpen, setInfoOpen] = useState(false);

  function handleToggleInfo() {
    setInfoOpen(!infoOpen);
  }
  
  
  
  
  return (
    <div className="p-3 mb-2 rounded shadow-md bg-white border border-gray-300">
      <div className="flex justify-between items-center">
        <h3 className={`font-semibold ${task.overdue ? "text-red-500" : "text-black"}`}>{task.name}</h3>
        <button 
            className="font-bold text-lg mb-1"
            onClick={handleToggleInfo}>
                ...
            </button>
      </div>
      {infoOpen && <MoreInfoButton task={task} />}
    </div>
  );
}
