'use client'

import { motion } from 'framer-motion'

export default function SyntaxGuide() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            id="syntax"
            className="glass rounded-2xl p-6"
        >
            <h2 className="text-2xl font-bold gradient-text mb-6">BNF Syntax</h2>
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
    )
}