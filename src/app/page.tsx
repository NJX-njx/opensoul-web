import { Navbar } from "@/components/molecules/Navbar";
import { HeaderBranding } from "@/components/organisms/HeaderBranding";
import { Hero } from "@/components/organisms/Hero";
import { Testimonials } from "@/components/organisms/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-white/20">
      <Navbar />
      <HeaderBranding />
      <Hero />
      <Testimonials />
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-zinc-500">
        <p>© {new Date().getFullYear()} OpenSoul. Open source and self-hosted.</p>
      </footer>
    </main>
  );
}
