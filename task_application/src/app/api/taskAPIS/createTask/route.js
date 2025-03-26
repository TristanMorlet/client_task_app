import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const taskData = await req.json()

        console.log(taskData)


        const newTask = await db.Task.create({
            name: taskData.name,
            assignedTo: taskData.assignedTo,
            deadline: taskData.deadline,
            status: taskData.status,
            overdue: taskData.overdue,
        });

        console.log(newTask)

        if (taskData.tags && taskData.tags.length > 0) {
            const taskTags = taskData.tags.map(tagId => ({
                taskId: newTask.id, 
                tagId: tagId,       
            }));

            await db.TaskTags.bulkCreate(taskTags);
        }

        const taskWithTags = await newTask.reload({ include: [
            { 
                model: db.Tag, 
                as: "tags" 
            }
        ]
    });
        console.log(taskWithTags)
        return new NextResponse(JSON.stringify(taskWithTags), { status: 200 })
    } catch (error) {
        console.error("Error creating task", error)
        return new NextResponse(JSON.stringify({ error: 'failed to create task'}), {status: 500})
    }
}
