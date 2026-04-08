import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ShowcaseSection from "./components/ShowcaseSection";
import WhySection from "./components/WhySection";
import ServicesSection from "./components/ServicesSection";
import UseCasesSection from "./components/UseCasesSection";
import ExamplesSection from "./components/ExamplesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <ShowcaseSection />
        <hr className="section-divider" />
        <WhySection />
        <hr className="section-divider" />
        <ServicesSection />
        <hr className="section-divider" />
        <UseCasesSection />
        <hr className="section-divider" />
        <ExamplesSection />
        <hr className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
