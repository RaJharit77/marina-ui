'use client'

import { Check, X, AlertTriangle, Copy, Download, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import toast from 'react-hot-toast'

interface ResultDisplayProps {
    result: string | null
    error: string | null
    formula: string
}

export default function ResultDisplay({ result, error, formula }: ResultDisplayProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isSatisfiable = result && !result.includes(',false)') && result !== '(,false)'

    useEffect(() => {
        if (containerRef.current && (result || error)) {
            gsap.fromTo(containerRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
            )
        }
    }, [result, error])

    const copyResult = () => {
        if (result) {
            navigator.clipboard.writeText(result)
            toast.success('Result copied to clipboard!')
        }
    }

    const downloadResult = () => {
        const content = `Formula: ${formula}\nResult: ${result || error}\nTimestamp: ${new Date().toISOString()}`
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `marina-result-${Date.now()}.txt`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Result downloaded!')
    }

    const clearResults = () => {
        window.location.reload() // Recharge la page pour tout réinitialiser
    }

    if (!result && !error) return null

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    {error ? (
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                    ) : isSatisfiable ? (
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Check className="h-6 w-6 text-green-500" />
                        </div>
                    ) : (
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <X className="h-6 w-6 text-red-500" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold">
                            {error ? 'Error' : isSatisfiable ? 'Satisfiable' : 'Unsatisfiable'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {error ? 'Parsing error occurred' : isSatisfiable ? 'Valid assignment found' : 'No valid assignment exists'}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={copyResult}
                        disabled={!result}
                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Copy result"
                    >
                        <Copy className="h-5 w-5" />
                    </button>
                    <button
                        onClick={downloadResult}
                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                        title="Download result"
                    >
                        <Download className="h-5 w-5" />
                    </button>
                    <button
                        onClick={clearResults}
                        className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                        title="Clear results"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {error ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-mono text-red-700 dark:text-red-300 break-all">{error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Assignment:</h4>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg font-mono">
                            {result === '(,false)' ? (
                                <span className="text-red-500">No assignment exists (UNSAT)</span>
                            ) : (
                                <div className="flex flex-wrap gap-3">
                                    {result!.split(' ').map((assignment, idx) => {
                                        const [varName, value] = assignment.replace(/[()]/g, '').split(',')
                                        if (!varName) return null
                                        return (
                                            <motion.span
                                                key={idx}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`inline-flex items-center px-3 py-1 rounded-full ${
                                                    value === 'true' 
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                                }`}
                                            >
                                                <span className="font-bold">{varName}</span>
                                                <span className="mx-1">=</span>
                                                <span className="font-mono">{value}</span>
                                            </motion.span>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Interpretation</h4>
                            <p className="text-sm">
                                {isSatisfiable
                                    ? 'The formula is satisfiable with the above assignment. Variables not shown can have any value.'
                                    : 'The formula is unsatisfiable. No variable assignment makes it true.'}
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Note</h4>
                            <p className="text-sm">
                                Marina returns partial assignments. Missing variables don't affect satisfiability.
                                Parentheses are required for complex expressions.
                            </p>
                        </div>
                    </div>

                    {result && result !== '(,false)' && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">What does this mean?</h4>
                            <p className="text-sm">
                                The formula can be made true by setting the variables to the values shown above.
                                Variables not listed can be either true or false without affecting the result.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}