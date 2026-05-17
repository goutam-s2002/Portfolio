"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react"

const experienceData = [
  {
    title: "Java Developer Intern",
    company: "Madss Software Solution Pvt Ltd",
    period: "Dec 2023 – Feb 2025",
    location: "Indore, India",
    description: "Developed 10+ web applications using Java, JSP, Servlets, and MySQL.",
    achievements: [
      "Built scalable web applications using Java and Servlets",
      "Implemented RESTful APIs for various client projects",
      "Collaborated with team members on agile development processes",
      "Optimized database queries for better performance",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full border-3 border-border brutal-shadow-sm text-sm font-bold mb-4">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            My Work Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border transform md:-translate-x-1/2" />

          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-start gap-8 mb-12`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-border brutal-shadow-sm transform -translate-x-1/2 z-10 flex items-center justify-center">
                <Briefcase size={14} className="text-primary-foreground" />
              </div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-2xl border-4 border-border brutal-shadow p-6 brutal-hover"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center border-3 border-border brutal-shadow-sm flex-shrink-0">
                      <Briefcase size={28} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                      <p className="text-lg font-semibold text-primary">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg border-2 border-border text-sm font-bold">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted text-foreground rounded-lg border-2 border-border text-sm font-bold">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: achIndex * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
