// Command Parser Service
class CommandParser {
  constructor() {
    this.commandPrefix = '/';
  }

  parse(input) {
    if (!input || input.trim() === '') {
      throw new Error('Input cannot be empty');
    }

    const trimmedInput = input.trim();

    if (trimmedInput.startsWith(this.commandPrefix)) {
      return this.parseCommand(trimmedInput);
    } else {
      return this.parseChat(trimmedInput);
    }
  }

  parseCommand(input) {
    const parts = input.slice(1).split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    return {
      type: 'command',
      command,
      args,
    };
  }

  parseChat(input) {
    return {
      type: 'chat',
      message: input,
    };
  }
}

module.exports = CommandParser;