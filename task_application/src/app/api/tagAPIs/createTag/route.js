import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const tagData = await req.json()
        const newTag = await db.Tag.create(tagData);
        return new NextResponse(JSON.stringify(newTag), { status: 200 })
    } catch (error) {
        console.error("Error creating tag", error)
        return new NextResponse(JSON.stringify({ error: 'failed to create tag'}), {status: 500})
    }
}
