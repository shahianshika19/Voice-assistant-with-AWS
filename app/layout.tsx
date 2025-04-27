import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import Header from '../components/Header'
import { ToastProvider } from '@radix-ui/react-toast'
import DisableInspect from '@/components/DisableInspect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShahiGPT | Your Custom Support Vala',
  description: 'Sentiment Analysis and Chatbot Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return ( 
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>ShahiGPT | Your Custom Support Vala</title>
      </head>
      <ToastProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <DisableInspect />
            <Analytics />
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </ToastProvider>
    </html>
  )
}
