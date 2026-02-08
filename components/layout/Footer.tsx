'use client'

import { Heart } from 'lucide-react'
import { SiGithub } from "react-icons/si";
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-16 pt-8 border-t glass">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                                <Heart className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold gradient-text">Marina SAT</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            A modern SAT solver with interactive interface and real-time solving capabilities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="font-bold text-lg">Quick Links</h4>
                        <div className="space-y-2">
                            <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                Home
                            </Link>
                            <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                About
                            </Link>
                            <Link href="/documentation" className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                Documentation
                            </Link>
                            <Link href="#syntax" className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                Syntax Guide
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="font-bold text-lg">Connect</h4>
                        <div className="space-y-2">
                            <Link
                                href="https://github.com/RaJharit77/marina-ui"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                            >
                                <SiGithub className="h-5 w-5" />
                                <span>GitHub Repository</span>
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                For issues and feature requests, please create an issue on GitHub.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            <p>Marina SAT Solver - RaJharit77 © 2025 - {currentYear}</p>
                            <p className="mt-1">Based on IF-expression normalization technique</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                UI deployed on{' '}
                                <a
                                    href="https://vercel.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-500 hover:underline"
                                >
                                    Vercel
                                </a>
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                v1.0.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
