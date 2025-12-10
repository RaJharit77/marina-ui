'use client'

import { Send, Loader2, Copy } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import toast from 'react-hot-toast'

interface FormulaInputProps {
    onSubmit: (formula: string) => Promise<void>
    isLoading: boolean
    initialValue?: string
    onFormulaChange?: (formula: string) => void
}

export default function FormulaInput({ onSubmit, isLoading, initialValue = '', onFormulaChange }: FormulaInputProps) {
    const [formula, setFormula] = useState(initialValue)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Mettre à jour la formule quand initialValue change
    useEffect(() => {
        setFormula(initialValue)
    }, [initialValue])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formula.trim()) {
            toast.error('Please enter a formula')
            return
        }
        await onSubmit(formula)

        if (inputRef.current) {
            gsap.fromTo(inputRef.current,
                { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.5)' },
                {
                    boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)',
                    duration: 0.5,
                    ease: 'power2.out'
                }
            )
        }
    }

    const copyToClipboard = () => {
        if (formula) {
            navigator.clipboard.writeText(formula)
            toast.success('Formula copied to clipboard!')
        }
    }

    const handleFormulaChange = (value: string) => {
        setFormula(value)
        if (onFormulaChange) {
            onFormulaChange(value)
        }
    }

    const insertAtCursor = (text: string) => {
        const textarea = inputRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newText = formula.substring(0, start) + text + formula.substring(end)
        
        handleFormulaChange(newText)
        
        // Focus et repositionner le curseur
        setTimeout(() => {
            textarea.focus()
            textarea.selectionStart = textarea.selectionEnd = start + text.length
        }, 0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 shadow-2xl"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold gradient-text">Enter Boolean Formula</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>SAT</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>UNSAT</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <textarea
                        ref={inputRef}
                        value={formula}
                        onChange={(e) => handleFormulaChange(e.target.value)}
                        placeholder="e.g., (a & b | ~c) -> d <-> e"
                        className="w-full h-32 font-mono text-lg p-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-300 resize-none transition-all"
                        spellCheck="false"
                    />
                    {formula && (
                        <button
                            type="button"
                            onClick={copyToClipboard}
                            className="absolute right-3 top-3 p-2 text-gray-500 hover:text-primary-500 transition-colors"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                    <button
                        type="button"
                        onClick={() => insertAtCursor(' & ')}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                    >
                        AND (&)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor(' | ')}
                        className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded hover:bg-secondary-200 dark:hover:bg-secondary-800 transition-colors"
                    >
                        OR (|)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor(' ~')}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        NOT (~)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor(' -> ')}
                        className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                    >
                        IMPLY (→)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor(' <-> ')}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                    >
                        EQUIV (↔)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor('()')}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        Parentheses
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor('T')}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                        TRUE (T)
                    </button>
                    <button
                        type="button"
                        onClick={() => insertAtCursor('F')}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    >
                        FALSE (F)
                    </button>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-500">
                        <p className="font-mono">Syntax: & | ~ → ↔ T F ( ) [a-z_][0-9]*</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || !formula.trim()}
                        className="flex items-center space-x-2 bg-linear-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Solving...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                <span>Solve SAT</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}