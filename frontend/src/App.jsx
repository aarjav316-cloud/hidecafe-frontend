import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section2 from "./components/Section2/Section2";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ExperienceHero from "./components/ExperienceHero/ExperienceHero";
import SignatureDrinks from "./components/SignatureDrinks/SignatureDrinks";
import Footer from "./components/Footer/Footer";
import InitialLoader from "./components/InitialLoader/InitialLoader";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    const startTime = performance.now();
    const minimumLoaderTime = 1400;

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(minimumLoaderTime - elapsed, 0);

      timeoutId = window.setTimeout(() => {
        if (isMounted) {
          setShowLoader(false);
        }
      }, remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <div className="[overflow-x:clip]">
      <InitialLoader visible={showLoader} />
      <div
        className={`transition-opacity duration-500 ease-out ${
          showLoader ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <div className="relative bg-[#E8E7E5]">
            <div className="sticky top-0 z-0 h-screen overflow-hidden">
              <Hero />
            </div>
            <div className="relative z-10">
              <Section2 />
            </div>
          </div>
          <div className="relative z-20 bg-[#E8E7E5]">
            <ExperienceSection />
            <ExperienceHero />
            <SignatureDrinks />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
