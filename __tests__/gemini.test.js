// Test: Initialize Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');

describe('Gemini API Integration', () => {
  let genAI;

  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test_key_12345';
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  });

  test('should initialize Gemini API with valid key', () => {
    expect(genAI).toBeDefined();
  });

  test('should have getGenerativeModel method', () => {
    expect(typeof genAI.getGenerativeModel).toBe('function');
  });

  test('should throw error if API key is missing', () => {
    expect(() => {
      new GoogleGenerativeAI(null);
    }).toThrow();
  });
});