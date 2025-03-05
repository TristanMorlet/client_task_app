export function groupTasksByTags(tasks) {
    const groupedTasks = {};

    tasks.forEach(task => {
        task.tags.forEach(tag => {
            if (!groupedTasks[tag.tagName]) {
                groupedTasks[tag.tagName] = []
            }
            groupedTasks[tag.tagName].push(task)
        })
    })
    return groupedTasks
 }