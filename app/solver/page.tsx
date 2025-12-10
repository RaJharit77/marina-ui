'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { solveSAT } from '@/lib/marinaClient'
import FormulaInput from '@/components/solver/FormulaInput'
import ResultDisplay from '@/components/solver/ResultDisplay'
import toast from 'react-hot-toast'

export default function SolverPage() {
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentFormula, setCurrentFormula] = useState('')

    const handleSubmit = async (formula: string) => {
        setIsLoading(true)
        setError(null)
        setResult(null)
        setCurrentFormula(formula)

        try {
            const { assignment, error: apiError } = await solveSAT(formula)

            if (apiError) {
                setError(apiError)
                toast.error('SAT solving failed')
            } else if (assignment) {
                setResult(assignment)
                toast.success('Formula solved successfully!')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
            toast.error('Network error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">SAT Solver</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Interactive boolean satisfiability problem solver
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <FormulaInput onSubmit={handleSubmit} isLoading={isLoading} />
                    <ResultDisplay result={result} error={error} formula={currentFormula} />
                </div>
                <div>
                    <div className="glass rounded-2xl p-6">
                        <h3 className="text-xl font-bold mb-4 gradient-text">Tips & Tricks</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-300">Use Parentheses</h4>
                                <p className="text-sm">Always use parentheses for complex expressions to ensure correct operator precedence.</p>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h4 className="font-bold mb-2 text-green-700 dark:text-green-300">Check Syntax</h4>
                                <p className="text-sm">Variables must be lowercase with optional underscores and numbers (e.g., a1, var_2).</p>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <h4 className="font-bold mb-2 text-purple-700 dark:text-purple-300">Partial Assignments</h4>
                                <p className="text-sm">Marina returns minimal assignments. Missing variables don&apos;t affect satisfiability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}