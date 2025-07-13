# Sylvie (Frontend)

Sylvie is a modern AI-powered student support chatbot, built to help UEA students access tailored, compassionate responses to questions about mental health, academic life, and university services. This repository contains the **frontend** of Sylvie, developed with [Next.js](https://nextjs.org) and React. For full functionality, it must be used in conjunction with the [`sylvie-backend`](https://github.com/harrymcdonagh/sylvie-backend) service.

## Features

- 💬 **Chat Interface**: Seamless, real-time messaging with persistent conversation history, avatars, and emotion-aware responses.
- 🔐 **Authentication**: Secure sign-up/sign-in via credentials using NextAuth.js with bcrypt hashing.
- 👤 **User Profiles**: Editable user profile with name, avatar, course, and year metadata used to personalise responses.
- 📚 **Help & About Pages**: Clear guidance on Sylvie’s purpose, usage tips, and limitations.
- 🌗 **Theme Support**: Toggle between light and dark mode.
- 📱 **Responsive Design**: Fully mobile-optimised UI for accessibility across devices.
- 💾 **MongoDB Integration**: All user data, conversations, and messages are stored using Mongoose.
- 🤖 **OpenAI Integration**: AI-powered responses using Retrieval-Augmented Generation (RAG) and custom prompt engineering.
- 🔍 **Conversation Search & Management**: Sidebar to view and navigate through historical conversations.

## Tech Stack

- **Framework**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui, Framer Motion, Lucide Icons
- **Auth**: NextAuth.js (credentials-based with optional OAuth support)
- **Database**: MongoDB (via Mongoose)
- **Forms**: React Hook Form
- **Markdown**: React Markdown
- **AI Integration**: OpenAI API via a FastAPI semantic search service

## Project Structure

- `app/`: Next.js app directory (routing, layouts, pages, API routes)
- `components/`: UI and feature components (chat, profile, help, landing, buttons, skeletons, etc.)
- `hooks/`: Custom React hooks
- `lib/`: Utility libraries (MongoDB connection, types, helpers)
- `models/`: Mongoose models for data
- `public/`: Static assets (images, SVGs)
- `utils/`: Utility functions (date, etc.)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**

   - Create a `.env.local` file based on your authentication, MongoDB, and OpenAI requirements.
   - Ensure the `sylvie-backend` service is running and accessible to the frontend.

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

## Configuration

- **TypeScript**: Strict mode, path aliases (`@/components`, etc.)
- **Tailwind CSS**: Configured in `app/globals.css`
- **Shadcn/ui**: Used for accessible UI primitives
- **NextAuth**: API routes in `app/api/auth/`
- **MongoDB**: Connection in `lib/mongodb.ts`, models in `models/`
