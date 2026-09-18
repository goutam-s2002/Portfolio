import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { isAuthenticated, isTokenValid } from "@/lib/auth"
import { getResumeInfo, updateResumeInfo } from "@/lib/data-provider"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export const dynamic = "force-dynamic"

function isAuthorized(req: NextRequest, isAuthed: boolean): boolean {
  if (isAuthed) return true
  const authHeader = req.headers.get("authorization")
  return isTokenValid(authHeader)
}

export async function GET() {
  try {
    const resume = await getResumeInfo()

    let availableFiles: string[] = []
    try {
      const resumeDir = path.join(process.cwd(), "public", "resume")
      if (fs.existsSync(resumeDir)) {
        availableFiles = fs
          .readdirSync(resumeDir)
          .filter((file) => file.toLowerCase().endsWith(".pdf"))
      }
    } catch {}

    return NextResponse.json({
      resume,
      availableFiles,
      isSupabase: isSupabaseConfigured(),
    })
  } catch (error) {
    console.error("Error retrieving resume info:", error)
    return NextResponse.json({ error: "Failed to get resume info" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated()
  if (!isAuthorized(req, authed)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    try {
      const body = await req.json()
      const { url, filename } = body

      if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 })
      }

      const updated = await updateResumeInfo({
        url,
        filename: filename || url.split("/").pop() || "resume.pdf",
      })

      return NextResponse.json({ success: true, resume: updated })
    } catch (error) {
      console.error("Error updating resume URL:", error)
      return NextResponse.json({ error: "Failed to update resume URL" }, { status: 500 })
    }
  }

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData()
      const file = formData.get("file") as File | null

      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
      }

      if (!file.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const uniqueFileName = `${Date.now()}-${cleanFileName}`

      if (isSupabaseConfigured()) {
        const supabase = getSupabaseAdmin()
        if (supabase) {
          await supabase.storage.createBucket("resumes", { public: true }).catch(() => {})

          const { error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(uniqueFileName, buffer, {
              contentType: "application/pdf",
              upsert: true,
            })

          if (uploadError) {
            console.error("Supabase Storage upload error:", uploadError)
            return NextResponse.json(
              { error: `Supabase Storage upload failed: ${uploadError.message}` },
              { status: 500 }
            )
          }

          const { data: publicUrlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(uniqueFileName)

          const updated = await updateResumeInfo({
            url: publicUrlData.publicUrl,
            filename: file.name,
          })

          return NextResponse.json({ success: true, resume: updated })
        }
      }

      const uploadDir = path.join(process.cwd(), "public", "resume")
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const localFilePath = path.join(uploadDir, uniqueFileName)
      fs.writeFileSync(localFilePath, buffer)

      const resumeUrl = `/resume/${uniqueFileName}`
      const updated = await updateResumeInfo({
        url: resumeUrl,
        filename: file.name,
      })

      return NextResponse.json({ success: true, resume: updated })
    } catch (error) {
      console.error("Error processing file upload:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Unsupported content type" }, { status: 400 })
}
