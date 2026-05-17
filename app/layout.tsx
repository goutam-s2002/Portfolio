import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Goutam Soni | Software Developer',
  description: 'Portfolio of Goutam Soni - Software Developer specializing in Spring Boot, JSP, Servlets, and modern web technologies. Building scalable web applications.',
  keywords: ['Java Developer', 'Full Stack Developer', 'Spring Boot', 'JSP', 'Servlets', 'Web Developer', 'Goutam Soni'],
  authors: [{ name: 'Goutam Soni' }],
  openGraph: {
    title: 'Goutam Soni | Software Developer',
    description: 'Building scalable web applications with Java, Spring Boot, JSP, Servlets & Modern Web Technologies.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/portfolio-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/portfolio-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/apple-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
