'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FixedBackground } from '@/components/FixedBackground';
import { Navigation } from '@/components/Navigation';
import { BlogButton } from '@/components/BlogButton';

export default function Home() {
  return (
    <>
      <FixedBackground />
      <Navigation />
      <BlogButton />
      <main className="w-full overflow-hidden relative z-10 pt-20">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
