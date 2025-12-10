import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/style/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marina SAT Solver - Boolean Logic Solver',
  description: 'Interactive SAT solver with support for complex boolean formulas',
  icons: {
    icon: '/ico/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div 
          className="absolute inset-0 -z-10 h-full w-full" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #f0f0f0 1px, transparent 1px),
              linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
            `,
            backgroundSize: '6rem 4rem',
          }}
        />
        <div 
          className="absolute inset-0 -z-10 h-full w-full dark:hidden" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #f0f0f0 1px, transparent 1px),
              linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
            `,
            backgroundSize: '6rem 4rem',
          }}
        />
        <div 
          className="absolute inset-0 -z-10 h-full w-full hidden dark:block" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #1f2937 1px, transparent 1px),
              linear-gradient(to bottom, #1f2937 1px, transparent 1px)
            `,
            backgroundSize: '6rem 4rem',
          }}
        />
        <Navbar />
        <main className="container mx-auto px-4 py-8 grow">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'glass',
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            },
          }}
        />
      </body>
    </html>
  )
}