'use client'

import { motion } from 'framer-motion'
import { FileText, Code, Hash, Parentheses, CheckCircle, XCircle } from 'lucide-react'

export default function GuidePage() {
    const operators = [
        {
            symbol: '&',
            name: 'AND',
            description: 'Logical conjunction - both operands must be true',
            example: 'a & b',
            result: 'true only if both a AND b are true'
        },
        {
            symbol: '|',
            name: 'OR',
            description: 'Logical disjunction - at least one operand must be true',
            example: 'a | b',
            result: 'true if a OR b (or both) are true'
        },
        {
            symbol: '~',
            name: 'NOT',
            description: 'Logical negation - inverts the truth value',
            example: '~a',
            result: 'true if a is false, false if a is true'
        },
        {
            symbol: '->',
            name: 'IMPLY',
            description: 'Material implication - if a then b',
            example: 'a -> b',
            result: 'false only if a is true and b is false'
        },
        {
            symbol: '<->',
            name: 'EQUIV',
            description: 'Logical equivalence - a if and only if b',
            example: 'a <-> b',
            result: 'true if a and b have the same truth value'
        }
    ]

    const examples = [
        {
            title: 'Simple Expression',
            formula: 'a & (b | c)',
            explanation: 'a must be true AND (b OR c must be true)'
        },
        {
            title: 'Implication Chain',
            formula: '(a -> b) & (b -> c)',
            explanation: 'If a then b, and if b then c'
        },
        {
            title: 'De Morgan\'s Law',
            formula: '~(a & b) <-> (~a | ~b)',
            explanation: 'The negation of a conjunction is equivalent to the disjunction of negations'
        },
        {
            title: 'Distributive Law',
            formula: 'a & (b | c) <-> (a & b) | (a & c)',
            explanation: 'AND distributes over OR'
        },
        {
            title: 'Contradiction',
            formula: 'a & ~a',
            explanation: 'Always false (unsatisfiable)'
        },
        {
            title: 'Tautology',
            formula: 'a | ~a',
            explanation: 'Always true (valid)'
        }
    ]

    const commonMistakes = [
        {
            mistake: 'Missing parentheses',
            wrong: 'a & b | c',
            correct: '(a & b) | c or a & (b | c)',
            reason: 'Operator precedence is ambiguous without parentheses'
        },
        {
            mistake: 'Invalid variable names',
            wrong: 'A1 or var-name',
            correct: 'a1 or var_name',
            reason: 'Only lowercase, underscores, and numbers allowed'
        },
        {
            mistake: 'Missing operator',
            wrong: 'a b',
            correct: 'a & b or a | b',
            reason: 'Need an operator between variables'
        },
        {
            mistake: 'Double negation error',
            wrong: '~~a (if expecting a)',
            correct: 'a',
            reason: 'Double negation cancels out (~ ~a is equivalent to a)'
        }
    ]

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">Syntax Guide</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Comprehensive reference for Marina SAT Solver boolean formula syntax
                </p>
            </motion.div>

            <div className="glass rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                        <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">BNF Grammar</h2>
                        <p className="text-gray-600 dark:text-gray-400">Formal definition of valid formulas</p>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg font-mono mb-8">
                    <pre className="text-sm overflow-x-auto">
                        {`<prop> ::=  T                     (true)
          | F                     (false)
          | <atom>               (variable)
          | ~ <prop>             (negation)
          | <prop> & <prop>      (conjunction)
          | <prop> | <prop>      (disjunction)
          | <prop> -> <prop>     (implication)
          | <prop> <-> <prop>    (equivalence)
          | ( <prop> )           (parentheses)

<atom> ::= [a-z][a-z0-9_]*       (lowercase letters, numbers, underscore)`}
                    </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Parentheses className="h-5 w-5" />
                            Operator Precedence
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">1. Parentheses</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Highest precedence - ( )</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">2. Negation</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">~ (NOT)</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">3. Conjunction</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">& (AND)</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">4. Disjunction</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">| (OR)</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">5. Implication</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">-&gt;</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="font-bold text-lg mb-1">6. Equivalence</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{'<->'}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Hash className="h-5 w-5" />
                            Variable Rules
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="font-bold">Valid Variables</span>
                                </div>
                                <div className="space-y-1">
                                    <code className="block px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">a</code>
                                    <code className="block px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">b1</code>
                                    <code className="block px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">var_name</code>
                                    <code className="block px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">x_123</code>
                                </div>
                            </div>

                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <XCircle className="h-5 w-5 text-red-500" />
                                    <span className="font-bold">Invalid Variables</span>
                                </div>
                                <div className="space-y-1">
                                    <code className="block px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded">A</code>
                                    <code className="block px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded">var-name</code>
                                    <code className="block px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded">1var</code>
                                    <code className="block px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded">_var</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6">Operators Reference</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {operators.map((op, index) => (
                            <motion.div
                                key={op.symbol}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                                            <Code className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold font-mono">{op.symbol}</div>
                                            <div className="text-lg font-semibold">{op.name}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        Operator
                                    </div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-4">{op.description}</p>

                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500">Example:</span>
                                        <code className="block font-mono p-2 bg-gray-50 dark:bg-gray-800 rounded mt-1">
                                            {op.example}
                                        </code>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Result:</span>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{op.result}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6">Common Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examples.map((ex, index) => (
                            <motion.div
                                key={ex.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-5 rounded-xl"
                            >
                                <h4 className="font-bold text-lg mb-2">{ex.title}</h4>
                                <code className="block font-mono text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3">
                                    {ex.formula}
                                </code>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{ex.explanation}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6">Common Mistakes</h3>
                    <div className="space-y-4">
                        {commonMistakes.map((mistake, index) => (
                            <motion.div
                                key={mistake.mistake}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-5 border-2 border-red-200 dark:border-red-800 rounded-xl bg-red-50/50 dark:bg-red-900/10"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-bold text-lg text-red-700 dark:text-red-300">{mistake.mistake}</h4>
                                    <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                                        Error
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Wrong:</span>
                                        <code className="font-mono p-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded block">
                                            {mistake.wrong}
                                        </code>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Correct:</span>
                                        <code className="font-mono p-2 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded block">
                                            {mistake.correct}
                                        </code>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Reason:</span> {mistake.reason}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 p-6 bg-linear-to-r from-primary-500/10 to-secondary-500/10 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>Always use parentheses for complex expressions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>Use T for true and F for false constants</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>Variables must start with a lowercase letter</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>White spaces are ignored during parsing</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span>Use the solver page to test your formulas</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}