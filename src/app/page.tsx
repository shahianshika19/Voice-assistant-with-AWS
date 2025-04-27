import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Hackathon Project</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore sentiment analysis and chat with our AI-powered bot.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/sentiment-analysis">Try Sentiment Analysis</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/chatbot">Chat with our Bot</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Analyze customer feedback instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get insights into customer sentiments with our advanced AI-powered analysis tool.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Chatbot</CardTitle>
            <CardDescription>24/7 customer support</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Provide instant responses to customer queries with our intelligent chatbot.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Easy Integration</CardTitle>
            <CardDescription>Seamless API integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Easily integrate our services into your existing systems with our robust APIs.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

