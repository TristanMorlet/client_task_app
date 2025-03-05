import { NextResponse } from "next/server";
import db from "../../../../lib/db/models";

export async function GET() {
    
    try {
        console.log(db.Staff)
        const staff = await db.Staff.findAll();
        return new NextResponse(JSON.stringify(staff), {status: 200})
    } catch (err) {
        console.error("Failed to fetch staff", err);
        return new NextResponse(JSON.stringify({error: "failed to fetch staff"}), {status: 500})
    }
}

