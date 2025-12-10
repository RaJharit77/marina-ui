'use client'

import { BookOpen, Zap, Lightbulb, Sparkles, Clipboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Example {
    name: string
    formula: string
    description: string
    icon: React.ReactNode
}

const examples: Example[] = [
    {
        name: 'Simple AND',
        formula: 'a & b',
        description: 'Both a and b must be true',
        icon: <Zap className="h-5 w-5" />
    },
    {
        name: 'Implication',
        formula: '(a & b | ~c) -> d <-> e',
        description: 'Complex implication chain',
        icon: <Sparkles className="h-5 w-5" />
    },
    {
        name: 'Contradiction',
        formula: 'a & ~a',
        description: 'Always unsatisfiable',
        icon: <Lightbulb className="h-5 w-5" />
    },
    {
        name: 'De Morgan',
        formula: '~(a & b) <-> (~a | ~b)',
        description: 'De Morgan\'s law example',
        icon: <BookOpen className="h-5 w-5" />
    },
    {
        name: 'Zazavavindrano',
        formula: 'zazavavindrano & zazavavindrano -> ((~ swim_warm -> red) & (blue | ~ red))',
        description: 'Malagasy folklore puzzle',
        icon: <Sparkles className="h-5 w-5" />
    },
    {
        name: 'Complex Logic',
        formula: '~(a -> b|c) <-> ~c&d',
        description: 'Nested operations',
        icon: <Zap className="h-5 w-5" />
    }
]

interface ExamplesPanelProps {
    onSelectExample: (formula: string) => void
}

export default function ExamplesPanel({ onSelectExample }: ExamplesPanelProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleExampleClick = (example: Example, index: number) => {
        // Définir cet exemple comme actif
        setActiveIndex(index)
        
        // Appeler la fonction pour charger l'exemple dans l'input
        onSelectExample(example.formula)
        
        // Montrer une notification
        toast.success(`Loaded: ${example.name}`)
        
        // Animation de feedback
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    const copyToClipboard = (formula: string, name: string, index: number) => {
        navigator.clipboard.writeText(formula)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
        toast.success(`Copied: ${name}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
        >
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold gradient-text">Examples</h2>
                    <p className="text-gray-600 dark:text-gray-400">Click to load examples into the input</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examples.map((example, index) => (
                    <motion.div
                        key={example.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            activeIndex === index
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        onClick={() => handleExampleClick(example, index)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg">
                                {example.icon}
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        copyToClipboard(example.formula, example.name, index)
                                    }}
                                    className="p-1 text-gray-500 hover:text-primary-500 transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <Clipboard className="h-4 w-4" />
                                </button>
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                    {activeIndex === index ? 'Loaded' : 'Click'}
                                </span>
                            </div>
                        </div>
                        <h4 className="font-bold mb-2">{example.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{example.description}</p>
                        <div className="font-mono text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded break-all">
                            {example.formula}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-linear-to-r from-gray-50 to-primary-50 dark:from-gray-800/50 dark:to-primary-900/20 rounded-lg">
                <h4 className="font-bold mb-2 text-primary-700 dark:text-primary-300">Syntax Quick Reference</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                        <span className="font-mono">&</span>
                        <span className="text-gray-500 ml-2">AND</span>
                    </div>
                    <div>
                        <span className="font-mono">|</span>
                        <span className="text-gray-500 ml-2">OR</span>
                    </div>
                    <div>
                        <span className="font-mono">~</span>
                        <span className="text-gray-500 ml-2">NOT</span>
                    </div>
                    <div>
                        <span className="font-mono">-&gt;</span>
                        <span className="text-gray-500 ml-2">IMPLY</span>
                    </div>
                    <div>
                        <span className="font-mono">&lt;-&gt;</span>
                        <span className="text-gray-500 ml-2">EQUIV</span>
                    </div>
                    <div>
                        <span className="font-mono">T</span>
                        <span className="text-gray-500 ml-2">TRUE</span>
                    </div>
                    <div>
                        <span className="font-mono">F</span>
                        <span className="text-gray-500 ml-2">FALSE</span>
                    </div>
                    <div>
                        <span className="font-mono">a-z_0-9</span>
                        <span className="text-gray-500 ml-2">Variables</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Click on any example to load it into the input field</p>
            </div>
        </motion.div>
    )
}