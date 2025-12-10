'use client'

import { motion } from 'framer-motion'
import { Cpu, Zap, Shield, Globe } from 'lucide-react'

export default function FeaturesSection() {
    const features = [
        {
            icon: <Cpu className="h-8 w-8" />,
            title: 'Fast Solving',
            description: 'Uses IF-expression normalization for efficient SAT solving'
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: 'Partial Assignments',
            description: 'Returns minimal assignments showing satisfiability'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: 'Syntax Validation',
            description: 'Validates formulas with detailed error messages'
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: 'Web Accessible',
            description: 'Accessible through REST API or web interface'
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            id="features"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass p-6 rounded-xl"
                >
                    <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg w-fit mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
            ))}
        </motion.div>
    )
}