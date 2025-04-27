# Customizable Support Chatbot with Sentiment Analysis

This project is a smart e-commerce support chatbot built with **Next.js**, **Google Gemini API**, and **ShadCN UI components**. The chatbot provides real-time assistance to users, analyzes their sentiments, and stores all conversation data in the browser's `localStorage`. It also collects user feedback and saves it for future insights. For now I have taken a usecase as if it is a support assistant for an e-commerce store of shoes named [Snikre](https://www.snikre.com)(which is my brand itself).

## Features

- **AI-Powered Chatbot**: Powered by the Google Gemini API to provide intelligent responses.
- **Sentiment Analysis**: Analyzes the sentiment of user messages (positive, neutral, or negative).
- **Local Data Storage**: Stores conversation history and sentiment data in `localStorage` for persistence.
- **Feedback Collection**: Collects user feedback on products for sentiment tracking and insights.
- **Modern UI**: Built with ShadCN's elegant and responsive UI components.
- **Lightweight and Fast**: Optimized for performance and usability.

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AyushAwasthi2384/Support-System-Chatbot
   cd Support-System-Chatbot
   ```

2. **Install Dependencies**
   Make sure you have Node.js and npm/yarn installed. Then, install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root of your project and add your Google Gemini API key:
   ```bash
   GEMINI_API=your-google-gemini-api-key
   ```

4. **Run the Application**
   Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## How It Works

1. **User Interaction**: Users type messages in the chatbot interface.
2. **Sentiment Analysis**: Each user message is analyzed for sentiment using a lightweight sentiment analysis function.
3. **Response Generation**: The Google Gemini API generates intelligent responses based on the conversation context.
4. **Data Persistence**: 
   - The entire conversation, including sentiment data, is saved in the browser's `localStorage`.
   - Feedback for specific products is collected and also stored in `localStorage`.

---

## API Endpoints

### 1. Save Conversation
**Route**: `/api/save/conversation`  
**Method**: `POST`  
**Description**: Saves conversation data in `localStorage`.

### 2. Save Product Feedback
**Route**: `/api/save/product-feedback`  
**Method**: `POST`  
**Description**: Collects user feedback for products and stores it with relevant sentiment data.

### 3. Analyze Sentiment
**Route**: `/api/sentiment`  
**Method**: `POST`  
**Description**: Analyzes the sentiment of a given message.

---

## Technologies Used

- **Next.js**: Framework for building the application.
- **Google Gemini API**: For generative AI capabilities.
- **ShadCN**: For responsive and modern UI components.
- **React**: Frontend library for building the chatbot interface.
- **React-Markdown**: For rendering markdown in chat messages.
- **LocalStorage**: For storing conversation and feedback data.

---

## Future Enhancements

- Add user authentication for personalized experiences.
- Migrate from `localStorage` to a robust database like MongoDB.
- Enable exporting chat history for customer support teams.
- Add multi-language support for a global audience.

---

## Contributing

We welcome contributions to improve this project! To contribute:
1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- Google **Gemini API** for powerful and efficient NLP.
- ShadCN for their amazing **UI components**.

---

## Developed by [Ayush Awasthi🚀](https://www.github.com/AyushAwasthi2384) and team!
(in half an hour😉)