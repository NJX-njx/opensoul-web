import { Navbar } from "@/components/molecules/Navbar";
import { HeaderBranding } from "@/components/organisms/HeaderBranding";
import { Hero } from "@/components/organisms/Hero";
import { Features } from "@/components/organisms/Features";
import { ProductDemo } from "@/components/organisms/ProductDemo";
import { Testimonials } from "@/components/organisms/Testimonials";
import { Integrations } from "@/components/organisms/Integrations";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-white/20">
      <Navbar />
      <HeaderBranding />
      <Hero />
      <Features />
      <ProductDemo />
      <Testimonials />
      <Integrations />
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-zinc-500">
        <p>© {new Date().getFullYear()} OpenSoul. Open source and self-hosted.</p>
      </footer>
    </main>
  );
}
