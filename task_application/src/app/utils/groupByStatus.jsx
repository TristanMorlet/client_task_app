export function groupTasksByStatus(tasks) {
    return tasks.reduce((groups, task) => {
        const { status } = task;
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(task);
        return groups;
    }, {});
 }