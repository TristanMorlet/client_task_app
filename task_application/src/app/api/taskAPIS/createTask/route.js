import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const taskData = await req.json()
        const newTask = await db.Task.create(taskData);
        return new NextResponse(JSON.stringify(newTask), { status: 200 })
    } catch (error) {
        console.error("Error creating task", error)
        return new NextResponse(JSON.stringify({ error: 'failed to create task'}), {status: 500})
    }
}
