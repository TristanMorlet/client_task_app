export function groupTasksByTags(tasks) {
    return tasks.reduce((groups, task) => {
        task.tags.forEach(tag => {
            if (!groups[tag]) {
                groups[tag] = [];
            }
            groups[tag].push(task);
        })
        return groups;
    }, {});
 }