import { NextResponse } from "next/server";
import db from "../../../../lib/db/models";

export async function GET() {
    console.log(db.Tag)
    try {
        console.log(db.Tag)
        const tags = await db.Tag.findAll();
        return new NextResponse(JSON.stringify(tags), {status: 200})
    } catch (err) {
        console.error("Failed to fetch tags", err);
        return new NextResponse(JSON.stringify({error: "failed to fetch tags"}), {status: 500})
    }
}

