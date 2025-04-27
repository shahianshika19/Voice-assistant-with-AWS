
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import Header from '../components/Header'
import { ToastProvider } from '@radix-ui/react-toast'
import DisableInspect from '@/components/DisableInspect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LA_LIT | Your Custom Support Vala',
  description: 'Sentiment Analysis and Chatbot Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return ( 
    <html lang="en">
      <ToastProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <DisableInspect />
            <Analytics />
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </div>
        </body>
      </ToastProvider>
    </html>
  )
}
