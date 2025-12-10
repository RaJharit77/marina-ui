'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { solveSAT } from '@/lib/marinaClient'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeatureSection'
import FormulaInput from '@/components/solver/FormulaInput'
import ResultDisplay from '@/components/solver/ResultDisplay'
import ExamplesPanel from '@/components/examples/ExamplesPanel'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Calculator, BookOpen, HelpCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentFormula, setCurrentFormula] = useState('')

  const handleSelectExample = (formula: string) => {
    setCurrentFormula(formula)
    toast.success('Example loaded! Click "Solve SAT" to test it.')
  }

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
      <HeroSection />
      <FeaturesSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <FormulaInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialValue={currentFormula}
            onFormulaChange={setCurrentFormula}
          />
          <ResultDisplay result={result} error={error} formula={currentFormula} />
        </div>
        <div>
          <ExamplesPanel onSelectExample={handleSelectExample} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/solver"
            className="group p-6 glass rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all text-center block"
          >
            <div className="p-3 bg-linear-to-br from-primary-500 to-secondary-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">SAT Solver</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Interactive boolean formula solver with real-time results
            </p>
            <div className="flex items-center justify-center text-primary-600 dark:text-primary-400">
              <span className="text-sm">Try it now</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/examples"
            className="group p-6 glass rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all text-center block"
          >
            <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Examples</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Browse through example boolean formulas and puzzles
            </p>
            <div className="flex items-center justify-center text-primary-600 dark:text-primary-400">
              <span className="text-sm">Browse examples</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </Link>

          <Link
            href="/guide"
            className="group p-6 glass rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all text-center block"
          >
            <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Syntax Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Complete reference for boolean formula syntax and operators
            </p>
            <div className="flex items-center justify-center text-primary-600 dark:text-primary-400">
              <span className="text-sm">Learn syntax</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Quick Syntax Reference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        id="syntax"
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">Quick Syntax Reference</h2>
        <div className="font-mono bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-x-auto">
            {`<prop> ::=  T
          | F
          | <atom>
          | ~ <prop>
          | <prop> & <prop>
          | <prop> | <prop>
          | <prop> -> <prop>
          | <prop> <-> <prop>
          | (<prop>)
<atom> ::= ^[a-z_]+[0-9]*$`}
          </pre>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Use parentheses for complex expressions: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(a & b) -&gt; c</code></p>
          <p>• Variables must match regex: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[a-z_][0-9]*</code></p>
          <p>• White spaces are ignored during parsing</p>
          <p>• Invalid formulas raise specific exceptions</p>
        </div>
      </motion.div>
    </div>
  )
}