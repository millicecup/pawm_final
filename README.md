# Physics Virtual Lab 🔬

> An interactive physics education platform featuring real-time simulations and hands-on learning experiences.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Overview

Physics Virtual Lab is an educational web application designed to make physics concepts accessible and engaging through interactive simulations. Students can explore fundamental physics principles by manipulating parameters in real-time and observing the immediate effects on physical phenomena.

### 🌟 Key Features

- **Interactive Simulations**: Real-time physics simulations with adjustable parameters
- **Educational Focus**: Designed specifically for physics education and learning
- **User Authentication**: Secure login/registration system for personalized learning
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Progress Tracking**: Monitor learning progress through integrated dashboard
- **Data Visualization**: Built-in graphing and measurement tools

## 🧪 Available Simulations

### 1. Simple Pendulum
- **Concept**: Harmonic motion and energy conservation
- **Parameters**: Length, mass, initial angle, damping
- **Learning Outcomes**: Understanding period, frequency, and energy transfer

### 2. Electrical Circuit
- **Concept**: Ohm's law and current flow
- **Visualization**: Racing car analogy for current flow
- **Parameters**: Voltage, resistance, circuit configuration
- **Learning Outcomes**: Understanding V=IR relationship

### 3. Cannonball Trajectory
- **Concept**: Projectile motion and kinematics
- **Parameters**: Initial velocity, launch angle, air resistance
- **Learning Outcomes**: Understanding parabolic motion and range optimization

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/physics-virtual-lab.git
   cd physics-virtual-lab
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with server-side rendering
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Next Themes** - Dark/light mode support

### State Management & Forms
- **React Hook Form** - Performant form library
- **Zod** - Schema validation
- **Local Storage** - Client-side data persistence

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
pawm_final/
├── app/                    # Next.js app directory
│   ├── dashboard/         # User dashboard
│   ├── login/            # Authentication pages
│   ├── register/         
│   ├── simulations/      # Physics simulations
│   │   ├── pendulum/     
│   │   ├── circuit/      
│   │   └── cannonball/   
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── sidebar-nav.tsx  # Navigation component
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── source/              # Additional source files
    ├── components/      # Legacy components
    ├── lib/            # Authentication logic
    └── pages/          # Additional pages
```

## 🎨 Design System

The application uses a modern design system built on:

- **Color Scheme**: Dark/light theme support
- **Typography**: Clean, readable fonts
- **Components**: Consistent, accessible UI elements
- **Animations**: Smooth transitions and interactions
- **Responsive**: Mobile-first design approach

## 🔐 Authentication System

- **Local Storage Based**: Simple client-side authentication
- **User Registration**: Email-based account creation
- **Login/Logout**: Secure session management
- **Protected Routes**: Dashboard and simulations require authentication

## 📊 Physics Engine

Each simulation implements accurate physics calculations:

- **Real-time Computation**: 60 FPS simulation updates
- **Mathematical Accuracy**: Based on fundamental physics equations
- **Parameter Sensitivity**: Immediate response to user input
- **Visual Feedback**: Clear representation of physical phenomena

## 🎓 Educational Use Cases

### For Students
- **Concept Visualization**: See abstract physics concepts in action
- **Parameter Exploration**: Understand how variables affect outcomes
- **Data Analysis**: Practice interpreting graphs and measurements
- **Self-paced Learning**: Progress at individual learning speed

### For Educators
- **Classroom Demonstrations**: Interactive teaching tool
- **Assignment Creation**: Structured learning activities
- **Progress Monitoring**: Track student engagement
- **Curriculum Support**: Aligned with physics education standards

## 🛠️ Development

### Adding New Simulations

1. Create new directory in `app/simulations/[simulation-name]/`
2. Implement `page.tsx` with simulation logic
3. Add physics calculations and canvas rendering
4. Update navigation and landing page
5. Include educational content and parameters

### Customization

- **Themes**: Modify `tailwind.config.ts` for custom colors
- **Components**: Extend UI components in `components/ui/`
- **Physics**: Adjust simulation parameters in respective pages

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📈 Performance

- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Efficient code splitting and lazy loading
- **Caching**: Optimized asset caching strategy
- **Mobile Performance**: Responsive design with touch support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Physics Community**: For educational guidance and feedback
- **Open Source Libraries**: For providing excellent development tools
- **Students and Educators**: For testing and improving the platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/physics-virtual-lab/issues)
- **Documentation**: [Project Wiki](https://github.com/yourusername/physics-virtual-lab/wiki)
- **Email**: support@physicsvirtuallab.com

---

<div align="center">
  <strong>Made with ❤️ for physics education</strong>
  <br>
  <sub>Empowering learning through interactive simulations</sub>
</div>
