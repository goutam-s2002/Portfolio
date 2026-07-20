"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Layers, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "FinanceBuddy",
    subtitle: "Personal Finance Management System",
    description:
      "A comprehensive personal finance management system with role-based access control, financial dashboards, and analytics.",
    techStack: ["Java", "Spring Boot", "JSP", "HTML", "CSS", "JavaScript", "Maven"],
    features: [
      "Admin, Analyst, User roles",
      "Financial dashboards",
      "Charts and analytics",
      "CRUD operations",
      "PDF report generation",
    ],
    color: "bg-primary",
    category: "Full Stack",
    url: "https://github.com/goutam-s2002/FinanceBuddy",
    url2: "https://financebuddy-4i6l.onrender.com",
  },
   {
  id: 2, 
  title: "Banking System",
  subtitle: "Full Stack",
  description:
    "A comprehensive digital banking platform featuring secure JWT authentication, multi-account management, instant fund transfers, transaction histories, and dynamic statement exports.",
  techStack: [
    "React",
    "Spring Boot",
    "Spring Security",
    "JWT",
    "Spring Data JPA",
    "MySQL",
    "Bootstrap",
    "Docker"
  ],
  features: [
    "Secure JWT auth with silent access token refresh",
    "Checking & Savings account management",
    "Instant fund transfers, deposits & withdrawals",
    "Full bank statements exportable to CSV, Excel, Word & PDF",
    "Role-based access control (Admin & User portals) with audit logs",
  ],
  color: "bg-primary",
  category: "Full Stack",
  url: "https://github.com/goutam-s2002/Banking-System-Backend", 
  url2: "https://bankingsystems.netlify.app" 
},

  {
    id: 3,
    title: "Hostel Management System",
    subtitle: "Student & Fee Management",
    description:
      "A complete hostel management solution with student management, fee tracking, and real-time updates.",
    techStack: ["Java", "JSP", "Servlets", "AJAX", "JDBC", "MySQL"],
    features: [
      "Student management",
      "Fee tracking",
      "CRUD operations",
      "Real-time AJAX updates",
    ],
    color: "bg-accent",
    category: "Full Stack",
    url: "https://github.com/goutam-s2002/Hostel-Management-System",
    url2: "https://github.com/goutam-s2002/Hostel-Management-System",
  },
 
]

const categories = ["All", "Full Stack", "Backend", "Frontend"]

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full border-3 border-border brutal-shadow-sm text-sm font-bold mb-4">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            My Recent Work
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 font-bold rounded-xl border-3 border-border transition-all brutal-shadow-sm brutal-hover brutal-press ${activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`${project.color} rounded-3xl border-4 border-border brutal-shadow-lg overflow-hidden brutal-hover`}
                >
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center border-3 border-border brutal-shadow-sm">
                        <Layers size={28} className="text-foreground" />
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border-2 border-border brutal-shadow-sm"
                        >
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={18} className="text-foreground" />
                          </a>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border-2 border-border brutal-shadow-sm"
                        >
                          <a
                            href={project.url2}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                             <ExternalLink size={18} className="text-foreground" />
                          </a>
                         
                        </motion.button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-primary-foreground/80 font-medium mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-card text-foreground text-xs font-bold rounded-full border-2 border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Features */}
                  <div className="bg-card border-t-4 border-border">
                    <button
                      onClick={() =>
                        setExpandedProject(
                          expandedProject === project.id ? null : project.id
                        )
                      }
                      className="w-full px-6 py-4 flex items-center justify-between text-foreground font-bold hover:bg-muted/50 transition-colors"
                    >
                      <span>Key Features</span>
                      <motion.div
                        animate={{ rotate: expandedProject === project.id ? 90 : 0 }}
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="px-6 pb-6 space-y-2">
                            {project.features.map((feature, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
