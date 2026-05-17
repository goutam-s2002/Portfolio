"use client"

import { motion } from "framer-motion"
import { Code, Database, Wrench, Layout } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap", "jQuery", "AJAX"],
  },
  {
    title: "Backend",
    icon: Code,
    color: "bg-primary",
    textColor: "text-primary-foreground",
    skills: ["Java", "JSP", "Servlets", "JDBC", "Spring Boot", "REST APIs"],
  },
  {
    title: "Database",
    icon: Database,
    color: "bg-accent",
    textColor: "text-accent-foreground",
    skills: ["MySQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "bg-card",
    textColor: "text-foreground",
    skills: ["Eclipse", "VS Code", "Git", "Maven"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full border-3 border-border brutal-shadow-sm text-sm font-bold mb-4">
            My Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Technologies I Work With
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${category.color} rounded-2xl border-4 border-border brutal-shadow p-6 brutal-hover`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border-3 border-border brutal-shadow-sm">
                    <Icon size={24} className="text-foreground" />
                  </div>
                  <h3 className={`text-xl font-bold ${category.textColor}`}>
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-2 bg-card text-foreground text-sm font-bold rounded-lg border-2 border-border brutal-shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Skill Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Proficiency Level</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Java & Spring Boot", level: 85, color: "bg-primary" },
              { name: "JSP & Servlets", level: 80, color: "bg-accent" },
              { name: "MySQL & JDBC", level: 75, color: "bg-secondary" },
              { name: "HTML/CSS/JavaScript", level: 70, color: "bg-primary" },
            ].map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-foreground">{skill.name}</span>
                  <span className="font-bold text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full border-2 border-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${skill.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
