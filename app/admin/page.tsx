'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody as Tbody, TableRow as Tr, TableCaption as Td, TableHead as Th } from '@/components/ui/table'

type Message = {
    role: 'user' | 'model'
    text: string
    sentiment?: string
    score?: number
    timestamp?: string
}

type ChatSession = {
    id: string
    date: string
    time: string
    messages: Message[]
}

export default function AdminDashboard() {
    const [sessions, setSessions] = useState<ChatSession[]>([])
    const router = useRouter()

    useEffect(() => {
        const data = localStorage.getItem('chatHistories')
        setSessions(data ? JSON.parse(data) : [])
    }, [])

    const calculateSentiment = (messages: Message[]) => {
        const userMessages = messages.filter((msg) => msg.role === 'user' && msg.sentiment)
        const totalScore = userMessages.reduce((acc, msg) => acc + (msg.score || 0), 0)
        const avgScore = userMessages.length ? totalScore / userMessages.length : 0
        const avgSentiment =
            avgScore > 0 ? 'positive' : avgScore < 0 ? 'negative' : 'neutral'

        return { avgSentiment, avgScore: avgScore.toFixed(2) }
    }

    const handleViewSession = (id: string) => {
        router.push(`/admin/${id}`)
    }

    const handleExportData = () => {
        const dataStr = JSON.stringify(sessions, null, 2)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `chat_data_${new Date().toISOString()}.json`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Card className="mb-6">
                <CardContent>
                    <div className="flex justify-between items-center p-4 mb-4">
                        <h2 className="text-xl">Chat Sessions</h2>
                        <Button onClick={handleExportData}>Export Data</Button>
                    </div>
                    <Table>
                        <thead>
                            <Tr>
                                <Th>Session ID</Th>
                                <Th>Date</Th>
                                <Th>Time</Th>
                                <Th>Avg Sentiment</Th>
                                <Th>Avg Score</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </thead>
                        <Tbody className="divide-y">
                            {sessions.map((session) => {
                                const { avgSentiment, avgScore } = calculateSentiment(
                                    session.messages
                                )
                                return (
                                    <Tr key={session.id}>
                                        <Td className='p-2'>{session.id}</Td>
                                        <Td className='p-2'>{session.date}</Td>
                                        <Td className='p-2'>{session.time}</Td>
                                        <Td className='p-2'>{avgSentiment}</Td>
                                        <Td className='p-2'>{avgScore}</Td>
                                        <Td className='p-2'>
                                            <Button className='flex items-center content-center bg-white shadow-none text-black hover:text-white' onClick={() => handleViewSession(session.id)}>
                                                View
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
