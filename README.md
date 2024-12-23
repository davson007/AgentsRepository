# Agents Repository

A modern web application for managing AI personas, agents, tools, and API credentials with a beautiful user interface built using React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **AI Personas Management**: Create and manage AI personas with customizable system prompts and templates
- **AI Agents**: Configure and control AI agents with specific objectives and behaviors
- **Tools Integration**: Manage integration tools and utilities with support for multiple code types
- **API Credentials**: Secure storage and management of API keys and tokens
- **Version Control**: Track changes with built-in versioning for all entities
- **Favorites System**: Mark and filter favorite items for quick access
- **Beautiful UI**: Modern, responsive interface with smooth animations and transitions
- **Dark Mode Support**: Built-in dark mode for comfortable viewing

## 🚀 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui Components
- Radix UI Primitives
- Lucide Icons
- React Query
- Supabase
- Date-fns

## 📦 Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/agents-repository.git
cd agents-repository

2. Install dependencies:

bash
npm install


3. Create a `.env` file in the root directory and add your Supabase credentials:

VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key


## 🏗️ Project Structure
The project follows a modular architecture with the following key directories:

- `components/`: Reusable UI components
  - `home/`: Homepage specific components
  - `modals/`: Modal dialog components
  - `sections/`: Section-specific components
  - `ui/`: Base UI components and primitives
- `features/`: Feature-specific logic and components
  - `personas/`: Personas feature implementation
- `styles/`: Global styles and CSS modules
- `types/`: TypeScript type definitions
- `constants/`: Application constants and configurations
- `providers/`: React context providers and state management


## 🎨 UI Components

The project uses a combination of custom components and Shadcn/ui components for a consistent and beautiful user interface. Key components include:

- Modal dialogs for entity management
- Grid layouts for displaying items
- Custom cards with hover effects
- Responsive navigation sidebar
- Toast notifications
- Form components with validation

## 🔒 Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🛠️ Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework


