'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
        >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                Marina SAT Solver
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Solve complex boolean satisfiability problems with our interactive SAT solver.
                <span className="block text-sm text-gray-500 mt-2">
                    marina being the Malagasy word for <em>True</em>
                </span>
            </p>
        </motion.div>
    )
}