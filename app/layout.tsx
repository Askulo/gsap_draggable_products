import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GSAP Draggable Products',
  description: 'Interactive draggable product showcase with smooth GSAP animations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
