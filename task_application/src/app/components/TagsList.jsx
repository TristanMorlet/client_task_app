'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { groupTasksByTags } from '../utils/groupByTags'
import TagsColumn from './TagsColumn'
import { setTags } from '../state/tasks/tagSlice'
import TagsPopUp from './buttons/TagsPopUp'
export default function TagsList( {role} ) {
  
  const tasks = useSelector((state) => state.tasks.tasks)
  console.log("Tasks available to TagsList component", tasks)

  const tags = useSelector((state) => state.tags.tags)
  console.log("Tags available to TagsList component", tags)

  const groupedTasksbyTags = groupTasksByTags(tasks);
  console.log("grouped tasks by tags", groupedTasksbyTags)

  const dispatch = useDispatch();
  
  useEffect(() => {
      async function fetchTags() {
        try {
            const res = await fetch("/api/tagAPIs/getTags");
            const data = await res.json()
            dispatch(setTags(data))
        } catch (err) {
            console.error("Failed to Fetch Tags", err)
        }
      }
      fetchTags();
  }, [dispatch])
  
  return (
    <div className="flex items-center justify-start">
      <div className='md:grid md:grid-flow-col md:auto-cols-max md:gap-4 md:p-5 md:overflow-x-auto md:space-y-0 md:w-auto m-2 p-5 w-full flex flex-col space-y-2 gap-2 " '>
          {tags.map((tag) => (
              <TagsColumn key={tag.id} tagName={tag.tagName} tagId={tag.id} tasks={groupedTasksbyTags[tag.id] || []} role={role} />
          ))}
      </div>
      {role === "worklead" && (
        <TagsPopUp />
      )}
      
    </div>
  )
}
