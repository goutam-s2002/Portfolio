"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight, Code2, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const titles = [
   "Software Developer",
  "Backend Engineer Java",
  "Spring Boot Developer",
  "Web Developer",
  "Software Engineer",
]

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full border-3 border-border brutal-shadow-sm mb-6"
            >
              <Sparkles size={16} />
              <span className="text-sm font-bold">Open to Work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="text-primary">Goutam Soni</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-16 sm:h-20 mb-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Building scalable web applications with Java, Spring Boot, JSP, 
              Servlets & Modern Web Technologies. Passionate about clean code 
              and user-centric design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/resume/goutam-soni-resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press"
              >
                View Projects
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Hero Card */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-primary rounded-3xl border-4 border-border brutal-shadow-lg p-8 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent border-2 border-border" />
                  <div className="w-4 h-4 rounded-full bg-secondary border-2 border-border" />
                  <div className="w-4 h-4 rounded-full bg-card border-2 border-border" />
                </div>

                <div className="flex flex-col items-center text-center text-primary-foreground">
                  {/* Profile Image Placeholder */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-card border-4 border-border brutal-shadow mb-6 flex items-center justify-center"
                  >
                     <img
                      src="/images/990249.png"
                      alt="Goutam Soni"
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-2">Goutam Soni</h3>
                  <p className="text-primary-foreground/90 font-medium mb-4">
                    Software Developer
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {["Java", "Spring Boot", "MySQL", "REST APIs"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-card text-foreground text-sm font-bold rounded-full border-2 border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements - Hidden on mobile to prevent overflow */}
              <motion.div
                animate={{ 
                  x: [0, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-xl border-3 border-border brutal-shadow hidden sm:flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-secondary-foreground">{'</>'}</span>
              </motion.div>

              <motion.div
                animate={{ 
                  x: [0, -10, 0],
                  y: [0, 5, 0],
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent rounded-xl border-3 border-border brutal-shadow hidden sm:flex items-center justify-center"
              >
                <Sparkles size={32} className="text-accent-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
