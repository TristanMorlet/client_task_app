import { NextResponse } from "next/server";
import db from "../../../../lib/db/models";

export async function GET() {
    
    try {
        console.log(db.Users)
        const users = await db.Users.findAll();
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (err) {
        console.error("Failed to fetch staff", err);
        return new NextResponse(JSON.stringify({error: "failed to fetch staff"}), {status: 500})
    }
}

