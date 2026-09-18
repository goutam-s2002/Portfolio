import { NextRequest, NextResponse } from "next/server"
import { createSessionToken, isAuthenticated, verifyPassword, isTokenValid, SESSION_COOKIE_NAME } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader && isTokenValid(authHeader)) {
    return NextResponse.json({ authenticated: true })
  }

  const authenticated = await isAuthenticated()
  return NextResponse.json({ authenticated })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password } = body

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = createSessionToken(password)
    if (!token) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const response = NextResponse.json({ success: true, message: "Authenticated successfully", token })

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 14, // 14 days
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" })
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })
  return response
}
