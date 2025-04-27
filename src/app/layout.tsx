
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import { ToastProvider } from '@/components/ui/toast' // Assuming ToastContainer is defined to display toasts

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LA_LIT',
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
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </ToastProvider>
    </html>
  )
}
