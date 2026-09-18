-- ==========================================================
-- SUPABASE SCHEMA FOR PORTFOLIO (Projects & Resume Manager)
-- Run this in your Supabase project's SQL Editor (Dashboard > SQL Editor > New query)
-- ==========================================================

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  color TEXT DEFAULT 'bg-primary',
  category TEXT DEFAULT 'Full Stack',
  url TEXT DEFAULT '',
  url2 TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create portfolio_settings table (for resume metadata & global settings)
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create contact_messages table (for messages submitted through contact form)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact messages
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert on contact_messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow service role full access on contact_messages"
  ON public.contact_messages FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Public read policies (allow anyone visiting the portfolio to view projects & resume)
DROP POLICY IF EXISTS "Allow public read on projects" ON public.projects;
CREATE POLICY "Allow public read on projects"
  ON public.projects FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public read on settings" ON public.portfolio_settings;
CREATE POLICY "Allow public read on settings"
  ON public.portfolio_settings FOR SELECT
  USING (true);

-- 5. Service role write policies (used by Next.js backend API routes with SUPABASE_SERVICE_ROLE_KEY)
DROP POLICY IF EXISTS "Allow service role full access on projects" ON public.projects;
CREATE POLICY "Allow service role full access on projects"
  ON public.projects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access on settings" ON public.portfolio_settings;
CREATE POLICY "Allow service role full access on settings"
  ON public.portfolio_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Storage Bucket for Resumes
-- Creates a public storage bucket named 'resumes' if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy to allow public downloads from the 'resumes' bucket
DROP POLICY IF EXISTS "Public resume download access" ON storage.objects;
CREATE POLICY "Public resume download access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'resumes');

-- Policy to allow service role uploads
DROP POLICY IF EXISTS "Service role upload access" ON storage.objects;
CREATE POLICY "Service role upload access"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'resumes')
  WITH CHECK (bucket_id = 'resumes');

-- 7. Seed Initial Resume Setting
INSERT INTO public.portfolio_settings (key, value, updated_at)
VALUES (
  'resume',
  json_build_object(
    'url', '/resume/goutam-soni-resume.pdf',
    'filename', 'goutam-soni-resume.pdf',
    'updated_at', NOW()
  ),
  NOW()
)
ON CONFLICT (key) DO NOTHING;

-- 8. Seed Initial Projects (Your 7 existing projects)
INSERT INTO public.projects (id, title, subtitle, description, tech_stack, features, color, category, url, url2, sort_order)
VALUES
  (
    'proj_1',
    'FinanceBuddy',
    'Personal Finance Management System',
    'A comprehensive personal finance management system with role-based access control, financial dashboards, and analytics.',
    '["Java", "Spring Boot", "JSP", "HTML", "CSS", "JavaScript", "Maven", "Bootstrap"]'::jsonb,
    '["Admin, Analyst, User roles", "Financial dashboards", "Charts and analytics", "CRUD operations", "PDF report generation"]'::jsonb,
    'bg-primary',
    'Full Stack',
    'https://github.com/goutam-s2002/FinanceBuddy',
    'https://financebuddy-4i6l.onrender.com',
    1
  ),
  (
    'proj_2',
    'Banking System',
    'Full Stack Banking & Finance Platform',
    'A comprehensive digital banking platform featuring multi-account management, instant fund transfers, transaction histories, and dynamic statement exports.',
    '["React", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "MySQL", "Bootstrap", "Docker"]'::jsonb,
    '["Secure JWT auth with silent access token refresh", "Checking & Savings account management", "Instant fund transfers, deposits & withdrawals", "Full bank statements exportable to CSV, Excel, Word & PDF", "Role-based access control (Admin & User portals) with audit logs"]'::jsonb,
    'bg-accent',
    'Full Stack',
    'https://github.com/goutam-s2002/Banking-System-Backend',
    'https://bankingsystems.netlify.app',
    2
  ),
  (
    'proj_3',
    'Hostel Management System',
    'Student & Fee Management',
    'A complete hostel management solution with student management, fee tracking, and real-time updates.',
    '["Java", "JSP", "Servlets", "AJAX", "JDBC", "MySQL"]'::jsonb,
    '["Student management", "Fee tracking", "CRUD operations", "Real-time AJAX updates"]'::jsonb,
    'bg-primary',
    'Full Stack',
    'https://github.com/goutam-s2002/Hostel-Management-System',
    'https://github.com/goutam-s2002/Hostel-Management-System',
    3
  ),
  (
    'proj_4',
    'BookEase',
    'Online Book Store & Inventory Platform',
    'A full-featured online bookstore platform with responsive catalog browsing, persistent shopping cart, direct checkout, printable invoices, and an administrative inventory control dashboard.',
    '["PHP", "MySQL", "JavaScript", "CSS3", "Bootstrap Icons", "AJAX", "Apache"]'::jsonb,
    '["Responsive catalog & multi-angle book gallery", "Persistent shopping cart & one-click checkout", "Live order tracking & printable invoices", "Admin KPI dashboard & inventory management"]'::jsonb,
    'bg-accent',
    'Full Stack',
    'https://github.com/goutam-s2002/Bookease',
    'http://bookease.great-site.net',
    4
  ),
  (
    'proj_5',
    'LinkSnap',
    'Personal Digital Vault & Developer Workspace',
    'A self-hosted, private digital vault designed to organize, search, and manage personal bookmarks, developer contacts, project portfolios, and code snippets with real-time global search and full JSON data portability.',
    '["PHP", "MySQL", "JavaScript", "CSS", "Bootstrap Icons", "PDO", "Apache"]'::jsonb,
    '["Global instant search overlay (Ctrl + K) across all vault modules", "Categorized bookmark manager with visit tracking & 1-click clipboard copy", "Project portfolio tracker with status badges & live repository links", "Developer contacts directory & pinned notes/code snippets vault"]'::jsonb,
    'bg-primary',
    'Full Stack',
    'https://github.com/goutam-s2002/LinkSnap',
    'https://linksnap.freedev.app',
    5
  ),
  (
    'proj_6',
    'TaskFlow Pro',
    'Real-Time Collaborative Kanban & Task Management Platform',
    'A high-performance full-stack task and project management system featuring interactive drag-and-drop Kanban boards, live multi-tab WebSocket synchronization, JWT authentication, and distributed cloud database persistence on TiDB Cloud Serverless.',
    '["React", "Node.js", "Express", "TiDB Cloud", "WebSockets", "JWT", "Vite"]'::jsonb,
    '["Interactive Kanban board with drag-and-drop workflow status transitions", "Real-time multi-tab & session state synchronization via native WebSockets", "Dual view modes: Seamless toggle between Kanban boards and structured table/list views", "Secure JWT authentication with bcrypt hashing & live KPI metrics dashboard"]'::jsonb,
    'bg-accent',
    'Full Stack',
    'https://github.com/goutam-s2002/task-management-app',
    'https://github.com/goutam-s2002/task-management-app',
    6
  ),
  (
    'proj_7',
    'Voice of India',
    'Dynamic Multi-Country News Aggregator & Discovery Platform',
    'A modern, responsive news aggregation web application built with React, delivering real-time top headlines across diverse categories and global countries with instant light/dark theme switching and dynamic API integration.',
    '["React", "JavaScript", "NewsAPI", "CSS", "HTML"]'::jsonb,
    '["Real-time top headline streaming across 7 curated categories (Tech, Business, Sports, Science, etc.)", "Dynamic multi-country filtering supporting India, United States, UK, Australia, France, and Russia", "Seamless Dark & Light mode theme switcher with full body styling transitions", "Fully responsive mobile-first layout with smooth slide-out drawer sidebar navigation"]'::jsonb,
    'bg-primary',
    'Frontend',
    'https://github.com/goutam-s2002/Voice-of-India',
    'https://goutam-s2002.github.io/Voice-of-India',
    7
  )
ON CONFLICT (id) DO NOTHING;
