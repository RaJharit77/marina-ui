const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://marina-solver-sat-rajharit77.onrender.com';

export interface SolveResponse {
    assignment: string | null
    error: string | null
}

export async function solveSAT(formula: string): Promise<SolveResponse> {
    try {
        const response = await fetch(`${BACKEND_URL}/marina`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prop: formula }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return {
            assignment: data.assignment,
            error: data.error
        }
    } catch (error) {
        console.error('Error solving SAT:', error)
        return {
            assignment: null,
            error: error instanceof Error ? error.message : 'Network error occurred'
        }
    }
}