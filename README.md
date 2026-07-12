# Daggy AI 🤖

A general-purpose conversational AI assistant that can chat and execute commands.

## Features

- 💬 Natural language chat with Google Gemini AI
- ⚡ Command-based interactions
- 🔄 Real-time responses
- 🧪 Comprehensive test coverage (TDD)
- 🚀 Easy to extend

## Quick Start

### Prerequisites

- Node.js (v14+)
- Google Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Daggyai/Daggysie.git
cd Daggysie
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```

### Chat with AI
```
POST /api/chat
Content-Type: application/json

{
  "message": "Hello, how are you?"
}
```

### Execute Command
```
POST /api/command
Content-Type: application/json

{
  "command": "search",
  "args": ["javascript", "tutorial"]
}
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
Daggysie/
├── services/
│   ├── geminiService.js       # Gemini AI integration
│   └── commandParser.js       # Parse chat vs commands
├── __tests__/
│   ├── gemini.test.js
│   ├── geminiService.test.js
│   ├── commandParser.test.js
│   └── server.test.js
├── server.js                  # Express server
├── package.json
├── .env.example
└── README.md
```

## Development Approach

This project uses **Test-Driven Development (TDD)**:
1. 🔴 Write failing tests first
2. 🟢 Implement code to pass tests
3. 🔵 Refactor and improve

## Next Steps

- [ ] Add file system operations
- [ ] Implement web search capability
- [ ] Build React frontend
- [ ] Add WebSocket support
- [ ] Deploy to cloud

## License

MIT

## Author

Daggyai