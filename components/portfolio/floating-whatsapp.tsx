"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show as soon as user starts scrolling on phone or desktop
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setVisible(true)
      }
    }

    // If page is loaded with scroll, show immediately
    if (window.scrollY > 40) {
      setVisible(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/918839810406?text=Hi%20Goutam,%20I%20saw%20your%20portfolio!"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 8839810406)"
          initial={{ scale: 0, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-2xl border-3 border-border brutal-shadow brutal-hover flex items-center justify-center group shadow-xl"
        >
          <WhatsAppIcon size={28} />
          <span className="sr-only">Chat on WhatsApp</span>

          {/* Green pulse ring */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />

          {/* Desktop Hover Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 bg-card text-foreground font-bold text-xs rounded-xl border-2 border-border brutal-shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
