# Word Guessing Game

A simple React-based word guessing game where you click letters to guess the word. You have 8 lives before it's game over!

## Features

- Click on letter buttons to make guesses
- 8 lives/chances per word
- Visual feedback for correct/incorrect guesses
- Victory celebration with confetti effect when you win
- Clean UI with state-based styling

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool & dev server
- **clsx** - CSS className utility
- **react-confetti** - Victory celebration effect

## Getting Started

### Prerequisites
Node.js installed on your machine

### Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd my-react-app

# Install dependencies
npm install
# or
yarn install
```

### Run the Game
```bash
npm run dev
# or
yarn dev
```

Open your browser and visit `http://localhost:5173`

## How to Play

1. A random word is selected (hidden)
2. Click any letter button to guess
3. Correct letters are revealed in the word
4. Wrong guesses reduce your remaining lives
5. **Win** by guessing the complete word
6. **Lose** after 8 wrong guesses
7. Refresh to play again!

## Game States

- **Normal**: Default playing state
- **Success**: Word guessed correctly (confetti!)
- **Lost**: 8 wrong guesses reached

Enjoy the game! 🎉

## License  许可证

MIT License  MIT 许可证