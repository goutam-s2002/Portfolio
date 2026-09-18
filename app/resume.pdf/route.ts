import { NextRequest } from "next/server"
import { GET as handleResumeDownload } from "@/app/api/resume/download/route"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  return handleResumeDownload(req)
}
