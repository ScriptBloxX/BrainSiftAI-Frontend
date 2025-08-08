# 🧠 BrainSiftAI - Next.js Frontend

**BrainSiftAI** is an innovative AI-powered platform that transforms educational content into interactive exams and comprehensive summaries. Upload PDFs or text content, and let our advanced AI generate relevant, high-quality exam questions automatically.

## 🌟 Features

### Core Functionality
- **AI-Generated Exams**: Upload PDFs or text content and automatically generate relevant exam questions
- **Content Summaries**: Get concise, AI-generated summaries to help students review before exams
- **Real-time Exam Taking**: Interactive exam interface with timer, progress tracking, and instant feedback
- **Exam Preview & Sharing**: Preview exams before publishing and share with students via secure links
- **Public Exam Discovery**: Explore community-created exams through the public exam gallery

### User Experience
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Real-time Feedback**: Instant results with detailed answer explanations
- **Performance Analytics**: Track exam performance with detailed scoring and analytics
- **Content Management**: Organize and manage your exams through an intuitive dashboard

### Security & Privacy
- **Authentication System**: Secure user authentication with JWT tokens
- **Privacy Controls**: Choose between public and private exams
- **Data Protection**: Industry-standard security measures for user data
- **Role-based Access**: Different user roles (user, admin, sadmin) with appropriate permissions

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.2.3** - React framework with App Router
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI Components** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library for smooth interactions
- **shadcn/ui** - Modern component library built on Radix UI

### State Management & API
- **React Context** - Global state management for authentication
- **Axios** - HTTP client for API communications
- **React Hot Toast** - Elegant toast notifications

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
BrainSiftAI-Frontend/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── blog/                     # Blog section
│   ├── contact/                  # Contact page
│   ├── create-exam/              # Exam creation interface
│   ├── dashboard/                # User dashboard
│   ├── exam/[id]/               # Individual exam pages
│   ├── exam-preview/[id]/       # Exam preview pages
│   ├── explore/                  # Public exam discovery
│   ├── features/                 # Features showcase
│   ├── help/                     # Help center
│   ├── login/                    # Authentication pages
│   ├── pricing/                  # Pricing information
│   ├── security/                 # Security information
│   ├── settings/                 # User settings
│   ├── tutorials/                # Tutorial pages
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # UI component library
│   ├── auth-context.tsx         # Authentication context
│   ├── navbar.tsx               # Navigation component
│   ├── footer.tsx               # Footer component
│   └── theme-provider.tsx       # Theme management
├── lib/                         # Utility libraries
│   ├── axios.ts                 # API configuration
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   ├── bg-home/                 # Background images
│   ├── teams/                   # Team member photos
│   └── *.svg                    # Icons and logos
└── Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ScriptBloxX/BrainSiftAI-Frontend.git
   cd BrainSiftAI-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Key Features Deep Dive

### Exam Creation Workflow
1. **Content Upload**: Upload PDF files or paste text content
2. **AI Processing**: Advanced AI analyzes content and identifies key concepts
3. **Question Generation**: AI creates relevant multiple-choice questions
4. **Preview & Customize**: Review and modify generated questions
5. **Publish & Share**: Make exams public or share private links

### Exam Taking Experience
- **Interactive Interface**: Clean, distraction-free exam environment
- **Timer System**: Configurable time limits with visual countdown
- **Progress Tracking**: Real-time progress indicators
- **Instant Results**: Immediate scoring with detailed explanations
- **Content Summary**: Optional study summaries before exam start

### Dashboard Features
- **Exam Management**: View, edit, and manage created exams
- **Performance Analytics**: Track completion rates and scores
- **Exam History**: Review past exam attempts and results
- **Credit System**: Monitor remaining AI generation credits

## 🎨 Design System

### Theme Support
- Light and dark mode compatibility
- System preference detection
- Smooth theme transitions
- Consistent color palette across modes

### Component Architecture
- Modular, reusable components
- Accessible design patterns
- Responsive layouts
- Type-safe prop interfaces

### Animation & Interactions
- Smooth page transitions
- Hover and focus states
- Loading states and skeletons
- Interactive background effects

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permission levels
- **Data Validation**: Client and server-side validation
- **Privacy Controls**: Public/private exam settings
- **Secure API Communication**: HTTPS and proper headers

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with side navigation
- **Tablet**: Optimized layout with touch-friendly interfaces
- **Mobile**: Streamlined mobile experience with bottom navigation

## 🔧 API Integration

The frontend integrates with a backend API for:
- User authentication and management
- Exam creation and storage
- AI-powered question generation
- Performance analytics
- Content processing

## 🎓 User Types & Permissions (Not for sale)

### Free Users
- 3 exams per week
- Up to 20 questions per exam
- Basic content summaries
- Community support

### Pro Users
- 50 exams per month
- Up to 50 questions per exam
- Advanced summaries
- Priority support

### Enterprise Users
- Unlimited exams
- Unlimited questions
- Custom integrations
- Dedicated support

## 🌍 Community Features

- **Explore Page**: Discover public exams created by the community
- **Tagging System**: Organize exams with custom tags
- **Search & Filter**: Find relevant exams by content, creator, or difficulty
- **Sharing**: Easy sharing via secure links

## 🔮 Future Enhancements

- Real-time collaborative exam creation
- Advanced analytics dashboard
- Mobile app development
- Integration with LMS platforms
- Multi-language support
- Video content processing

## 🤝 Contributing

We welcome contributions from the community! If you find a bug, have a suggestion, or want to improve the frontend, please open a Pull Request (PR).

### How to Contribute
1. **Fork this repository**
2. **Create a new branch** for your fix or feature
3. **Make your changes** and commit them with clear messages
4. **Open a Pull Request** describing your changes, the problem solved, and steps to reproduce (if applicable)
5. **Wait for review** and feedback from maintainers

### Reporting Bugs
- Please open an Issue or PR with a clear description
- Include screenshots, error messages, and steps to reproduce
- Suggest a possible solution if you have one

### Code Guidelines
- Follow the existing code style and conventions
- Test your changes before submitting
- Keep PRs focused and concise

Thank you for helping us improve BrainSiftAI!
