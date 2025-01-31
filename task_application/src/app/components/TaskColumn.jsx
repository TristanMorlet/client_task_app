import React from 'react'
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { toggleListView } from '../state/tasks/taskListSlice';
import PopUpForm from './PopUpForm'

export default function TaskColumn({title, tasks}) {
    const dispatch = useDispatch();
    const openLists = useSelector((state) => state.taskList.taskLists);

    function handleToggleListView(){
        dispatch(toggleListView(title));
    };

    return (
        <div className="p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-300 h-fit">
            <h4 
                className="text-lg font-semibold p-3 border-b cursor-pointer flex justify-between items-center"
                onClick={handleToggleListView}>
                    {title}
                    <span>{openLists[title] ? "▲" : "▼"}</span>
            </h4>
            {openLists[title] === true ?
                        (<div className={"flex flex-col overflow-hidden transition-all duration-300 ease-in-out"}>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center">No tasks in {title}</p>
              )}
                <PopUpForm status={title}/>
            </div>) : null}
        </div>
    )
}