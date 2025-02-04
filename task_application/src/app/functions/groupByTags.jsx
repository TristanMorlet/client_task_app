export function groupTasksByTags(tasks) {
    return tasks.reduce((groups, task) => {
        const { tags } = task;
        if (!groups[tags]) {
            groups[tags] = [];
        }
        groups[tags].push(task);
        return groups;
    }, {});
 }