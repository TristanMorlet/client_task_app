import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";


export async function DELETE(req, {params}){
    try {
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({error: "User ID not found"}), {status: 400})
        }

        const toBeDeleted = await db.Users.findByPk(id);
        if (!toBeDeleted) {
            return new NextResponse(JSON.stringify({error: "User not found"}), {status: 404})
        }

        await toBeDeleted.destroy();

        return new NextResponse(JSON.stringify({message: "User Deleted"}), {status: 200})
    } catch (err) {
        console.error("Error deleting user", err)
        return new NextResponse(JSON.stringify({error: "Failed to delete user"}), {status: 500})
    }
}