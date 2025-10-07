# React Project Demo

A modern React application featuring multiple interactive components including authentication, a timer with logging, and a Wordle game clone. Built with React 19, Vite, TailwindCSS, and React Router.

## 🚀 Features

- **🔐 Authentication System**
  - Simple username-based login
  - Protected routes with automatic redirection
  - Session persistence via localStorage

- **⏱️ Timer Component**
  - Start, stop, continue, and restart functionality
  - Time logging with themes
  - Sortable logs (ascending/descending)
  - Log management (add themes, clear logs)
  - Multi-language support

- **🎮 Wordle Game**
  - Classic Wordle gameplay
  - 5-letter word guessing
  - Color-coded feedback (green, yellow, gray)
  - Win/lose detection
  - Virtual keyboard interface

- **⚙️ Settings**
  - Multi-language support (EN, ES, JP, FR, DE, IT, PT)
  - User profile customization
  - Language-specific UI translations

- **👤 Profile**
  - User dashboard
  - Welcome message

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.3
- **Styling**: TailwindCSS 3.3.5
- **Linting**: ESLint 9.36.0
- **Development**: Hot Module Replacement (HMR)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/JefersonSopanR/react-project-demo.git
cd react-project-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🗂️ Project Structure

```
react-project-demo/
├── src/
│   ├── Components/
│   │   ├── Login.jsx          # Login page component
│   │   ├── Profile.jsx        # User profile page
│   │   ├── Settings.jsx       # Settings and language selection
│   │   ├── Timer.jsx          # Timer with logging functionality
│   │   └── Wordle.jsx         # Wordle game component
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state management
│   │   ├── TimerContext.jsx   # Timer state management
│   │   └── WordleContext.jsx  # Wordle game state management
│   ├── assets/
│   │   └── react.svg          # React logo
│   ├── App.jsx                # Main app component with routing
│   ├── App.css                # App-specific styles
│   ├── main.jsx               # Application entry point
│   └── main.css               # Global styles (Tailwind directives)
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # TailwindCSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
└── package.json               # Project dependencies and scripts
```

## 🎯 Usage Guide

### Login
1. Enter any username on the login page
2. Click "Enter" to access the application
3. Your session will be saved in localStorage

### Timer
1. Navigate to the Timer page
2. Click "Start" to begin timing
3. Click "Stop" to pause and log the time
4. Add custom themes to your logs
5. Sort logs by clicking the sort button
6. Clear individual logs or all logs at once

### Wordle Game
1. Navigate to the Wordle page
2. Guess a 5-letter word
3. Use the on-screen keyboard or your physical keyboard
4. Green = correct letter in correct position
5. Yellow = correct letter in wrong position
6. Gray = letter not in the word
7. You have 5 attempts to guess the word

### Settings
1. Navigate to Settings
2. Choose your preferred language (EN, ES, JP, FR, DE, IT, PT)
3. The entire UI will update to reflect your selection

## 🌐 Supported Languages

- 🇬🇧 English (EN)
- 🇪🇸 Spanish (ES)
- 🇯🇵 Japanese (JP)
- 🇫🇷 French (FR)
- 🇩🇪 German (DE)
- 🇮🇹 Italian (IT)
- 🇵🇹 Portuguese (PT)

## 🔒 Authentication Flow

The app uses a simple client-side authentication system:
- Login stores a token in localStorage
- Protected routes check for the token
- Missing token redirects to `/login`
- Logout clears the token and redirects to login

> **Note**: This is a demo authentication system. For production, implement proper backend authentication with secure token management.

## 🎨 Styling

The project uses TailwindCSS with a custom glass-morphism design:
- Backdrop blur effects
- Gradient backgrounds
- Smooth transitions
- Responsive design
- Modern card-based layouts

## 🔧 Configuration Files

- **vite.config.js**: Vite build configuration with React plugin
- **tailwind.config.js**: TailwindCSS customization
- **postcss.config.js**: PostCSS with Tailwind and Autoprefixer
- **eslint.config.js**: ESLint rules for React and hooks

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

**Jeferson Sopan R**
- GitHub: [@JefersonSopanR](https://github.com/JefersonSopanR)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing fast development
- TailwindCSS for utility-first styling
- The Wordle game concept by Josh Wardle

---

**Note**: This is a demo project created for learning and demonstration purposes. It showcases React context API, routing, state management, and modern React patterns.
