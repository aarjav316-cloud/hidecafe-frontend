import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Import all drink images
import acaiSmoothy from "../../assets/drinks/Acai Smoothy.JPG";
import blueFrog from "../../assets/drinks/Blue frog.JPG";
import hibiscus from "../../assets/drinks/Hibiscus.JPG";
import iglooAle from "../../assets/drinks/Igllo Ale.JPG";
import peachPop from "../../assets/drinks/Peach Pop.JPG";
import peachTonic from "../../assets/drinks/Peach Tonic.JPG";

gsap.registerPlugin(ScrollTrigger);

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
    description:
      "Mystical blue spirulina meets tropical paradise in every sip.",
    image: blueFrog,
  },
  {
    id: 3,
    name: "Hibiscus",
    description:
      "Delicate floral notes steeped to perfection with a hint of citrus.",
    image: hibiscus,
  },
  {
    id: 4,
    name: "Igloo Ale",
    description:
      "Cool, crisp and invigorating with notes of mint and cucumber.",
    image: iglooAle,
  },
  {
    id: 5,
    name: "Peach Pop",
    description:
      "Sun-kissed peaches blended into a refreshing sparkling delight.",
    image: peachPop,
  },
  {
    id: 6,
    name: "Peach Tonic",
    description:
      "Bright citrus meets slow-crafted peach with sparkling freshness.",
    image: peachTonic,
  },
];

const SignatureDrinks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const arrowRef = useRef(null);

  const rotate = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % drinks.length;
      } else {
        return (prev - 1 + drinks.length) % drinks.length;
      }
    });
  };

  // Animate active drink info
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [titleRef.current, descRef.current, ctaRef.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power4.out",
      },
    );

    return () => tl.kill();
  }, [currentIndex]);

  // Scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      );

      tl.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6",
      );
    });

    return () => ctx.revert();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") rotate("prev");
      if (e.key === "ArrowRight") rotate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse/Touch drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.type.includes("mouse")
      ? e.clientX
      : e.touches[0].clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    dragCurrentX.current = e.type.includes("mouse")
      ? e.clientX
      : e.touches[0].clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) rotate("next");
      else rotate("prev");
    }
  };

  const handleCTAHover = (isHovering) => {
    gsap.to(arrowRef.current, {
      x: isHovering ? 6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const getCardStyle = (index) => {
    const diff = (index - currentIndex + drinks.length) % drinks.length;
    const angle = (diff * 360) / drinks.length;
    const radius = 280;

    let scale, opacity, blur, zIndex;

    if (diff === 0) {
      // Center card
      scale = 1.1;
      opacity = 1;
      blur = 0;
      zIndex = 10;
    } else if (diff === 1 || diff === drinks.length - 1) {
      // Side cards
      scale = 0.75;
      opacity = 0.6;
      blur = 1;
      zIndex = 5;
    } else {
      // Back cards
      scale = 0.5;
      opacity = 0.3;
      blur = 2;
      zIndex = 1;
    }

    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#E8E7E5] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 space-y-6">
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "#5B5550", fontFamily: "var(--font-family-geist)" }}
          >
            SIGNATURE DRINKS
          </p>

          <h2
            ref={headingRef}
            className="text-[48px] sm:text-[56px] lg:text-[72px] leading-[95%]"
            style={{
              opacity: 0,
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
            ref={subheadingRef}
            className="text-[16px] lg:text-[17px] leading-[170%] max-w-[520px] mx-auto"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
              color: "#5B5550",
            }}
          >
            Every drink at HIDE is carefully prepared to create moments worth
            slowing down for.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[500px] lg:h-[600px]"
          style={{ perspective: "1200px", opacity: 0 }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{
              transform: "translate(-50%, -50%)",
              transformStyle: "preserve-3d",
              transition: isDragging
                ? "none"
                : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {drinks.map((drink, index) => (
              <div
                key={drink.id}
                className="absolute top-1/2 left-1/2 w-[280px] h-[380px] lg:w-[320px] lg:h-[420px] cursor-grab active:cursor-grabbing"
                style={{
                  ...getCardStyle(index),
                  transform: `translate(-50%, -50%) ${getCardStyle(index).transform}`,
                  transition: isDragging
                    ? "none"
                    : "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={() => rotate("prev")}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
            aria-label="Previous drink"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {drinks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    index === currentIndex ? "#2E2925" : "#5B5550",
                  opacity: index === currentIndex ? 1 : 0.3,
                  transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`Go to drink ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => rotate("next")}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
            aria-label="Next drink"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Active Drink Info */}
        <div className="text-center mt-16 space-y-6 max-w-[600px] mx-auto">
          <h3
            ref={titleRef}
            className="text-[32px] lg:text-[42px] leading-[110%]"
            style={{
              fontFamily: "var(--font-family-cormorant)",
              fontWeight: 600,
              color: "#2E2925",
              opacity: 0,
            }}
          >
            {drinks[currentIndex].name}
          </h3>

          <p
            ref={descRef}
            className="text-[16px] lg:text-[17px] leading-[170%]"
            style={{
              fontFamily: "var(--font-family-geist)",
              color: "#5B5550",
              opacity: 0,
            }}
          >
            {drinks[currentIndex].description}
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <a
              href="#order"
              className="group inline-flex items-center gap-2 text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-family-geist)",
                fontWeight: 600,
                color: "#2E2925",
              }}
              onMouseEnter={() => handleCTAHover(true)}
              onMouseLeave={() => handleCTAHover(false)}
            >
              <span className="relative">
                ORDER NOW
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#2E2925] origin-left group-hover:scale-x-110 transition-transform duration-300" />
              </span>
              <ArrowRight
                ref={arrowRef}
                size={18}
                strokeWidth={2}
                className="mt-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureDrinks;
