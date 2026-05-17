"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const socialIcons = [
  { icon: Github, href: "https://github.com/goutam-s2002", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/goutam-soni-a38386290", label: "LinkedIn" },
  { icon: Mail, href: "mailto:goutam.soni.00112@gmail.com", label: "Email" },
]

export function FloatingSocials() {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, 2500)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
        >
          {socialIcons.map((social, index) => {
            const Icon = social.icon

            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-card border-3 border-border rounded-xl brutal-shadow-sm flex items-center justify-center"
              >
                <Icon size={20} />
              </motion.a>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}