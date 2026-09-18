import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Portal | Portfolio Management",
  description: "Manage resume and projects from anywhere with Supabase backend",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {children}
    </div>
  )
}
