// Gemini API Service
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async chat(message) {
    if (!message || typeof message !== 'string') {
      throw new Error('Message must be a non-empty string');
    }

    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  async processCommand(command, args = []) {
    if (!command) {
      throw new Error('Command is required');
    }

    const commandMessage = `Execute this command: ${command} with args: ${JSON.stringify(args)}`;
    return this.chat(commandMessage);
  }
}

module.exports = GeminiService;