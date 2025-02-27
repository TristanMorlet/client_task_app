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