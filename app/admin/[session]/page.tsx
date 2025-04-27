'use client';

import { useEffect, useState } from 'react';

type Message = {
    role: 'user' | 'model';
    text: string;
    sentiment?: string;
    score?: number;
    timestamp?: string;
};

type ChatSession = {
    id: string;
    date: string;
    time: string;
    messages: Message[];
};

export default function AdminServicePage() {
    // const { service } = useParams();
    const service = 'session';
    const [data, setData] = useState<ChatSession[] | string | null>(null);
    const [sessions, setSessions] = useState<ChatSession[]>([]); 

    useEffect(() => {
        // Simulate fetching localStorage or API data
        const data = localStorage.getItem('chatHistories');
        console.log(data)
        setSessions(data ? JSON.parse(data) : []);
    }, []);

    useEffect(() => {
        console.log(sessions) 
        if (service === 'session') {
            setData(sessions);
        } else if (service === 'analytics') {
            setData('Analytics Data Coming Soon');
        } else {
            setData(null); // Fallback for unknown services
        }
    }, [service, sessions]);

    if (!data) {
        return <div className="container mx-auto text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold capitalize mb-6">{service} Dashboard</h1>
            {service === 'session' && (
                <div>
                    <h2 className="text-xl mb-4">Chat Sessions</h2>
                    <ul>
                        {sessions.map((session) => (
                            <li key={session.id} className="border p-4 rounded mb-4">
                                <p>
                                    <strong>ID:</strong> {session.id}
                                </p>
                                <p>
                                    <strong>Date:</strong> {session.date} | <strong>Time:</strong>{' '}
                                    {session.time}
                                </p>
                                <div>
                                    <strong>Messages:</strong>
                                    <ul>
                                        {session.messages.map((message, index) => (
                                            <li key={index} className="mt-2">
                                                <strong>{message.role === 'user' ? 'User' : 'Model'}:</strong> {message.text}
                                                {message.timestamp && (
                                                    <div className="text-sm text-gray-500">
                                                        <strong>Time:</strong> {new Date(message.timestamp).toLocaleString()}
                                                    </div>
                                                )}
                                                {message.sentiment && (
                                                    <div className="text-sm">
                                                        <strong>Sentiment:</strong> {message.sentiment} ({message.score})
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* {service === 'analytics' && (
                <div>
                    <h2 className="text-xl mb-4">Analytics</h2>
                    <p>Analytics feature is under construction 🚧</p>
                </div>
            )} */}
        </div>
    );
}
