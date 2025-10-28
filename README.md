# Grant Hopkins Portfolio

A modern, aesthetic SPA portfolio showcasing work in software development, real estate tech, and AI/ML systems.

## ✨ Features

- **Modern Design**: Clean, gradient-based aesthetic with smooth animations
- **Responsive**: Fully responsive layout for mobile, tablet, and desktop
- **Performance**: Built with Next.js 16 and optimized for fast loading
- **Dark Mode Support**: Automatic dark mode detection and support
- **Smooth Animations**: Powered by Framer Motion for engaging interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies with legacy peer deps flag
# (Required due to lucide-react peer dependency constraints with React 19)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view your portfolio.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── ui/
│   │   ├── button.tsx      # Reusable button component
│   │   ├── card.tsx        # Reusable card component
│   │   └── index.ts        # UI exports
│   └── sections/
│       ├── HeroSection.tsx       # Hero section with intro
│       ├── AboutSection.tsx      # About & specialties
│       ├── ProjectsSection.tsx   # Featured projects
│       ├── ContactSection.tsx    # Contact & social links
│       └── index.ts             # Section exports
```

## 🎨 Sections

### Hero Section
- Eye-catching intro with animated gradient text
- Tech stack preview
- Call-to-action buttons
- Animated background blobs

### About Section
- Personal bio highlighting real estate tech focus
- Three specialty cards (Full-Stack Dev, AI/ML, Real Estate)
- Core technologies list

### Projects Section
- Featured projects grid (2-column layout)
- Project status badges (Live/In Progress)
- Technology tags
- Links to projects

### Contact Section
- Email and social media CTAs
- Direct contact links
- Social media icons (LinkedIn, GitHub)

## 🛠 Tech Stack

- **Framework**: Next.js 16
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🎯 Customization

### Update Your Information

1. **HeroSection.tsx**: Update the main headline and description
2. **AboutSection.tsx**: Modify bio and specialties
3. **ProjectsSection.tsx**: Add/edit your projects
4. **ContactSection.tsx**: Update contact links (email, LinkedIn, GitHub)
5. **layout.tsx**: Update metadata for SEO

### Customize Colors

Edit the gradient colors in:
- `HeroSection.tsx` - `className="gradient-text"`
- `globals.css` - `.gradient-text` class
- Tailwind utility classes throughout components

### Add New Sections

Create new section files in `src/components/sections/` and import them in `page.tsx`:

```typescript
import { YourNewSection } from '@/components/sections/YourNewSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <YourNewSection />
      {/* ... other sections ... */}
    </main>
  );
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## 🔗 Links to Update

Before deploying, update these links:

- Email: `grant@example.com` in ContactSection.tsx
- LinkedIn: `https://linkedin.com` 
- GitHub: `https://github.com`

## 📦 Deployment

Deploy to Vercel with one click:

```bash
# Vercel CLI deployment
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

Feel free to use this portfolio template for your own use.

---

Built with ❤️ using Next.js, React, and Framer Motion
