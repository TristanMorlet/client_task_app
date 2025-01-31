import React from 'react'
import MoreInfoButton from './MoreInfoButton'
export default function Task( {task}) {
  return (
    <div className="p-3 mb-2 rounded shadow-md bg-white border border-gray-300">
      <div className="flex justify-between items-center">
        <h3 className={`font-semibold ${task.overdue ? "text-red-500" : "text-black"}`}>{task.name}</h3>
        
        <MoreInfoButton task={task} />
      </div>
    </div>
  );
}
