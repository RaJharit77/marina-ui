'use client'

import { motion } from 'framer-motion'
import { FileText, Code, Zap, Cpu } from 'lucide-react'

export default function DocumentationPage() {
    const sections = [
        {
            title: 'Getting Started',
            icon: <Zap className="h-6 w-6" />,
            content: 'Learn how to use the Marina SAT Solver interface'
        },
        {
            title: 'API Reference',
            icon: <Code className="h-6 w-6" />,
            content: 'Complete REST API documentation'
        },
        {
            title: 'Algorithm Details',
            icon: <Cpu className="h-6 w-6" />,
            content: 'Technical details about IF-expression normalization'
        },
        {
            title: 'Examples',
            icon: <FileText className="h-6 w-6" />,
            content: 'Comprehensive examples and use cases'
        }
    ]

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">Documentation</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Comprehensive guide to using Marina SAT Solver and understanding its algorithms.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, index) => (
                    <motion.a
                        key={section.title}
                        href={`#${section.title.toLowerCase().replace(' ', '-')}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="glass p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-bold">{section.title}</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{section.content}</p>
                    </motion.a>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
            >
                {sections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        id={section.title.toLowerCase().replace(' ', '-')}
                        className="glass rounded-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            {index === 0 && (
                                <>
                                    <h3>Using the Solver</h3>
                                    <ol>
                                        <li>Enter your boolean formula in the input field</li>
                                        <li>Use the buttons or type operators directly</li>
                                        <li>Click &quot;Solve SAT&quot; to get the result</li>
                                        <li>View the assignment or error message</li>
                                    </ol>

                                    <h3>Syntax Rules</h3>
                                    <ul>
                                        <li>Variables: lowercase letters, underscores, and numbers (e.g., <code>a1</code>, <code>var_2</code>)</li>
                                        <li>Operators: <code>&</code> (AND), <code>|</code> (OR), <code>~</code> (NOT), <code>-&gt;</code> (IMPLY), <code>&lt;-&gt;</code> (EQUIV)</li>
                                        <li>Constants: <code>T</code> (True), <code>F</code> (False)</li>
                                        <li>Parentheses for grouping expressions</li>
                                    </ul>
                                </>
                            )}

                            {index === 1 && (
                                <>
                                    <h3>REST API Endpoint</h3>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                                        {`POST /marina
Content-Type: application/json

{
  "prop": "(a & b) -> c"
}

Response:
{
  "assignment": "(a,true) (b,true) (c,true)",
  "error": null
}`}
                                    </pre>

                                    <h3>Error Responses</h3>
                                    <ul>
                                        <li><code>400</code>: Bad request (missing formula)</li>
                                        <li><code>500</code>: Internal server error</li>
                                        <li><code>200</code> with error field: Parsing error</li>
                                    </ul>
                                </>
                            )}

                            {index === 2 && (
                                <>
                                    <h3>IF-expression Normalization</h3>
                                    <p>
                                        Marina uses the IF-expression normalization technique for SAT solving. This approach:
                                    </p>
                                    <ul>
                                        <li>Converts boolean formulas to IF-expressions</li>
                                        <li>Normalizes expressions to reduce complexity</li>
                                        <li>Performs efficient satisfiability checking</li>
                                        <li>Returns partial assignments when possible</li>
                                    </ul>

                                    <h3>Performance Characteristics</h3>
                                    <ul>
                                        <li>Worst-case exponential time complexity (like all SAT solvers)</li>
                                        <li>Optimized for typical boolean formulas</li>
                                        <li>Efficient memory usage</li>
                                        <li>Supports formulas with hundreds of variables</li>
                                    </ul>
                                </>
                            )}

                            {index === 3 && (
                                <>
                                    <h3>Basic Examples</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-bold mb-2">Simple AND</h4>
                                            <code className="block mb-2">a & b</code>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Both variables must be true</p>
                                        </div>

                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-bold mb-2">Implication Chain</h4>
                                            <code className="block mb-2">(a & b) -&gt; (c | d)</code>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">If a and b are true, then c or d must be true</p>
                                        </div>

                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-bold mb-2">Contradiction</h4>
                                            <code className="block mb-2">a & ~a</code>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Always unsatisfiable (UNSAT)</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}