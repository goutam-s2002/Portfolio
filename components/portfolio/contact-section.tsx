"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  User,
  MessageSquare,
  Instagram,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "goutam.soni.00112@gmail.com",
    href: "mailto:goutam.soni.00112@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8839810406",
    href: "tel:+918839810406",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+91 8839810406",
    href: "https://wa.me/918839810406?text=Hi%20Goutam,%20I%20saw%20your%20portfolio!",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Khandwa, MP, India",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/goutam-s2002",
    color: "bg-card",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/goutam-soni-a38386290",
    color: "bg-primary",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    href: "https://wa.me/918839810406?text=Hi%20Goutam,%20I%20saw%20your%20portfolio!",
    color: "bg-[#25D366] text-white",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/goutam_s2002/",
    color: "bg-accent",
  },
]

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  // Direct WhatsApp Send
  const handleDirectWhatsApp = () => {
    if (!formState.name.trim() || !formState.message.trim()) {
      toast.error("Please enter your name and message first!")
      return
    }

    const text = `Hi Goutam, my name is ${formState.name} (${formState.email || "Email not provided"}).\n\n${formState.message}`
    const waUrl = `https://wa.me/918839810406?text=${encodeURIComponent(text)}`
    window.open(waUrl, "_blank")
    toast.success("Opening WhatsApp chat with Goutam...")
  }

  // Submit via API & Open WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      toast.error("Please fill all fields")
      return
    }

    setSubmitting(true)
    try {
      // 1. Save to backend / Supabase
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      // 2. Open WhatsApp pre-filled message
      const text = `Hi Goutam, my name is ${formState.name} (${formState.email}).\n\n${formState.message}`
      const waUrl = `https://wa.me/918839810406?text=${encodeURIComponent(text)}`
      window.open(waUrl, "_blank")

      if (res.ok) {
        toast.success("Message recorded & opening WhatsApp!")
      } else {
        toast.info("Opening WhatsApp...")
      }

      setFormState({ name: "", email: "", message: "" })
    } catch {
      // Fallback: still open WhatsApp even if network/offline
      const text = `Hi Goutam, my name is ${formState.name} (${formState.email}).\n\n${formState.message}`
      const waUrl = `https://wa.me/918839810406?text=${encodeURIComponent(text)}`
      window.open(waUrl, "_blank")
      toast.success("Opening WhatsApp chat!")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-2 sm:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-1 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full border-3 border-border brutal-shadow-sm text-sm font-bold mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-primary rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-border brutal-shadow p-4 sm:p-6 md:p-8">
              <h3 className="text-2xl font-bold text-primary-foreground mb-6">
                Let's Build Something Together
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to contact me
                via WhatsApp, email, or phone!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-card rounded-xl border-3 border-border brutal-shadow-sm hover:bg-card/90 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase">
                          {info.label}
                        </p>
                        <p className="font-bold text-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-border brutal-shadow p-4 sm:p-6 md:p-8">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Connect With Me
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-3 border-border brutal-shadow-sm ${social.color} font-bold text-sm brutal-hover`}
                    >
                      <Icon size={18} />
                      {social.label}
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-border brutal-shadow p-4 sm:p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Send a Message
                </h3>
                
              </div>

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Your Name"
                      className="w-full pl-12 pr-4 py-4 bg-background rounded-xl border-3 border-border font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      suppressHydrationWarning={true}
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-background rounded-xl border-3 border-border font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={20}
                      className="absolute left-4 top-4 text-muted-foreground"
                    />
                    <textarea
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell me about your project or requirement..."
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 bg-background rounded-xl border-3 border-border font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="space-y-3 pt-2">
                  {/* Primary WhatsApp Direct Send */}
                  <motion.button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press"
                  >
                    <WhatsAppIcon size={22} />
                    Open & Chat on WhatsApp Directly
                  </motion.button>

                  {/* Standard Form Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
