import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const staffData = await req.json()
        const newStaff = await db.Staff.create(staffData);
        return new NextResponse(JSON.stringify(newStaff), { status: 200 })
    } catch (error) {
        console.error("Error creating staff", error)
        return new NextResponse(JSON.stringify({ error: 'failed to create staff'}), {status: 500})
    }
}
