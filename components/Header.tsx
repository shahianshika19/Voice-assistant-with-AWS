import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LA_LIT
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/sentiment-analysis">Sentiment Analysis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chatbot">Chatbot</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          {/* <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button> */}
        </div>
      </nav>
    </header>
  )
}

