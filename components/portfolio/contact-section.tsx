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
} from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "goutam.soni.00112@info.com",
    href: "mailto:goutam.soni.00112@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8839810406",
    href: "tel:+918839810406",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
    alert("Message sent!")
    setFormState({ name: "", email: "", message: "" })
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
                Let&apos;s Connect
              </h3>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out!
              </p>

              {/* Contact Items */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-xl border-3 border-border brutal-shadow-sm brutal-hover"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary flex items-center justify-center border-2 border-border flex-shrink-0">
                        <Icon size={18} className="text-primary-foreground sm:w-[22px] sm:h-[22px]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-bold text-foreground text-sm sm:text-base break-all">{item.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-3 sm:border-4 border-border brutal-shadow p-4 sm:p-6">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 ${social.color} rounded-xl border-3 border-border brutal-shadow-sm flex items-center justify-center brutal-hover`}
                    >
                      <Icon size={24} className={social.color === "bg-primary" ? "text-primary-foreground" : "text-foreground"} />
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
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send a Message
              </h3>

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
                      placeholder="Name"
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
                      placeholder="xyz@example.com"
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
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 bg-background rounded-xl border-3 border-border font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl border-3 border-border brutal-shadow brutal-hover brutal-press"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
