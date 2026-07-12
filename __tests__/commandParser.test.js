// Test: Command Parser
const CommandParser = require('../services/commandParser');

describe('CommandParser', () => {
  let parser;

  beforeEach(() => {
    parser = new CommandParser();
  });

  test('should initialize parser', () => {
    expect(parser).toBeDefined();
  });

  test('should parse simple command', () => {
    const result = parser.parse('/help');
    expect(result.command).toBe('help');
  });

  test('should parse command with arguments', () => {
    const result = parser.parse('/search javascript tutorial');
    expect(result.command).toBe('search');
    expect(result.args).toEqual(['javascript', 'tutorial']);
  });

  test('should handle chat message (no command)', () => {
    const result = parser.parse('Hello, how are you?');
    expect(result.type).toBe('chat');
    expect(result.message).toBe('Hello, how are you?');
  });

  test('should recognize command prefix /', () => {
    const result = parser.parse('/execute code');
    expect(result.type).toBe('command');
  });

  test('should throw error on empty input', () => {
    expect(() => {
      parser.parse('');
    }).toThrow('Input cannot be empty');
  });
});