import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import InstagramFeed from "@/components/InstagramFeed";
import Languages from "@/components/Languages";
import MethodSection from "@/components/MethodSection";
import Plans from "@/components/Plans";
import GoogleReviews from "@/components/GoogleReviews";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <Hero />
      <About />
      <Statistics />
      <InstagramFeed />
      <Languages />
      <MethodSection />
      <Plans />
      <GoogleReviews />
      <FAQ />
      <CTAFinal />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </main>
  );
};

export default Index;
