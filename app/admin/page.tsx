"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  LogOut,
  FolderPlus,
  FileText,
  Upload,
  ExternalLink,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Cloud,
  Home,
  Save,
  X,
  Plus,
  RefreshCw,
  Github,
  Globe,
  Layers,
  Copy,
  Check,
  MessageSquare,
  Mail,
  User,
  Calendar,
  MailIcon,
} from "lucide-react"
import { toast } from "sonner"
import { Project, ResumeSettings } from "@/lib/types"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"

const COLOR_OPTIONS = [
  { label: "Primary Blue", value: "bg-primary" },
  { label: "Accent Pink", value: "bg-accent" },
  { label: "Secondary Yellow", value: "bg-secondary" },
  { label: "Emerald Teal", value: "bg-emerald-500" },
  { label: "Purple", value: "bg-purple-600" },
]

const CATEGORY_OPTIONS = ["Full Stack", "Backend", "Frontend", "Mobile", "DevOps"]

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  // Data state
  const [activeTab, setActiveTab] = useState<"projects" | "resume" | "messages" | "deployment">("projects")
  const [projects, setProjects] = useState<Project[]>([])
  const [resume, setResume] = useState<ResumeSettings | null>(null)
  const [availableFiles, setAvailableFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isSupabase, setIsSupabase] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  // Project Modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formTitle, setFormTitle] = useState("")
  const [formSubtitle, setFormSubtitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formTechStack, setFormTechStack] = useState("")
  const [formFeatures, setFormFeatures] = useState("")
  const [formCategory, setFormCategory] = useState("Full Stack")
  const [formColor, setFormColor] = useState("bg-primary")
  const [formUrl, setFormUrl] = useState("")
  const [formUrl2, setFormUrl2] = useState("")
  const [savingProject, setSavingProject] = useState(false)

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Resume Upload / URL state
  const [customResumeUrl, setCustomResumeUrl] = useState("")
  const [uploadingResume, setUploadingResume] = useState(false)
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null)
  const [copiedSql, setCopiedSql] = useState(false)

  const getAuthHeaders = (): Record<string, string> => {
    if (typeof window === "undefined") return {}
    const token = localStorage.getItem("portfolio_admin_token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Check auth on load
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth", {
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchData()
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoadingData(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setAuthLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        if (data.token) {
          localStorage.setItem("portfolio_admin_token", data.token)
        }
        toast.success("Welcome to Admin Dashboard!")
        setIsAuthenticated(true)
        fetchData()
      } else {
        toast.error(data.error || "Invalid password")
      }
    } catch {
      toast.error("Failed to authenticate")
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      localStorage.removeItem("portfolio_admin_token")
      setIsAuthenticated(false)
      toast.info("Logged out")
    } catch {
      toast.error("Failed to logout")
    }
  }

  const fetchData = async () => {
    setLoadingData(true)
    try {
      const authHeaders = getAuthHeaders()
      const [projRes, resumeRes, msgRes] = await Promise.all([
        fetch("/api/projects", { headers: authHeaders }),
        fetch("/api/resume", { headers: authHeaders }),
        fetch("/api/messages", { headers: authHeaders }).catch(() => null),
      ])
      if (projRes.ok) {
        const projData = await projRes.json()
        setProjects(projData)
      }
      if (resumeRes.ok) {
        const resData = await resumeRes.json()
        setResume(resData.resume)
        setAvailableFiles(resData.availableFiles || [])
        setIsSupabase(resData.isSupabase)
      }
      if (msgRes && msgRes.ok) {
        const msgData = await msgRes.json()
        setMessages(msgData)
      }
    } catch {
      toast.error("Error loading portfolio data")
    } finally {
      setLoadingData(false)
    }
  }

  // Project Modal Actions
  const openNewProjectModal = () => {
    setEditingProject(null)
    setFormTitle("")
    setFormSubtitle("")
    setFormDescription("")
    setFormTechStack("React, Next.js, TypeScript")
    setFormFeatures("Feature 1\nFeature 2\nFeature 3")
    setFormCategory("Full Stack")
    setFormColor("bg-primary")
    setFormUrl("")
    setFormUrl2("")
    setIsProjectModalOpen(true)
  }

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj)
    setFormTitle(proj.title)
    setFormSubtitle(proj.subtitle || "")
    setFormDescription(proj.description)
    setFormTechStack(proj.techStack ? proj.techStack.join(", ") : "")
    setFormFeatures(proj.features ? proj.features.join("\n") : "")
    setFormCategory(proj.category || "Full Stack")
    setFormColor(proj.color || "bg-primary")
    setFormUrl(proj.url || "")
    setFormUrl2(proj.url2 || "")
    setIsProjectModalOpen(true)
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim() || !formDescription.trim()) {
      toast.error("Title and description are required")
      return
    }

    setSavingProject(true)
    const techStackArray = formTechStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const featuresArray = formFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)

    const payload = {
      id: editingProject ? editingProject.id : undefined,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      description: formDescription.trim(),
      techStack: techStackArray,
      features: featuresArray,
      category: formCategory,
      color: formColor,
      url: formUrl.trim(),
      url2: formUrl2.trim(),
      sortOrder: editingProject ? editingProject.sortOrder : projects.length + 1,
    }

    try {
      const res = await fetch("/api/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(editingProject ? "Project updated!" : "Project created!")
        setIsProjectModalOpen(false)
        fetchData()
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to save project")
      }
    } catch {
      toast.error("Network error while saving project")
    } finally {
      setSavingProject(false)
    }
  }

  const handleDeleteProject = async (id: string | number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      if (res.ok) {
        toast.success("Project deleted!")
        setProjects((prev) => prev.filter((p) => p.id !== id))
      } else {
        toast.error("Failed to delete project")
      }
    } catch {
      toast.error("Network error while deleting project")
    }
  }

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= projects.length) return

    const newProjects = [...projects]
    const [moved] = newProjects.splice(index, 1)
    newProjects.splice(targetIdx, 0, moved)

    const updated = newProjects.map((p, idx) => ({ ...p, sortOrder: idx + 1 }))
    setProjects(updated)

    try {
      await Promise.all(
        updated.map((proj) =>
          fetch("/api/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify(proj),
          })
        )
      )
      toast.success("Order updated!")
    } catch {
      toast.error("Failed to update order")
    }
  }

  // Resume Actions
  const handleUploadResumeFile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPdfFile) {
      toast.error("Please select a PDF file first")
      return
    }

    setUploadingResume(true)
    const formData = new FormData()
    formData.append("file", selectedPdfFile)

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("Resume uploaded and updated successfully!")
        setResume(data.resume)
        setSelectedPdfFile(null)
        fetchData()
      } else {
        toast.error(data.error || "Upload failed")
      }
    } catch {
      toast.error("Failed to upload resume")
    } finally {
      setUploadingResume(false)
    }
  }

  const handleSetResumeUrl = async (urlToSet: string) => {
    if (!urlToSet.trim()) {
      toast.error("Please enter a valid URL")
      return
    }

    setUploadingResume(true)
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ url: urlToSet }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("Resume URL updated!")
        setResume(data.resume)
        setCustomResumeUrl("")
        fetchData()
      } else {
        toast.error(data.error || "Failed to update resume")
      }
    } catch {
      toast.error("Network error updating resume")
    } finally {
      setUploadingResume(false)
    }
  }

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Loading Screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="flex items-center gap-3 font-bold text-lg">
          <RefreshCw className="animate-spin text-primary" />
          Loading Admin Portal...
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground mx-auto flex items-center justify-center border-3 border-border brutal-shadow-sm mb-4">
              <Lock size={30} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Manage your projects and resume from anywhere
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-background border-3 border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary brutal-shadow-sm"
                autoFocus
              />

            </div>

            <motion.button
              type="submit"
              disabled={authLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Unlock Dashboard
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home size={16} /> Return to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // ----------------------------------------------------
  // DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-card border-b-4 border-border px-4 sm:px-8 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center border-2 border-border brutal-shadow-sm"
            >
              <Layers size={22} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Goutam Soni</h1>
                <span className="px-2 py-0.5 text-xs font-bold bg-secondary text-secondary-foreground rounded border border-border">
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Portfolio Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}


            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-card text-foreground font-bold text-sm rounded-xl border-2 border-border brutal-shadow-sm brutal-hover flex items-center gap-1.5"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-destructive text-destructive-foreground font-bold text-sm rounded-xl border-2 border-border brutal-shadow-sm brutal-hover flex items-center gap-1.5"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-bold rounded-xl border-3 border-border transition-all brutal-shadow-sm brutal-hover ${activeTab === "projects"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              <FolderPlus size={18} />
              Manage Projects ({projects.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`px-6 py-3 font-bold rounded-xl border-3 border-border transition-all brutal-shadow-sm brutal-hover ${activeTab === "resume"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Manage Resume
            </span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 font-bold rounded-xl border-3 border-border transition-all brutal-shadow-sm brutal-hover ${activeTab === "messages"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={18} />
              Messages ({messages.length})
            </span>
          </button>


          <div className="ml-auto">
            <button
              onClick={fetchData}
              disabled={loadingData}
              className="px-4 py-3 bg-card text-foreground font-bold rounded-xl border-2 border-border brutal-shadow-sm brutal-hover flex items-center gap-2 text-sm"
              title="Refresh Data"
            >
              <RefreshCw className={loadingData ? "animate-spin" : ""} size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: PROJECTS MANAGEMENT */}
        {/* ---------------------------------------------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border-3 border-border brutal-shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full">
                <input
                  type="text"
                  placeholder="Search projects by title, tech, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-background border-2 border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 bg-background border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="All">All Categories</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                onClick={openNewProjectModal}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl border-2 border-border brutal-shadow-sm brutal-hover flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add New Project
              </motion.button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-card rounded-3xl border-4 border-border brutal-shadow p-12 text-center">
                <Layers className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {searchQuery ? "Try refining your search query" : "Start by adding your first project!"}
                </p>
                <button
                  onClick={openNewProjectModal}
                  className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl border-2 border-border brutal-shadow-sm brutal-hover"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className={`${proj.color || "bg-primary"} rounded-3xl border-4 border-border brutal-shadow-lg overflow-hidden flex flex-col justify-between`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span className="px-3 py-1 bg-card text-foreground rounded-full text-xs font-bold border-2 border-border">
                          {proj.category || "Full Stack"}
                        </span>

                        <div className="flex items-center gap-1.5 bg-card px-2 py-1 rounded-xl border-2 border-border brutal-shadow-sm">
                          <button
                            onClick={() => handleMoveOrder(idx, "up")}
                            disabled={idx === 0}
                            title="Move Up"
                            className="p-1 text-foreground hover:text-primary disabled:opacity-30"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(idx, "down")}
                            disabled={idx === projects.length - 1}
                            title="Move Down"
                            className="p-1 text-foreground hover:text-primary disabled:opacity-30"
                          >
                            <ArrowDown size={16} />
                          </button>
                          <span className="text-xs font-bold px-1 text-muted-foreground">
                            #{idx + 1}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                        {proj.title}
                      </h3>
                      {proj.subtitle && (
                        <p className="text-primary-foreground/90 font-medium text-sm mb-3">
                          {proj.subtitle}
                        </p>
                      )}
                      <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
                        {proj.description}
                      </p>

                      {proj.techStack && proj.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 bg-card text-foreground text-xs font-bold rounded-full border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.features && proj.features.length > 0 && (
                        <div className="bg-card/90 rounded-xl p-3 border-2 border-border mb-4 text-xs space-y-1">
                          <p className="font-bold text-foreground">Features ({proj.features.length}):</p>
                          {proj.features.slice(0, 3).map((f, i) => (
                            <p key={i} className="text-muted-foreground truncate">
                              • {f}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-card border-t-4 border-border p-4 flex items-center justify-between gap-3">
                      <div className="flex gap-2">
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background text-foreground border-2 border-border hover:bg-muted"
                            title="GitHub URL"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {proj.url2 && (
                          <a
                            href={proj.url2}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background text-foreground border-2 border-border hover:bg-muted"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditProjectModal(proj)}
                          className="px-3.5 py-1.5 bg-secondary text-secondary-foreground font-bold text-xs rounded-lg border-2 border-border brutal-shadow-sm brutal-hover flex items-center gap-1.5"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="px-3.5 py-1.5 bg-destructive text-destructive-foreground font-bold text-xs rounded-lg border-2 border-border brutal-shadow-sm brutal-hover flex items-center gap-1.5"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: RESUME MANAGEMENT */}
        {/* ---------------------------------------------------- */}
        {activeTab === "resume" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center border-3 border-border brutal-shadow-sm">
                  <FileText size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Current Active Resume</h2>
                  <p className="text-sm text-muted-foreground">
                    Connected to the "Download Resume" button on your homepage
                  </p>
                </div>
              </div>

              {resume ? (
                <div className="space-y-4">
                  <div className="bg-background rounded-2xl border-3 border-border p-5 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">File Name</span>
                      <p className="text-lg font-bold text-foreground truncate">{resume.filename}</p>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">Active URL / Path</span>
                      <p className="text-xs font-mono text-primary truncate bg-card p-2 rounded-lg border border-border mt-1">
                        {resume.url}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">Last Updated</span>
                      <p className="text-sm text-foreground">
                        {new Date(resume.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/api/resume/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow-sm brutal-hover text-center flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      Preview / Download (Secure)
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No active resume configured.</p>
              )}

              {availableFiles.length > 0 && (
                <div className="mt-8 pt-6 border-t-3 border-border">
                  <h3 className="text-sm font-bold text-foreground mb-3">
                    Choose from existing uploaded resumes ({availableFiles.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableFiles.map((file) => (
                      <button
                        key={file}
                        onClick={() => handleSetResumeUrl(`/resume/${file}`)}
                        className={`px-3 py-1.5 rounded-lg border-2 border-border text-xs font-bold transition-all ${resume?.url === `/resume/${file}`
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
                          }`}
                      >
                        {file}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center border-2 border-border">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Upload New PDF Resume</h3>
                    <p className="text-xs text-muted-foreground">
                      {isSupabase
                        ? "Uploads directly to your Supabase Storage bucket 'resumes'"
                        : "Uploads to server storage"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUploadResumeFile} className="space-y-4">
                  <div className="border-3 border-dashed border-border rounded-2xl p-6 text-center bg-background hover:bg-muted/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      id="resume-file-input"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedPdfFile(e.target.files[0])
                        }
                      }}
                    />
                    <label
                      htmlFor="resume-file-input"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <FileText size={36} className="text-primary" />
                      <span className="font-bold text-sm text-foreground">
                        {selectedPdfFile ? selectedPdfFile.name : "Click to select a .pdf resume"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedPdfFile
                          ? `${(selectedPdfFile.size / 1024).toFixed(1)} KB`
                          : "Supports any PDF file up to 10MB"}
                      </span>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!selectedPdfFile || uploadingResume}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-accent text-accent-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploadingResume ? (
                      <>
                        <RefreshCw className="animate-spin" size={18} />
                        Uploading to {isSupabase ? "Supabase Storage" : "Server"}...
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        Upload & Make Active
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              <div className="bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center border-2 border-border">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Or Set Custom Resume URL</h3>
                    <p className="text-xs text-muted-foreground">
                      Google Drive link, Cloudinary, AWS S3, or direct PDF URL
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={customResumeUrl}
                    onChange={(e) => setCustomResumeUrl(e.target.value)}
                    className="flex-1 px-4 py-3 bg-background border-2 border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => handleSetResumeUrl(customResumeUrl)}
                    disabled={!customResumeUrl.trim() || uploadingResume}
                    className="px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl border-2 border-border brutal-shadow-sm brutal-hover disabled:opacity-50"
                  >
                    Set URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: CONTACT MESSAGES */}
        {/* ---------------------------------------------------- */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border-3 border-border brutal-shadow-sm p-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Received Messages</h2>
                <p className="text-sm text-muted-foreground">
                  Inquiries submitted through your portfolio contact form
                </p>
              </div>
              <span className="px-4 py-2 bg-primary text-primary-foreground font-bold text-sm rounded-xl border-2 border-border brutal-shadow-sm">
                Total: {messages.length}
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="bg-card rounded-3xl border-4 border-border brutal-shadow p-12 text-center">
                <MessageSquare className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">No messages yet</h3>
                <p className="text-muted-foreground text-sm">
                  Messages submitted by visitors through the contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-card rounded-2xl border-3 border-border brutal-shadow-sm p-6 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-border pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold border-2 border-border">
                          <User size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-lg">{msg.name}</h4>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                          >
                            <Mail size={12} /> {msg.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(msg.created_at).toLocaleString()}
                        </span>

                        <a
                          href={`mailto:${msg.email}?subject=${encodeURIComponent(msg.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-lg border-2 border-border brutal-shadow-sm flex items-center gap-1.5"
                        >
                          <MailIcon size={14} />
                          Mail
                        </a>
                      </div>
                    </div>

                    <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap bg-background p-4 rounded-xl border-2 border-border">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


      </main>

      {/* ---------------------------------------------------- */}
      {/* ADD / EDIT PROJECT MODAL */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-2xl rounded-3xl border-4 border-border brutal-shadow-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center border-2 border-border">
                    <FolderPlus size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 rounded-xl bg-background text-foreground border-2 border-border hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FinanceBuddy"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Personal Finance Management System"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what the project does..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Java, Spring Boot, MySQL, React"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formTechStack
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 bg-muted text-foreground text-xs font-bold rounded-full border border-border"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Key Features (one per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Admin, Analyst, User roles&#10;Financial dashboards"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formUrl2}
                      onChange={(e) => setFormUrl2(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-2">
                    Card Background Color Theme
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map((col) => (
                      <button
                        type="button"
                        key={col.value}
                        onClick={() => setFormColor(col.value)}
                        className={`px-4 py-2 rounded-xl border-2 border-border text-xs font-bold transition-all flex items-center gap-2 ${formColor === col.value
                          ? "ring-2 ring-primary ring-offset-2 scale-105"
                          : "opacity-80 hover:opacity-100"
                          } ${col.value} text-white`}
                      >
                        {formColor === col.value && <Check size={14} />}
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t-2 border-border">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-6 py-3 bg-muted text-foreground font-bold rounded-xl border-2 border-border hover:bg-muted/80"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={savingProject}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover flex items-center gap-2"
                  >
                    {savingProject ? (
                      <>
                        <RefreshCw className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Project
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
