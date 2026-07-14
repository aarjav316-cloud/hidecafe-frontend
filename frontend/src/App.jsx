import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section2 from "./components/Section2/Section2";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ExperienceHero from "./components/ExperienceHero/ExperienceHero";
import SignatureDrinks from "./components/SignatureDrinks/SignatureDrinks";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Section2 />
      <ExperienceSection />
      <ExperienceHero />
      <SignatureDrinks />
      <Footer />
    </div>
  );
}

export default App;
