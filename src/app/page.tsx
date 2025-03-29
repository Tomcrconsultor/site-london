import Hero from "@/components/Hero";
import About from "@/components/About";
import Languages from "@/components/Languages";
import MethodSection from "@/components/MethodSection";
import Plans from "@/components/Plans";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Languages />
      <MethodSection />
      <Plans />
      <FAQ />
      <CTAFinal />
    </main>
  );
} 