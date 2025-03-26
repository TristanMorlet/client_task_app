export function groupTasksByTags(tasks) {
    const groupedTasks = {};

    tasks.forEach(task => {
        task.tags.forEach(tag => {
            if (!groupedTasks[tag.id]) {
                groupedTasks[tag.id] = []
            }
            groupedTasks[tag.id].push(task)
        })
    })
    return groupedTasks
 }