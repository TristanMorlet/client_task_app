import React from 'react'
import { useSelector, UseDispatch } from 'react-redux'
import { groupTasksByTags } from '../functions/groupByTags'
import TagsColumn from './TagsColumn'
export default function TagsList() {
  
  const tasks = useSelector((state) => state.tasks.tasks)
  console.log(tasks)
  const tags = useSelector((state) => state.tags)
  console.log(tags)
  const groupedTasksbyTags = groupTasksByTags(tasks);
  console.log(tags.length)



  
  
  
  
  return (
    <div className="flex items-center justify-start">
      <div className={`grid grid-cols-${tags.length} gap-4 p-5 w-3/4`}>
          {tags.map((title, index) => (
              <TagsColumn key={index} title={title} tasks={groupedTasksbyTags[title] || []} />
          ))}
      </div>
      <button 
              className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-200"
              onClick={() => console.log("hi")}>
                  +
      </button>
    </div>
  )
}
