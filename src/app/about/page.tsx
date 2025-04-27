import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const teamMembers = [
  { name: 'John Doe', role: 'Full Stack Developer', github: '#', linkedin: '#' },
  { name: 'Jane Smith', role: 'AI Specialist', github: '#', linkedin: '#' },
  { name: 'Mike Johnson', role: 'UI/UX Designer', github: '#', linkedin: '#' },
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Our Project</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Project Goals</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our hackathon project aims to demonstrate the power of AI in sentiment analysis and
          customer support. We&apos;ve built a platform that combines advanced natural language
          processing for sentiment analysis with an intelligent chatbot to provide efficient and
          insightful customer service solutions.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Next.js for the frontend and API routes</li>
          <li>React for building user interfaces</li>
          <li>TypeScript for type-safe code</li>
          <li>ShadCN UI for styled components</li>
          <li>Gemini AI for natural language processing</li>
        </ul>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex space-x-4">
                <a href={member.github} className="text-gray-600 hover:text-gray-800">
                  <FaGithub size={24} />
                </a>
                <a href={member.linkedin} className="text-gray-600 hover:text-gray-800">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

