'use client'

import { Brain, Menu, X, Zap, Home, Calculator, BookOpen, FileText, Info, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === path
        return pathname.startsWith(path)
    }

    const navItems = [
        {
            label: 'Home',
            path: '/',
            icon: <Home className="h-4 w-4" />
        },
        {
            label: 'Solver',
            path: '/solver',
            icon: <Calculator className="h-4 w-4" />
        },
        {
            label: 'Examples',
            path: '/examples',
            icon: <BookOpen className="h-4 w-4" />
        },
        {
            label: 'Guide',
            path: '/guide',
            icon: <HelpCircle className="h-4 w-4" />
        },
        {
            label: 'About',
            path: '/about',
            icon: <Info className="h-4 w-4" />
        },
        {
            label: 'Documentation',
            path: '/documentation',
            icon: <FileText className="h-4 w-4" />
        }
    ]

    return (
        <nav className="sticky top-0 z-50 glass border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="p-2 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold gradient-text">Marina SAT</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Boolean Logic Solver</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                                    isActive(item.path)
                                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        
                        <Link
                            href="/solver"
                            className="flex items-center space-x-2 bg-linear-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                        >
                            <Zap className="h-4 w-4" />
                            <span>Try Solver</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t"
                    >
                        <div className="px-4 py-3 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                                        isActive(item.path)
                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            
                            <Link
                                href="/solver"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center space-x-2 bg-linear-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg mt-2"
                            >
                                <Zap className="h-4 w-4" />
                                <span>Try Solver Now</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}