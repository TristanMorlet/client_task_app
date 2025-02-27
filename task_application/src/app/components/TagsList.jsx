'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { groupTasksByTags } from '../utils/groupByTags'
import TagsColumn from './TagsColumn'
import { setTags } from '../state/tasks/tagSlice'
import TagsPopUp from './Buttons/TagsPopUp'
export default function TagsList( {role} ) {
  
  const tasks = useSelector((state) => state.tasks.tasks)
  console.log("Tasks available to TagsList component", tasks)

  const tags = useSelector((state) => state.tags.tags)
  console.log("Tags available to TagsList component", tags)

  const groupedTasksbyTags = groupTasksByTags(tasks);
  console.log("Length of the list of Tags", tags.length)

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
      <div className='grid grid-flow-col auto-cols-max gap-4 p-5 overflow-x-auto'>
          {tags.map((tag, index) => (
              <TagsColumn key={index} tagName={tag.tagName} tagId={tag.id} tasks={groupedTasksbyTags[tag] || []} />
          ))}
      </div>
      {role === "worklead" && (
        <TagsPopUp />
      )}
      
    </div>
  )
}
