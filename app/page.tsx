import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { FloatingSocials } from "@/components/portfolio/floating-socials"
import { FloatingWhatsApp } from "@/components/portfolio/floating-whatsapp"
import { getPortfolioData } from "@/lib/data-provider"

export const revalidate = 10 // Revalidate cache every 10 seconds

export default async function Home() {
  const data = await getPortfolioData().catch(() => null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingSocials />
      <FloatingWhatsApp />
      <HeroSection resumeUrl={data?.resume?.url} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection initialProjects={data?.projects} />
      <ContactSection />
      <Footer />
    </main>
  )
}
