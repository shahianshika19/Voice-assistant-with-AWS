'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SentimentAnalysis() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ sentiment: string; confidence: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeSentiment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error analyzing sentiment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sentiment Analysis</h1>
      <div className="mb-6">
        <Textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full"
        />
      </div>
      <Button onClick={analyzeSentiment} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </Button>
      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sentiment: {result.sentiment}</p>
            <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

