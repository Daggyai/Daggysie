// Test: GeminiService functionality
const GeminiService = require('../services/geminiService');

describe('GeminiService', () => {
  let service;

  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test_key_12345';
    service = new GeminiService(process.env.GEMINI_API_KEY);
  });

  test('should initialize with valid API key', () => {
    expect(service).toBeDefined();
    expect(service.model).toBeDefined();
  });

  test('should throw error if API key is missing', () => {
    expect(() => {
      new GeminiService(null);
    }).toThrow('GEMINI_API_KEY is required');
  });

  test('should throw error if message is empty', async () => {
    await expect(service.chat('')).rejects.toThrow('Message must be a non-empty string');
  });

  test('should throw error if message is not a string', async () => {
    await expect(service.chat(123)).rejects.toThrow('Message must be a non-empty string');
  });

  test('should throw error if command is missing', async () => {
    await expect(service.processCommand('')).rejects.toThrow('Command is required');
  });
});