import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated, isTokenValid } from "@/lib/auth"
import { deleteProject, getProjects, saveProject } from "@/lib/data-provider"
import { Project } from "@/lib/types"

export const dynamic = "force-dynamic"

function isAuthorized(req: NextRequest, isAuthed: boolean): boolean {
  if (isAuthed) return true
  const authHeader = req.headers.get("authorization")
  return isTokenValid(authHeader)
}

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error retrieving projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated()
  if (!isAuthorized(req, authed)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, subtitle, description, techStack, features, color, category, url, url2, sortOrder } = body

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const newProject: Project = {
      id: "proj_" + Date.now(),
      title,
      subtitle: subtitle || "",
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      features: Array.isArray(features) ? features : [],
      color: color || "bg-primary",
      category: category || "Full Stack",
      url: url || "",
      url2: url2 || "",
      sortOrder: typeof sortOrder === "number" ? sortOrder : Date.now(),
      createdAt: new Date().toISOString(),
    }

    const saved = await saveProject(newProject)
    return NextResponse.json(saved, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const authed = await isAuthenticated()
  if (!isAuthorized(req, authed)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, title, subtitle, description, techStack, features, color, category, url, url2, sortOrder } = body

    if (!id || !title || !description) {
      return NextResponse.json({ error: "ID, title and description are required" }, { status: 400 })
    }

    const updatedProject: Project = {
      id,
      title,
      subtitle: subtitle || "",
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      features: Array.isArray(features) ? features : [],
      color: color || "bg-primary",
      category: category || "Full Stack",
      url: url || "",
      url2: url2 || "",
      sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
    }

    const saved = await saveProject(updatedProject)
    return NextResponse.json(saved)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const authed = await isAuthenticated()
  if (!isAuthorized(req, authed)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    await deleteProject(id)
    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
