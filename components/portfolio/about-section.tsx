"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Target } from "lucide-react"

const educationData = [
  {
    degree: "MCA",
    institution: "RGPV University",
    icon: GraduationCap,
    color: "bg-primary",
  },
  {
    degree: "BCA",
    institution: "MCU Bhopal",
    icon: BookOpen,
    color: "bg-accent",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full border-3 border-border brutal-shadow-sm text-sm font-bold mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Know Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border-4 border-border brutal-shadow-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center border-3 border-border brutal-shadow-sm">
                <Target size={28} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Who I Am</h3>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Passionate Software Developer with experience in Java Web Development, 
              Spring Boot, JSP, Servlets, MySQL, REST APIs, and scalable web applications.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I love building robust backend systems and creating seamless user experiences. 
              My goal is to write clean, maintainable code that solves real-world problems 
              and makes a positive impact.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Problem Solver", "Team Player", "Quick Learner", "Detail Oriented"].map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-muted text-foreground text-sm font-bold rounded-xl border-2 border-border"
                >
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6">
            {educationData.map((edu, index) => {
              const Icon = edu.icon
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: -5 }}
                  className={`${edu.color} rounded-2xl border-4 border-border brutal-shadow p-6 brutal-hover`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center border-3 border-border brutal-shadow-sm">
                      <Icon size={32} className="text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary-foreground">{edu.degree}</h4>
                      <p className="text-primary-foreground/80 font-medium">{edu.institution}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl border-4 border-border brutal-shadow p-6"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { number: "10+", label: "Projects" },
                  { number: "1+", label: "Year Exp" },
                  { number: "5+", label: "Technologies" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
