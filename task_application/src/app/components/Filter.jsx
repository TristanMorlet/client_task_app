import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../state/tasks/taskSlice'
export default function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);
  console.log(filters);
  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;

    let updatedFilters = {...filters}

    if (type === 'checkbox') {
        if (name === "tags") {
            updatedFilters.tags = checked
                ? [...updatedFilters.tags, value]
                : updatedFilters.tags.filter(tag => tag !== value);
        } else {
            updatedFilters[name] = checked
        }
    } else {
        updatedFilters[name] = value
    }
    dispatch(setFilter(updatedFilters));
  }

    const tags = ["Tag 1", "Tag 2", "Tag 3"]
    const staff = ["Staff 1", "Staff 2", "Staff 3"]
  
    return (
    <div className="flex flex-col space-y-2">
        <div className="flex items-center">
            <span className="mr-2">Filter by:</span>
        </div>

        <div className="flex flex-col">
        <label className="mb-1">Assigned To:</label>
            <select
                name="assignedTo"
                className="border border-gray-300 rounded px-2 py-1"
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                {staff.map((member) => (
                    <option key={member} value={member}>
                        {member}
                    </option>
                ))}

            </select>
        </div>

        <div className="flex flex-col">
            <label className="mb-1">Tags:</label>
                {tags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="tags"
                            value={tag}
                            checked={filters.tags.includes(tag)}
                            onChange={handleFilterChange}
                            className="cursor-pointer"
                        />
                        <span>{tag}</span>
                    </label>

                ))}
        </div>

        <div className="flex items-center">
            <label className="mr-2">Overdue:</label>
            <input
                type="checkbox"
                name="overdue"
                checked={filters.overdue}
                className="border border-gray-300 rounded px-2 py-1"
                onChange={handleFilterChange}
            />
        </div>
    </div>
  );
}
