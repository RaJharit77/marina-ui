'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Lightbulb, Sparkles, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

interface Example {
    name: string
    formula: string
    description: string
    icon: React.ReactNode
    category: string
}

const examples: Example[] = [
    {
        name: 'Simple AND',
        formula: 'a & b',
        description: 'Both a and b must be true',
        icon: <Zap className="h-5 w-5" />,
        category: 'Basic'
    },
    {
        name: 'Simple OR',
        formula: 'a | b',
        description: 'At least one of a or b must be true',
        icon: <Zap className="h-5 w-5" />,
        category: 'Basic'
    },
    {
        name: 'Implication',
        formula: '(a & b | ~c) -> d <-> e',
        description: 'Complex implication chain',
        icon: <Sparkles className="h-5 w-5" />,
        category: 'Intermediate'
    },
    {
        name: 'Contradiction',
        formula: 'a & ~a',
        description: 'Always unsatisfiable',
        icon: <Lightbulb className="h-5 w-5" />,
        category: 'Basic'
    },
    {
        name: 'De Morgan',
        formula: '~(a & b) <-> (~a | ~b)',
        description: 'De Morgan\'s law example',
        icon: <BookOpen className="h-5 w-5" />,
        category: 'Advanced'
    },
    {
        name: 'Zazavavindrano',
        formula: 'zazavavindrano & zazavavindrano -> ((~ swim_warm -> red) & (blue | ~ red))',
        description: 'Malagasy folklore puzzle',
        icon: <Sparkles className="h-5 w-5" />,
        category: 'Advanced'
    },
    {
        name: 'Complex Logic',
        formula: '~(a -> b|c) <-> ~c&d',
        description: 'Nested operations',
        icon: <Zap className="h-5 w-5" />,
        category: 'Intermediate'
    },
    {
        name: 'Distributive Law',
        formula: 'a & (b | c) <-> (a & b) | (a & c)',
        description: 'Distributive law example',
        icon: <BookOpen className="h-5 w-5" />,
        category: 'Advanced'
    }
]

const categories = ['All', 'Basic', 'Intermediate', 'Advanced']

export default function ExamplesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const filteredExamples = selectedCategory === 'All'
        ? examples
        : examples.filter(ex => ex.category === selectedCategory)

    const handleCopyExample = (formula: string, name: string, index: number) => {
        navigator.clipboard.writeText(formula)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
        toast.success(`Copied: ${name}`)
    }

    const handleUseExample = (formula: string) => {
        navigator.clipboard.writeText(formula)
        toast.success('Formula copied! Go to the solver page to use it.')
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">Examples</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Browse through example boolean formulas to learn and test the solver
                </p>
            </motion.div>

            <div className="glass rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold gradient-text">Boolean Formula Examples</h2>
                        <p className="text-gray-600 dark:text-gray-400">Select a category or browse all examples</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExamples.map((example, index) => (
                        <motion.div
                            key={example.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-xl p-5 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                                        {example.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{example.name}</h3>
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                            {example.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => handleCopyExample(example.formula, example.name, index)}
                                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                                        title="Copy formula"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>

                            <div className="space-y-3">
                                <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded break-all">
                                    {example.formula}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {copiedIndex === index ? '✓ Copied!' : 'Click copy to use'}
                                    </span>
                                    <button
                                        onClick={() => handleUseExample(example.formula)}
                                        className="px-3 py-1 text-sm bg-linear-to-r from-primary-600 to-secondary-600 text-white rounded hover:opacity-90 transition-opacity"
                                    >
                                        Use in Solver
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredExamples.length === 0 && (
                    <div className="text-center py-12">
                        <div className="p-4 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg inline-block mb-4">
                            <BookOpen className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No examples found</h3>
                        <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-4">How to Use Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="font-mono text-lg mb-2">1</div>
                            <h4 className="font-bold mb-2">Copy Formula</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Click the copy icon or &quot;Use in Solver&quot; button to copy the formula
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="font-mono text-lg mb-2">2</div>
                            <h4 className="font-bold mb-2">Go to Solver</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Navigate to the solver page from the menu or use the button below
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="font-mono text-lg mb-2">3</div>
                            <h4 className="font-bold mb-2">Paste & Solve</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Paste the formula in the solver and click &quot;Solve SAT&quot; to see the result
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <a
                            href="/solver"
                            className="inline-flex items-center space-x-2 bg-linear-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                        >
                            <Zap className="h-5 w-5" />
                            <span>Go to Solver</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}