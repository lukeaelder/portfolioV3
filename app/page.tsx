import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Hero from '@/components/hero/Hero';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}
