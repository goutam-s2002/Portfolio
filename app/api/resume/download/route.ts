import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getResumeInfo } from "@/lib/data-provider"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const resumeInfo = await getResumeInfo()
    const url = resumeInfo?.url || "/resume/goutam-soni-resume.pdf"
    const filename = resumeInfo?.filename || "Goutam_Soni_Resume.pdf"
    const cleanDownloadName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`

    // Case 1: Remote Supabase Storage or external URL
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch remote PDF: ${response.statusText}`)
      }

      const fileBuffer = await response.arrayBuffer()

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${cleanDownloadName}"`,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      })
    }

    // Case 2: Local file in public/
    const relativePath = url.startsWith("/") ? url.slice(1) : url
    const localFilePath = path.join(process.cwd(), "public", relativePath)

    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath)
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${cleanDownloadName}"`,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      })
    }

    // Fallback: Default local resume
    const defaultResumePath = path.join(process.cwd(), "public", "resume", "goutam-soni-resume.pdf")
    if (fs.existsSync(defaultResumePath)) {
      const fileBuffer = fs.readFileSync(defaultResumePath)
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="Goutam_Soni_Resume.pdf"',
          "Cache-Control": "public, max-age=60",
        },
      })
    }

    return new NextResponse("Resume file not found", { status: 404 })
  } catch (error) {
    console.error("Secure resume proxy error:", error)
    return new NextResponse("Error serving resume", { status: 500 })
  }
}
