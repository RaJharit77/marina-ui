'use client'

import { motion } from 'framer-motion'
import { url } from 'inspector'
import { Brain, Code, Users, BookOpen } from 'lucide-react'

export default function AboutPage() {
    const team = [
        {
            name: 'RaJharit77',
            role: 'Front-end Developer',
            description: 'Creator of Marina SAT Solver Design',
            icon: <Code className="h-6 w-6" />,
            url:"https://github.com/RaJharit77"
        },
        {
            name: 'Ocaml',
            role: 'Source Code',
            description: 'Open-source project',
            icon: <Users className="h-6 w-6" />,
            url: "https://github.com/RaJharit77/marina.git"
        }
    ]

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">About Marina</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Learn about the story behind Marina SAT Solver and the team that built it.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-8"
            >
                <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                        <Brain className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">What is Marina?</h2>
                        <p className="text-gray-600 dark:text-gray-400">The meaning behind the name</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <p>
                        <strong>Marina</strong> is the Malagasy word for <em>True</em>. This SAT solver was named to honor the
                        Malagasy language and the concept of truth in boolean logic.
                    </p>
                    <p>
                        The project combines traditional SAT solving techniques with modern web technologies to provide
                        an accessible and interactive interface for solving boolean satisfiability problems.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-8"
            >
                <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                        <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Technology Stack</h2>
                        <p className="text-gray-600 dark:text-gray-400">Built with modern technologies</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Backend</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span>OCaml - Functional programming language</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>IF-expression normalization algorithm</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>REST API with Flask</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Docker for API containerization</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Frontend</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                <span>Next.js 16 with App Router</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span>TypeScript for type safety</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span>Tailwind CSS v4 for styling</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                <span>Framer motion and GSAP for the animation</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-8"
            >
                <h2 className="text-2xl font-bold mb-6">Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 transition-colors"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg">
                                    {member.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{member.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{member.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}