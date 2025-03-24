<<<<<<< HEAD
# Read Spark
=======
# ReadSpark

ReadSpark is an AI-powered documentation generator that helps you create beautiful README files, documentation, and profile pages using the power of AI. Built with Next.js, MongoDB, and Google's Gemini AI.

## Features

- 🤖 AI-powered documentation generation
- 📝 Multiple document types (README, Profile, Documentation)
- 👀 Real-time markdown preview
- 🌓 Dark/Light theme support
- 🔒 Authentication with GitHub
- 💾 Project management with MongoDB
- 🎨 Modern UI with Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/readspark.git
cd readspark
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_gemini_api_key
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Google Gemini AI](https://ai.google.dev/) - AI model
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Project Structure

```
readspark/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── models/          # MongoDB models
├── public/              # Static files
└── package.json         # Dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
>>>>>>> 640d4cb (Convert project to Next.js with modern UI and improved functionality)
