import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}){
    try {
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({error: "Task ID not found"}), {status: 400})
        }

        const toBeDeleted = await db.Task.findByPk(id);
        if (!toBeDeleted) {
            return new NextResponse(JSON.stringify({error: "Task not found"}), {status: 404})
        }

        await toBeDeleted.destroy();

        return new NextResponse(JSON.stringify({message: "Task Deleted"}), {status: 200})
    } catch (err) {
        console.error("Error deleting task", err)
        return new NextResponse(JSON.stringify({error: "Failed to delete task"}), {status: 500})
    }
}

export async function PATCH(req, { params }){
    try {
        const { id } = await params
        const updates = await req.json()
        console.log(updates)
        const task = await db.Task.findByPk(id)
        if (!task) {
            return new NextResponse(JSON.stringify({error: "could not find task"}), {status: 404})
        }

        Object.keys(updates).forEach((key) => {
            if (key in task) {
                task[key] = updates[key]
            }
        })

        await task.save()

        return new NextResponse(JSON.stringify({message: "Task updated successfully"}), {status: 200})
    } catch (error) {
        console.error("Error updating task", error)
        return new NextResponse(JSON.stringify({error: "Error updating task"}), {status: 500})
    }
}