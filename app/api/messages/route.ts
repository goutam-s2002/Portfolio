import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { isAuthenticated, isTokenValid } from "@/lib/auth"

const MESSAGES_FILE_PATH = path.join(process.cwd(), "data", "contact-messages.json")

function isAuthorized(req: NextRequest, isAuthed: boolean): boolean {
  if (isAuthed) return true
  const authHeader = req.headers.get("authorization")
  return isTokenValid(authHeader)
}

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated()
  if (!isAuthorized(req, authed)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        return NextResponse.json(data)
      }
    }
  }

  try {
    if (fs.existsSync(MESSAGES_FILE_PATH)) {
      const raw = fs.readFileSync(MESSAGES_FILE_PATH, "utf-8")
      return NextResponse.json(JSON.parse(raw))
    }
  } catch {}

  return NextResponse.json([])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newMsg = {
      id: "msg_" + Date.now(),
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin()
      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert([newMsg])
        if (error) {
          console.warn("Supabase insert message error:", error.message)
        }
      }
    }

    try {
      let list = []
      if (fs.existsSync(MESSAGES_FILE_PATH)) {
        list = JSON.parse(fs.readFileSync(MESSAGES_FILE_PATH, "utf-8"))
      }
      list.unshift(newMsg)
      fs.writeFileSync(MESSAGES_FILE_PATH, JSON.stringify(list, null, 2))
    } catch {}

    return NextResponse.json({ success: true, message: "Message received successfully!" })
  } catch (error) {
    console.error("Error submitting contact message:", error)
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
  }
}
