import {jwtDecode} from 'jwt-decode'


export async function loginUser(email, role) {
    const response = await fetch("api/auth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, role })
    });

    if (!response.ok) {
        throw new Error("Login Failed")
    }
    console.log("LoginUser result", response)
    return response.json()
}

export function verifyToken(token) {
    try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        return decodedToken
    } catch (error) {
        console.error("Token verification failed", error)
        return null;
    }
}