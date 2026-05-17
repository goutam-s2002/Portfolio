"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-8 px-4 bg-card border-t-4 border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left text-muted-foreground"
          >
            Designed & Developed with{" "}
            <Heart size={16} className="inline text-accent fill-accent" /> by{" "}
            <span className="font-bold text-foreground">Goutam Soni</span>
          </motion.p>

          {/* Year */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            © {new Date().getFullYear()} All Rights Reserved
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-primary rounded-xl border-3 border-border brutal-shadow-sm flex items-center justify-center brutal-hover brutal-press"
          >
            <ArrowUp size={20} className="text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
