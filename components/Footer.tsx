import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} KGP NLP Challenge. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaGithub size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

