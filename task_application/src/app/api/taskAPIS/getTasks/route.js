import { NextResponse } from "next/server";
import db from "../../../../lib/db/models";

export async function GET() {
    
    try {
        console.log(db.Task)
        const tasks = await db.Task.findAll();
        return new NextResponse(JSON.stringify(tasks), {status: 200})
    } catch (err) {
        console.error("Failed to fetch tasks", err);
        return new NextResponse(JSON.stringify({error: "failed to fetch tasks"}), {status: 500})
    }
}

