import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import acaiSmoothy from "../../assets/drinks/Acai Smoothy.JPG";
import blueFrog from "../../assets/drinks/Blue frog.JPG";
import hibiscus from "../../assets/drinks/Hibiscus.JPG";
import iglooAle from "../../assets/drinks/Igllo Ale.JPG";
import peachPop from "../../assets/drinks/Peach Pop.JPG";
import peachTonic from "../../assets/drinks/Peach Tonic.JPG";

const drinks = [
  {
    id: 1,
    name: "Acai Smoothie",
    description:
      "Rich berry essence blended with organic superfoods for vibrant refreshment.",
    image: acaiSmoothy,
  },
  {
    id: 2,
    name: "Blue Frog",
    description: "Mystical blue spirulina meets tropical paradise in every sip.",
    image: blueFrog,
  },
  {
    id: 3,
    name: "Hibiscus",
    description: "Delicate floral notes steeped to perfection with a hint of citrus.",
    image: hibiscus,
  },
  {
    id: 4,
    name: "Igloo Ale",
    description: "Cool, crisp and invigorating with notes of mint and cucumber.",
    image: iglooAle,
  },
  {
    id: 5,
    name: "Peach Pop",
    description: "Sun-kissed peaches blended into a refreshing sparkling delight.",
    image: peachPop,
  },
  {
    id: 6,
    name: "Peach Tonic",
    description: "Bright citrus meets slow-crafted peach with sparkling freshness.",
    image: peachTonic,
  },
];

const wrapIndex = (index) => (index + drinks.length) % drinks.length;

const SignatureDrinks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const [shouldRenderMedia, setShouldRenderMedia] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderMedia(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
        threshold: 0.15,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setInfoVisible(false);
    const frame = requestAnimationFrame(() => setInfoVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [currentIndex]);

  const rotate = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return wrapIndex(prev + 1);
      }

      return wrapIndex(prev - 1);
    });
  };

  const visibleDrinks = useMemo(
    () => [
      {
        offset: -1,
        drink: drinks[wrapIndex(currentIndex - 1)],
      },
      {
        offset: 0,
        drink: drinks[wrapIndex(currentIndex)],
      },
      {
        offset: 1,
        drink: drinks[wrapIndex(currentIndex + 1)],
      },
    ],
    [currentIndex],
  );

  const getDesktopCardStyle = (offset) => {
    if (offset === 0) {
      return {
        transform: "translate(-50%, -50%) translateX(0) scale(1)",
        opacity: 1,
        zIndex: 3,
      };
    }

    if (offset === -1) {
      return {
        transform: "translate(-50%, -50%) translateX(-52%) scale(0.84)",
        opacity: 0.7,
        zIndex: 2,
      };
    }

    return {
      transform: "translate(-50%, -50%) translateX(52%) scale(0.84)",
      opacity: 0.7,
      zIndex: 2,
    };
  };

  const getMobileCardStyle = () => ({
    transform: "translate(-50%, -50%) translateX(0) scale(1)",
    opacity: 1,
    zIndex: 2,
  });

  const renderCard = (drink, offset, isMobile = false) => {
    const style = isMobile ? getMobileCardStyle() : getDesktopCardStyle(offset);

    return (
      <button
        key={drink.id}
        type="button"
        onClick={() => {
          if (offset < 0) rotate("prev");
          if (offset > 0) rotate("next");
        }}
        className="absolute top-1/2 left-1/2 w-[78vw] max-w-[340px] sm:w-[300px] lg:w-[320px] xl:w-[340px] h-[380px] sm:h-[400px] lg:h-[430px] rounded-[28px] overflow-hidden shadow-2xl text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E2925]/40 active:scale-[0.99]"
        style={{
          ...style,
          willChange: "transform, opacity",
        }}
        aria-label={offset === 0 ? drink.name : `Show ${drink.name}`}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-white/95 to-white/80">
          {shouldRenderMedia ? (
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
              loading={offset === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(232,231,229,0.95))",
              }}
            />
          )}

          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0.05) 45%, transparent)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p
              className="text-white text-xs tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-family-geist)" }}
            >
              Featured drink
            </p>
            <h3
              className="text-white text-[28px] sm:text-[32px] leading-[95%]"
              style={{
                fontFamily: "var(--font-family-cormorant)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {drink.name}
            </h3>
          </div>
        </div>
      </button>
    );
  };

  const currentDrink = drinks[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#E8E7E5] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 space-y-4 sm:space-y-6">
          <p
            className="text-[11px] sm:text-xs tracking-[0.25em] uppercase"
            style={{ color: "#5B5550", fontFamily: "var(--font-family-geist)" }}
          >
            SIGNATURE DRINKS
          </p>

          <h2
            className="text-[38px] sm:text-[52px] lg:text-[72px] leading-[92%] max-[380px]:text-[34px]"
            style={{
              fontFamily: "var(--font-family-cormorant)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#2E2925",
            }}
          >
            Crafted to be
            <br />
            remembered.
          </h2>

          <p
            className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[170%] max-w-[520px] mx-auto max-[380px]:text-[13px] max-[380px]:leading-[160%]"
            style={{
              fontFamily: "var(--font-family-geist)",
              color: "#5B5550",
            }}
          >
            Every drink at HIDE is carefully prepared to create moments worth
            slowing down for.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="relative h-[390px] sm:h-[450px] overflow-hidden">
            {renderCard(currentDrink, 0, true)}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => rotate("prev")}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 active:scale-95"
              style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
              aria-label="Previous drink"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex gap-2">
              {drinks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: index === currentIndex ? 18 : 8,
                    backgroundColor:
                      index === currentIndex ? "#2E2925" : "#5B5550",
                    opacity: index === currentIndex ? 1 : 0.35,
                  }}
                  aria-label={`Go to drink ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => rotate("next")}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 active:scale-95"
              style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
              aria-label="Next drink"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative h-[560px] xl:h-[620px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-[980px] h-[430px] xl:h-[470px]">
                {visibleDrinks.map(({ drink, offset }) =>
                  renderCard(drink, offset, false),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-8 text-center max-w-[640px] mx-auto">
          <div
            className="transition-all duration-300 ease-out"
            style={{
              opacity: infoVisible ? 1 : 0,
              transform: infoVisible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <h3
              className="text-[28px] sm:text-[32px] lg:text-[42px] leading-[110%] max-[380px]:text-[24px]"
              style={{
                fontFamily: "var(--font-family-cormorant)",
                fontWeight: 600,
                color: "#2E2925",
              }}
            >
              {currentDrink.name}
            </h3>

            <p
              className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[170%] max-[380px]:text-[13px] max-[380px]:leading-[160%]"
              style={{
                fontFamily: "var(--font-family-geist)",
                color: "#5B5550",
              }}
            >
              {currentDrink.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <a
                href="#order"
                className="group inline-flex items-center gap-2 text-sm tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-family-geist)",
                  fontWeight: 600,
                  color: "#2E2925",
                }}
              >
                <span className="relative">
                  ORDER NOW
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#2E2925] origin-left group-hover:scale-x-110 transition-transform duration-300" />
                </span>
                <ArrowRight size={18} strokeWidth={2} className="mt-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureDrinks;
