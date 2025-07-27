# Jan Language Webapp

A modern React web application showcasing the Jan programming language, built with Next.js and shadcn/ui.

## Features

- 🌟 **Interactive Playground** - Write and run Jan code in the browser
- 📚 **Comprehensive Documentation** - Complete guide to the Jan language
- 🎨 **Modern UI** - Beautiful, responsive design with dark theme
- 💻 **Code Examples** - Interactive examples with syntax highlighting
- 📱 **Mobile Responsive** - Works great on all devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
webapp/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── docs/
│   │   │   └── page.tsx      # Documentation page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── code-block.tsx    # Syntax highlighting component
│   │   └── jan-playground.tsx # Interactive code editor
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
└── components.json          # shadcn/ui configuration
```

## Components

### CodeBlock
A syntax highlighting component for Jan code with copy functionality.

### JanPlayground
An interactive code editor that simulates running Jan code in the browser.

## Customization

### Adding New Examples
Edit the examples in `src/app/page.tsx` and `src/components/jan-playground.tsx`.

### Styling
The app uses Tailwind CSS with a custom dark theme. Colors can be modified in `tailwind.config.js`.

### shadcn/ui Components
Add new components using:
```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app is built with Next.js and can be deployed to any platform that supports it:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see the main project LICENSE file.

## Related

- [Jan Language Repository](../README.md) - The main Jan language implementation
- [Jan Language Documentation](../README.md) - Language documentation and examples
