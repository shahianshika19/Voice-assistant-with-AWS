
// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import ReactMarkdown from 'react-markdown'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent } from '@/components/ui/card'
// import Sentiment from 'sentiment'
// import { GoogleGenerativeAI } from "@google/generative-ai"
// import SpeechToText from './SpeechToText';
// type Message = {
//   role: 'user' | 'model'
//   text: string
//   sentiment?: string
//   score?: number
//   timestamp?: string
// }

// type ChatSession = {
//   id: string
//   date: string
//   time: string
//   messages: Message[]
// }

// export default function Chatbot() {
  
//   const createNewSession = (): ChatSession => {
//     const now = new Date()
//     const id = `${now.toISOString().slice(2, 10).replace(/-/g, '')}_${now.toTimeString().slice(0, 5).replace(':', '')}`
//     return {
//       id,
//       date: now.toISOString().slice(0, 10),
//       time: now.toTimeString().slice(0, 5),
//       messages: [
//         {
//           role: 'user',
//           text: "Your name is ShahiGPT. You are a support assistant at an e-commerce platform called Snikre, a company specializing in premium brand shoes. Snikre is the ultimate destination for luxury footwear, offering a curated collection for Gen Z with exclusive collaborations and the latest drops from top-tier brands. You can explore the frontpage collection here: https://www.snikre.com/collections/frontpage. Snikre is committed to making luxury accessible with competitive pricing on premium sneakers, boots, and more: https://www.snikre.com. The platform ensures a seamless shopping experience with secure checkouts, reliable shipping, and a 7-day return policy: https://www.snikre.com/pages/return-and-refund. Our diverse range of products includes high-performance running shoes, which you can browse here: https://www.snikre.com/collections/running-shoes. Thank you for assisting customers with their needs and helping them discover Snikre’s exceptional offerings! (if you don't have relevant links to provide, give this https://snikre.com). firstly ask the language to continue and next ask about the product. Respond in nice MD format"
//         },
//         {
//           role: 'model',
//           text: '**Hey!** How can I help you today?',
//         },
//       ],
//     }
//   }

//   const [input, setInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentSession, setCurrentSession] = useState<ChatSession>(() => createNewSession())
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || '')
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

//   const saveToLocalStorage = (sessions: ChatSession[]) => {
//     localStorage.setItem('chatHistories', JSON.stringify(sessions))
//   }

//   const loadSessionsFromLocalStorage = (): ChatSession[] => {
//     const savedSessions = localStorage.getItem('chatHistories')
//     return savedSessions ? JSON.parse(savedSessions) : []
//   }

//   const updateSessionHistory = (newSession: ChatSession) => {
//     const allSessions = loadSessionsFromLocalStorage()
//     allSessions.push(newSession)
//     saveToLocalStorage(allSessions)
//   }

//   const sendMessageToGemini = async (message: string) => {
//     try {
//       const chat = model.startChat({
//         history: currentSession.messages.map((msg) => ({
//           role: msg.role,
//           parts: [{ text: msg.text }],
//         })),
//       })

//       const response = await chat.sendMessageStream(message)
//       let responseText = ''

//       for await (const chunk of response.stream) {
//         responseText += chunk.text()
//       }

//       return responseText
//     } catch (error) {
//       console.error('Error interacting with Gemini API:', error)
//       throw new Error('Failed to get response from Gemini API.')
//     }
//   }

//   const analyzeSentiment = (text: string) => {
//     const sentiment = new Sentiment()
//     const result = sentiment.analyze(text)
//     const sentimentLabel = result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral'
//     return { sentiment: sentimentLabel, score: result.score }
//   }

//   const sendMessage = async () => {
//     if (!input.trim()) return

//     const userMessage: Message = {
//       role: 'user',
//       text: input,
//       timestamp: new Date().toISOString(),
//     }
//     const sentimentData = analyzeSentiment(input)
//     userMessage.sentiment = sentimentData.sentiment
//     userMessage.score = sentimentData.score

//     const updatedMessages = [...currentSession.messages, userMessage]
//     setCurrentSession((prev) => ({ ...prev, messages: updatedMessages }))

//     setInput('')
//     setIsLoading(true)

//     try {
//       const botResponse = await sendMessageToGemini(input)

//       const botMessage: Message = {
//         role: 'model',
//         text: botResponse,
//         timestamp: new Date().toISOString(),
//       }

//       setCurrentSession((prev) => {
//         const updated = { ...prev, messages: [...prev.messages, botMessage] }
//         updateSessionHistory(updated)
//         return updated
//       })
//     } catch (error) {
//       console.error('Error sending message:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     const savedSessions = loadSessionsFromLocalStorage()
//     if (savedSessions.length) {
//       saveToLocalStorage([...savedSessions, currentSession])
//     } else {
//       saveToLocalStorage([currentSession])
//     }
//   }, [currentSession])

//   return (
//     <div className="h-[80vh] mx-auto max-w-7xl px-4 py-4">
//       <h1 className="text-2xl font-bold mb-4">Chat with ShahiGPT</h1>
//       <Card className="mb-4">
//         <CardContent>
//           <div className="h-[70vh] pt-6 overflow-y-auto">
//             {currentSession.messages.slice(1).map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
//               >
//                 <span
//                   className={`inline-block max-w-[60rem] py-2 px-4 rounded-lg ${message.role === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
//                     }`}
//                 >
//                   <ReactMarkdown>{message.text}</ReactMarkdown>
//                   {/* {message.role === 'user' && (
//                     <span className="block text-sm mt-1 text-gray-500">
//                       Sentiment: {message.sentiment} (Score: {message.score})
//                     </span>
//                   )} */}
//                 </span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex space-x-2  ">
//         <Input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <Button onClick={sendMessage} disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send'}
//         </Button>
//       </div>
//     </div>
//   )
// }

// =============================================================================================
// =============================================================================================
// =============================================================================================
// =============================================================================================
// =============================================================================================
// =============================================================================================
// =============================================================================================

// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import ReactMarkdown from 'react-markdown'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import Sentiment from 'sentiment'
// import { GoogleGenerativeAI } from "@google/generative-ai"

// type Message = {
//   role: 'user' | 'model'
//   text: string
//   sentiment?: string
//   score?: number
//   timestamp?: string
// }

// type ChatSession = {
//   id: string
//   date: string
//   time: string
//   messages: Message[]
// }

// export default function Chatbot() {
//   const [input, setInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentSession, setCurrentSession] = useState<ChatSession>(() => createNewSession())
//   const [isListening, setIsListening] = useState(false)
//   const recognitionRef = useRef<any>(null)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || '')
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

//   function createNewSession(): ChatSession {
//     const now = new Date()
//     const id = `${now.toISOString().slice(2, 10).replace(/-/g, '')}_${now.toTimeString().slice(0, 5).replace(':', '')}`
//     return {
//       id,
//       date: now.toISOString().slice(0, 10),
//       time: now.toTimeString().slice(0, 5),
//       messages: [
//         {
//           role: 'user',
//           text: "Your name is ShahiGPT. You are a support assistant...",
//         },
//         {
//           role: 'model',
//           text: '**Hey!** How can I help you today?',
//         },
//       ],
//     }
//   }

//   const speak = (text: string) => {
//     const utterance = new SpeechSynthesisUtterance(text)
//     utterance.lang = 'en-US'
//     speechSynthesis.speak(utterance)
//   }

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.continuous = false
//       recognition.interimResults = false
//       recognition.lang = 'en-US'

//       recognition.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript
//         setInput(transcript)
//         sendMessage(transcript)
//       }

//       recognition.onerror = (event: any) => {
//         console.error("Speech recognition error:", event.error)
//       }

//       recognitionRef.current = recognition
//     } else {
//       alert('Speech recognition is not supported in this browser.')
//     }
//   }, [])

//   const toggleListening = () => {
//     if (!recognitionRef.current) return
//     if (isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     } else {
//       recognitionRef.current.start()
//       setIsListening(true)
//     }
//   }

//   const sendMessageToGemini = async (message: string) => {
//     try {
//       const chat = model.startChat({
//         history: currentSession.messages.map((msg) => ({
//           role: msg.role,
//           parts: [{ text: msg.text }],
//         })),
//       })

//       const response = await chat.sendMessageStream(message)
//       let responseText = ''

//       for await (const chunk of response.stream) {
//         responseText += chunk.text()
//       }

//       return responseText
//     } catch (error) {
//       console.error('Error interacting with Gemini API:', error)
//       throw new Error('Failed to get response from Gemini API.')
//     }
//   }

//   const analyzeSentiment = (text: string) => {
//     const sentiment = new Sentiment()
//     const result = sentiment.analyze(text)
//     const sentimentLabel = result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral'
//     return { sentiment: sentimentLabel, score: result.score }
//   }

//   const sendMessage = async (overrideInput?: string) => {
//     const messageText = overrideInput || input
//     if (!messageText.trim()) return

//     const userMessage: Message = {
//       role: 'user',
//       text: messageText,
//       timestamp: new Date().toISOString(),
//     }
//     const sentimentData = analyzeSentiment(messageText)
//     userMessage.sentiment = sentimentData.sentiment
//     userMessage.score = sentimentData.score

//     const updatedMessages = [...currentSession.messages, userMessage]
//     setCurrentSession((prev) => ({ ...prev, messages: updatedMessages }))
//     setInput('')
//     setIsLoading(true)

//     try {
//       const botResponse = await sendMessageToGemini(messageText)

//       const botMessage: Message = {
//         role: 'model',
//         text: botResponse,
//         timestamp: new Date().toISOString(),
//       }

//       speak(botResponse)

//       setCurrentSession((prev) => {
//         const updated = { ...prev, messages: [...prev.messages, botMessage] }
//         updateSessionHistory(updated)
//         return updated
//       })
//     } catch (error) {
//       console.error('Error sending message:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const saveToLocalStorage = (sessions: ChatSession[]) => {
//     localStorage.setItem('chatHistories', JSON.stringify(sessions))
//   }

//   const loadSessionsFromLocalStorage = (): ChatSession[] => {
//     const savedSessions = localStorage.getItem('chatHistories')
//     return savedSessions ? JSON.parse(savedSessions) : []
//   }

//   const updateSessionHistory = (newSession: ChatSession) => {
//     const allSessions = loadSessionsFromLocalStorage()
//     allSessions.push(newSession)
//     saveToLocalStorage(allSessions)
//   }

//   useEffect(() => {
//     const savedSessions = loadSessionsFromLocalStorage()
//     if (savedSessions.length) {
//       saveToLocalStorage([...savedSessions, currentSession])
//     } else {
//       saveToLocalStorage([currentSession])
//     }
//   }, [currentSession])

//   return (
//     <div className="h-[80vh] mx-auto max-w-7xl px-4 py-4">
//       <h1 className="text-md font-bold mb-4">Chat with ShahiGPT</h1>
//       <Card className="mb-4">
//         <CardContent>
//           <div className="h-[60vh] pt-6 overflow-y-auto">
//             {currentSession.messages.slice(1).map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
//               >
//                 <span
//                   className={`inline-block max-w-[60rem] py-2 px-4 rounded-lg ${message.role === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
//                     }`}
//                 >
//                   <ReactMarkdown>{message.text}</ReactMarkdown>
//                 </span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex space-x-2">
//         <Button 
//           className={`${isListening ? 'rounded-[20%]' : 'rounded-full'} w-[70px] h-[70px] mb-5 mx-auto`} 
//           onClick={toggleListening} 
//           variant={isListening ? "destructive" : "default"}>
//           {isListening ? 'Stop' : 'Speak'}
//         </Button>
//       </div>
//     </div>
//   )
// }



// ========================
// ========================
// ========================
// ========================
// ========================

'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Sentiment from 'sentiment'
import { GoogleGenerativeAI } from "@google/generative-ai"

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

export default function Chatbot() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentSession, setCurrentSession] = useState<ChatSession>(() => createNewSession())
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API || '')
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  function createNewSession(): ChatSession {
    const now = new Date()
    const id = `${now.toISOString().slice(2, 10).replace(/-/g, '')}_${now.toTimeString().slice(0, 5).replace(':', '')}`
    return {
      id,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      messages: [
        {
          role: 'user',
          text: "Your name is ShahiGPT. You are a support assistant...",
        },
        // {
        //   role: 'model',
        //   text: '**Hey!** How can I help you today?',
        // },
      ],
    }
  }

  const speak = (text: string) => {
    speechSynthesis.cancel() // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        sendMessage(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      alert('Speech recognition is not supported in this browser.')
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current || isSpeaking) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      speechSynthesis.cancel()
      recognitionRef.current.start()
    }

    setIsListening(!isListening)
  }

  const stopSpeaking = () => {
      speechSynthesis.cancel()
    setIsSpeaking(!isSpeaking)
  }

  const sendMessageToGemini = async (message: string) => {
    try {
      const chat = model.startChat({
        history: currentSession.messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      })

      const query = `${message}. Respod in less than 100 words`;

      const response = await chat.sendMessageStream(query)
      let responseText = ''

      for await (const chunk of response.stream) {
        responseText += chunk.text()
      }

      return responseText
    } catch (error) {
      console.error('Error interacting with Gemini API:', error)
      throw new Error('Failed to get response from Gemini API.')
    }
  }

  const analyzeSentiment = (text: string) => {
    const sentiment = new Sentiment()
    const result = sentiment.analyze(text)
    const sentimentLabel = result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral'
    return { sentiment: sentimentLabel, score: result.score }
  }

  const sendMessage = async (overrideInput?: string) => {
    const messageText = overrideInput || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
      ...analyzeSentiment(messageText),
    }

    const updatedMessages = [...currentSession.messages, userMessage]
    setCurrentSession((prev) => ({ ...prev, messages: updatedMessages }))
    setInput('')
    setIsLoading(true)

    try {
      const botResponse = await sendMessageToGemini(messageText)

      const botMessage: Message = {
        role: 'model',
        text: botResponse,
        timestamp: new Date().toISOString(),
      }

      speak(botResponse)

      setCurrentSession((prev) => {
        const updated = { ...prev, messages: [...prev.messages, botMessage] }
        updateSessionHistory(updated)
        return updated
      })
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveToLocalStorage = (sessions: ChatSession[]) => {
    localStorage.setItem('chatHistories', JSON.stringify(sessions))
  }

  const loadSessionsFromLocalStorage = (): ChatSession[] => {
    const savedSessions = localStorage.getItem('chatHistories')
    return savedSessions ? JSON.parse(savedSessions) : []
  }

  const updateSessionHistory = (newSession: ChatSession) => {
    const allSessions = loadSessionsFromLocalStorage().filter(s => s.id !== newSession.id)
    saveToLocalStorage([...allSessions, newSession])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession.messages])

  return (
    <div className="h-[80vh] mx-auto max-w-7xl px-4 py-4">
      <h1 className="text-md font-bold mb-4">Chat with ShahiGPT</h1>
      <Card className="mb-4">
        <CardContent>
          <div className="h-[60vh] pt-6 overflow-y-auto">
            {currentSession.messages.slice(1).map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block max-w-[60rem] py-2 px-4 rounded-lg ${message.role === 'user'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>
      <div className="flex space-x-2">
        { !isSpeaking &&  <Button
          className={`${isListening ? 'rounded-[20%]' : 'rounded-full'} w-[70px] h-[70px] mb-5 mx-auto`}
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}>
          {isListening ? 'Stop' : 'Speak'}
        </Button>}
        { isSpeaking && <Button
          className={`rounded-full w-[70px] h-[70px] mb-5 mx-auto`}
          onClick={stopSpeaking}
          variant={"destructive"}>
          {'Shut'}
        </Button>}
      </div>
    </div>
  )
}
