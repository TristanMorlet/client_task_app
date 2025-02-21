import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    const {email, role} = await req.json()

    if (!email) {
        return new NextResponse(
            JSON.stringify({error: "invalid email"}), {status: 400}
        );
    }

    const token = jwt.sign({email, role}, process.env.JWT_SECRET, {expiresIn: '5m'});
    console.log("Generated Token Payload", {email, role})
    console.log("Token:", token)
    return new NextResponse(
        JSON.stringify({token}), {status: 200}
    )
}