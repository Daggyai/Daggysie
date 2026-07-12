// Express Server Setup
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const GeminiService = require('./services/geminiService');
const CommandParser = require('./services/commandParser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
let geminiService;
let commandParser;

try {
  geminiService = new GeminiService(process.env.GEMINI_API_KEY);
  commandParser = new CommandParser();
} catch (error) {
  console.error('Failed to initialize services:', error.message);
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Parse input (chat or command)
    const parsed = commandParser.parse(message);

    let response;
    if (parsed.type === 'command') {
      response = await geminiService.processCommand(parsed.command, parsed.args);
    } else {
      response = await geminiService.chat(message);
    }

    res.json({ response, type: parsed.type });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: error.message });
  }
});

// Command endpoint
app.post('/api/command', async (req, res) => {
  try {
    const { command, args } = req.body;

    if (!command) {
      return res.status(400).json({ error: 'Command is required' });
    }

    const response = await geminiService.processCommand(command, args || []);
    res.json({ response });
  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Daggy AI Server running on http://localhost:${PORT}`);
});

module.exports = app;