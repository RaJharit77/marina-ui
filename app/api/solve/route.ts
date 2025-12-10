import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { formula } = body
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://marina-solver-sat-rajharit77.onrender.com'

        if (!formula) {
            return NextResponse.json(
                { error: 'Formula is required' },
                { status: 400 }
            )
        }

        const response = await fetch(`${apiUrl}/marina`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prop: formula }),
        })

        const data = await response.json()

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}