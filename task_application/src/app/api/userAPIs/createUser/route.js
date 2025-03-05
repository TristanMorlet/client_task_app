import { Next } from "react-bootstrap/esm/PageItem";
import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const userData = await req.json()
        console.log(userData)
        const newUser = await db.Users.create(userData)
        return new NextResponse(JSON.stringify(newUser), {status: 200})
    } catch (error) {
        console.error("failed to create user", error)
        return new NextResponse(JSON.stringify({error: "failed to create user" }), {status: 500})
    }
}