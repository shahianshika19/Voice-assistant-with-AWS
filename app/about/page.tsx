import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const teamMembers = [
  { name: 'Anshika Shahi', role: 'Full Stack Developer and AI Developer', github: 'https://github.com/shahianshika19', linkedin: 'https://www.linkedin.com/in/anshikas2003' },
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Our Project</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Project Goals</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our project aims to demonstrate the power of AI in sentiment analysis and
          customer support. We&apos;ve built a platform that combines advanced natural language
          processing for sentiment analysis with an intelligent chatbot to provide efficient and
          insightful customer service solutions.
        </p>
        
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

