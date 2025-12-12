# Cody Memoria Agent

An empathetic AI conversational agent designed to curate family history through natural voice interviews, directly addressing the problem of irreplaceable stories being lost. Leveraging existing voice technology, intelligent dialogue management, and a modular architecture, the agent guides family members through themed interviews, asking culturally sensitive, context-aware follow-up questions to explore rich details.

## 🌟 Features

- **User Authentication**: Secure login with Clerk supporting email/password and OAuth providers
- **User Profiling**: Onboarding flow focused on emotional preferences and objectives for creating memories
- **Memory Creation**: Multi-step process to capture details about loved ones
- **Voice Cloning**: Integration with ElevenLabs for voice synthesis from uploaded audio samples
- **AI Avatars**: Anam.ai powered conversational avatars with custom personas
- **Interactive Conversations**: Real-time chat with memory avatars using voice and text
- **File Management**: Upload photos and audio files with Vercel Blob storage
- **Memory Exploration**: Browse and search memories by person, theme, or time period

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **AI Services**: 
  - Anam.ai API for conversational AI avatars
  - ElevenLabs API for voice synthesis and cloning
- **File Storage**: Vercel Blob for images and audio
- **State Management**: Zustand for client-side state
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.0 or later
- npm or yarn
- PostgreSQL database
- Git

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd cody-memoria
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cody-memoria"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY

# Anam.ai API
ANAM_API_KEY="your-anam-api-key"

# ElevenLabs API
ELEVENLABS_API_KEY="your-elevenlabs-api-key"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### 4. Database Setup

Initialize and migrate the database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
cody-memoria/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages (grouped)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/         # Main dashboard
│   │   ├── profile/           # User profile management
│   │   ├── memories/          # Memory management
│   │   │   ├── create/        # Memory creation flow
│   │   │   ├── [id]/          # Individual memory view
│   │   │   └── chat/[id]/     # Memory conversation interface
│   │   └── api/               # API routes
│   │       ├── auth/          # Clerk authentication endpoints
│   │       ├── memories/      # Memory CRUD operations
│   │       ├── upload/        # File upload handling
│   │       ├── anam/          # Anam.ai integration
│   │       └── elevenlabs/    # ElevenLabs integration
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── auth/             # Authentication components
│   │   ├── memory/           # Memory-related components
│   │   └── chat/             # Chat interface components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── db.ts             # Prisma client
│   │   ├── anam.ts           # Anam.ai API client
│   │   ├── elevenlabs.ts     # ElevenLabs API client
│   │   └── utils.ts          # General utilities
│   └── types/                # TypeScript type definitions
├── prisma/                   # Database schema and migrations
└── public/                   # Static assets
```

## 🔧 API Integration

### Clerk Setup

1. Sign up for a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in your Clerk Dashboard
3. Navigate to the [API keys page](https://dashboard.clerk.com/last-active?path=api-keys) in your Clerk Dashboard
4. Copy your Publishable Key and Secret Key
5. Add them to your `.env.local` file:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your publishable key
   - `CLERK_SECRET_KEY` - Your secret key

### Anam.ai Setup

1. Sign up for an Anam.ai account
2. Create an API key in your dashboard
3. Add the key to your `.env.local` file as `ANAM_API_KEY`

### ElevenLabs Setup

1. Create an ElevenLabs account
2. Generate an API key from your profile
3. Add the key to your `.env.local` file as `ELEVENLABS_API_KEY`

### Vercel Blob Storage

1. Create a Vercel account and project
2. Enable Blob storage in your project settings
3. Copy the read/write token to your environment variables

## 📝 Usage

### Creating a Memory

1. Navigate to the dashboard
2. Click "Create New Memory"
3. Fill in details about your loved one:
   - Name and relationship
   - Personality traits
   - Favorite memories
   - Upload a photo (optional)
   - Upload voice samples for cloning
4. The system will create an AI persona based on the information

### Chatting with Memories

1. Select a memory from your dashboard
2. Click "Start Conversation"
3. The AI avatar will engage in natural conversation
4. Voice responses are generated using the cloned voice
5. All conversations are saved and searchable

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Database Deployment

For production, use a managed PostgreSQL service:
- Vercel Postgres
- Supabase
- Railway
- AWS RDS

## 🛡️ Security & Privacy

- All data is encrypted in transit and at rest
- Voice samples and conversations are securely stored
- GDPR compliant data handling
- User data deletion capabilities
- Secure authentication with Clerk

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact support at [your-email@domain.com]

## 🙏 Acknowledgments

- Anam.ai for conversational AI technology
- ElevenLabs for voice cloning capabilities
- Vercel for hosting and blob storage
- The open-source community for the amazing tools and libraries

---

Made with ❤️ for preserving precious family memories.
