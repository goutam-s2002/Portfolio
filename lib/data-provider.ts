import fs from "fs"
import path from "path"
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase"
import { PortfolioData, Project, ResumeSettings } from "./types"

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-data.json")

function readLocalData(): PortfolioData {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return {
        resume: {
          url: "/resume/goutam-soni-resume.pdf",
          filename: "goutam-soni-resume.pdf",
          updatedAt: new Date().toISOString(),
        },
        projects: [],
      }
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8")
    return JSON.parse(raw) as PortfolioData
  } catch (error) {
    console.error("Error reading local portfolio data:", error)
    return {
      resume: {
        url: "/resume/goutam-soni-resume.pdf",
        filename: "goutam-soni-resume.pdf",
        updatedAt: new Date().toISOString(),
      },
      projects: [],
    }
  }
}

function writeLocalData(data: PortfolioData): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8")
  } catch (error) {
    console.error("Error writing local portfolio data:", error)
  }
}

function mapDbProjectToApp(row: Record<string, unknown>): Project {
  return {
    id: (row.id as string) || String(row.sort_order),
    title: (row.title as string) || "",
    subtitle: (row.subtitle as string) || "",
    description: (row.description as string) || "",
    techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    features: Array.isArray(row.features) ? row.features : [],
    color: (row.color as string) || "bg-primary",
    category: (row.category as string) || "Full Stack",
    url: (row.url as string) || "",
    url2: (row.url2 as string) || "",
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
    createdAt: (row.created_at as string) || new Date().toISOString(),
  }
}

function mapAppProjectToDb(p: Project): Record<string, unknown> {
  return {
    id: String(p.id),
    title: p.title,
    subtitle: p.subtitle || "",
    description: p.description,
    tech_stack: p.techStack || [],
    features: p.features || [],
    color: p.color || "bg-primary",
    category: p.category || "Full Stack",
    url: p.url || "",
    url2: p.url2 || "",
    sort_order: p.sortOrder ?? 0,
    updated_at: new Date().toISOString(),
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      try {
        const [projectsRes, settingsRes] = await Promise.all([
          supabase.from("projects").select("*").order("sort_order", { ascending: true }),
          supabase.from("portfolio_settings").select("value").eq("key", "resume").single(),
        ])

        if (!projectsRes.error && projectsRes.data) {
          const projects = projectsRes.data.map(mapDbProjectToApp)
          let resume: ResumeSettings = {
            url: "/resume/goutam-soni-resume.pdf",
            filename: "goutam-soni-resume.pdf",
            updatedAt: new Date().toISOString(),
          }

          if (!settingsRes.error && settingsRes.data?.value) {
            resume = settingsRes.data.value as ResumeSettings
          }

          return { resume, projects }
        }
      } catch (err) {
        console.warn("Supabase query failed, falling back to local storage:", err)
      }
    }
  }

  return readLocalData()
}

export async function getProjects(): Promise<Project[]> {
  const data = await getPortfolioData()
  return data.projects
}

export async function saveProject(project: Project): Promise<Project> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const dbRow = mapAppProjectToDb(project)
      const { data, error } = await supabase
        .from("projects")
        .upsert(dbRow, { onConflict: "id" })
        .select()
        .single()

      if (error) {
        throw new Error(`Supabase save error: ${error.message}`)
      }
      return mapDbProjectToApp(data)
    }
  }

  const local = readLocalData()
  const existingIdx = local.projects.findIndex((p) => String(p.id) === String(project.id))
  if (existingIdx >= 0) {
    local.projects[existingIdx] = { ...local.projects[existingIdx], ...project }
  } else {
    local.projects.push(project)
  }
  writeLocalData(local)
  return project
}

export async function deleteProject(id: string | number): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const { error } = await supabase.from("projects").delete().eq("id", String(id))
      if (error) {
        throw new Error(`Supabase delete error: ${error.message}`)
      }
      return true
    }
  }

  const local = readLocalData()
  const filtered = local.projects.filter((p) => String(p.id) !== String(id))
  local.projects = filtered
  writeLocalData(local)
  return true
}

export async function getResumeInfo(): Promise<ResumeSettings> {
  const data = await getPortfolioData()
  return data.resume
}

export async function updateResumeInfo(resume: Partial<ResumeSettings>): Promise<ResumeSettings> {
  const current = await getResumeInfo()
  const updated: ResumeSettings = {
    ...current,
    ...resume,
    updatedAt: new Date().toISOString(),
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const { error } = await supabase
        .from("portfolio_settings")
        .upsert({ key: "resume", value: updated, updated_at: new Date().toISOString() }, { onConflict: "key" })

      if (error) {
        throw new Error(`Supabase settings update error: ${error.message}`)
      }
      return updated
    }
  }

  const local = readLocalData()
  local.resume = updated
  writeLocalData(local)
  return updated
}
