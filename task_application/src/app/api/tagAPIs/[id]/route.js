import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}){
    try {
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({error: "Tag ID not found"}), {status: 400})
        }

        const toBeDeleted = await db.Tag.findByPk(id);
        if (!toBeDeleted) {
            return new NextResponse(JSON.stringify({error: "Tag not found"}), {status: 404})
        }

        await toBeDeleted.destroy();

        return new NextResponse(JSON.stringify({message: "Tag Deleted"}), {status: 200})
    } catch (err) {
        console.error("Error deleting tag", err)
        return new NextResponse(JSON.stringify({error: "Failed to delete tag"}), {status: 500})
    }
}