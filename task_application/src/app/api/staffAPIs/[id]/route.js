import db from "../../../../lib/db/models";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}){
    try {
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({error: "Staff ID not found"}), {status: 400})
        }

        const toBeDeleted = await db.Staff.findByPk(id);
        if (!toBeDeleted) {
            return new NextResponse(JSON.stringify({error: "Staff not found"}), {status: 404})
        }

        await toBeDeleted.destroy();

        return new NextResponse(JSON.stringify({message: "Staff Deleted"}), {status: 200})
    } catch (err) {
        console.error("Error deleting task", err)
        return new NextResponse(JSON.stringify({error: "Failed to delete Staff"}), {status: 500})
    }
}

export async function PATCH(req, { params }){
    try {
        const { id } = await params
        const updates = await req.json()

        const staff = await db.Staff.findByPk(id)
        if (!staff) {
            return new NextResponse(JSON.stringify({error: "could not find staff"}, {status: 404}))
        }

        Object.keys(updates).forEach((key) => {
            if (key in staff) {
                staff[key] = updates[key]
            }
        })

        await staff.save()

        return new NextResponse(JSON.stringify({message: "Staff updated successfully"}), staff)
    } catch (err) {
        console.error("Error updating staff", err)
        return new NextResponse(JSON.stringify({message: "Error updating staff", err}), {status: 500})
    }
}