import React from 'react'

export default function Task( {task}) {
  return (
    <div className="p-3 mb-2 rounded shadow-md bg-white">
      <div className="flex justify-between items-center">
        <h3 className={`font-semibold ${task.overdue ? "text-red-500" : "text-black"}`}>{task.name}</h3>
      </div>
    </div>
  );
}
